import api from './api';
import { ENDPOINTS } from '../constants/api';
import { SESSION_STATUS } from '../constants/session';

const ERROR_MESSAGES = {
  EMAIL_IN_USE: 'Email is already in use',
  PASSWORD_INVALID:
    'Password must be at least 8 characters long, contain at ' +
    'least one number, one uppercase and one lowercase letter',
  PASSWORD_MISMATCH: 'Passwords do not match',
  NAME_INVALID: 'Name must be at least 3 characters long',
  EMAIL_INVALID: 'Email is invalid',
  INVALID_CREDENTIALS: 'Wrong email or password',
  INVALID_ACCOUNT_EMAIL:
    'You need to validate your email adress, please ' +
    'check your email and follow the instructions',
  DEFAULT: 'Something went wrong, our engineers are on it!',
};

export const initSession = () => {
  return async (dispatch, getState) => {
    const account = getState().account;
    if (account.status === SESSION_STATUS.UNFETCHED) {
      dispatch({ type: 'ACCOUNT_FETCHING' });
      const response = await api.get(ENDPOINTS.ACCOUNT.ME);
      if (response.status === 200) {
        dispatch({
          type: 'ACCOUNT_LOGGED_IN',
          account: response.data,
        });
      } else {
        dispatch({ type: 'ACCOUNT_LOGGED_OUT' });
      }
    }
  };
};

const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const maxLength = password.length <= 32;
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const isNumeric = /^\d+$/.test(password);
  return (
    minLength &&
    maxLength &&
    hasNumber &&
    hasUpperCase &&
    hasLowerCase &&
    !isNumeric
  );
};

export const createAccount = ({ name, email, password, password2 }) => {
  return async (dispatch) => {
    if (name.length < 3) {
      dispatch({
        type: 'ACCOUNT_CREATE_ERROR',
        error: ERROR_MESSAGES.NAME_INVALID,
      });
      return;
    }

    if (!/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test(email)) {
      dispatch({
        type: 'ACCOUNT_CREATE_ERROR',
        error: ERROR_MESSAGES.EMAIL_INVALID,
      });
      return;
    }

    if (!validatePassword(password)) {
      dispatch({
        type: 'ACCOUNT_CREATE_ERROR',
        error: ERROR_MESSAGES.PASSWORD_INVALID,
      });
      return;
    }

    if (password !== password2) {
      dispatch({
        type: 'ACCOUNT_CREATE_ERROR',
        error: ERROR_MESSAGES.PASSWORD_MISMATCH,
      });
      return;
    }

    dispatch({ type: 'ACCOUNT_CREATE_START' });
    try {
      const response = await api.post(ENDPOINTS.ACCOUNT.CREATE, {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        dispatch({
          type: 'ACCOUNT_CREATE_SUCCESS',
          account: response.data,
        });
      } else if (response.status === 400) {
        dispatch({
          type: 'ACCOUNT_CREATE_ERROR',
          error:
            ERROR_MESSAGES[response.data.error_code] || ERROR_MESSAGES.DEFAULT,
        });
      } else {
        dispatch({
          type: 'ACCOUNT_CREATE_ERROR',
          error: ERROR_MESSAGES.DEFAULT,
        });
      }
    } catch (error) {
      dispatch({ type: 'ACCOUNT_CREATE_ERROR', error: ERROR_MESSAGES.DEFAULT });
    }
  };
};

export const login = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await api.post(ENDPOINTS.ACCOUNT.LOGIN, {
        email,
        password,
      });
      if (response.status === 200) {
        dispatch({
          type: 'ACCOUNT_LOGGED_IN',
          account: response.data,
        });
      } else if (response.status === 401) {
        dispatch({
          type: 'LOGIN_ERROR',
          error: ERROR_MESSAGES.INVALID_CREDENTIALS,
        });
      } else if (response.status === 400) {
        if (response.data.error_code === 'INVALID_ACCOUNT_EMAIL') {
          dispatch({
            type: 'LOGIN_ERROR',
            showEmailValidation: true,
            error: null,
          });
          return;
        }
        dispatch({
          type: 'LOGIN_ERROR',
          error:
            ERROR_MESSAGES[response.data.error_code] || ERROR_MESSAGES.DEFAULT,
        });
      } else {
        dispatch({ type: 'LOGIN_ERROR', error: ERROR_MESSAGES.DEFAULT });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', error: ERROR_MESSAGES.DEFAULT });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: 'ACCOUNT_LOGOUT_START' });
    try {
      const response = await api.post(ENDPOINTS.ACCOUNT.LOGOUT);
      if (response.status === 204) {
        dispatch({ type: 'ACCOUNT_LOGGED_OUT' });
      } else {
        dispatch({
          type: 'ACCOUNT_LOGOUT_ERROR',
          error: ERROR_MESSAGES.DEFAULT,
        });
      }
    } catch (error) {
      dispatch({ type: 'ACCOUNT_LOGOUT_ERROR', error: ERROR_MESSAGES.DEFAULT });
    }
  };
};

export const resetEmailValidationPage = () => {
  return {
    type: 'RESET_EMAIL_VALIDATION',
  };
};

export const getNubankLinkStatus = (background = false) => {
  return async (dispatch) => {
    dispatch({ type: 'NUBANK_LINK_STATUS_START', background });
    try {
      const response = await api.get(ENDPOINTS.ACCOUNT.NUBANK_LINK_STATUS);
      if (response.status === 200) {
        dispatch({
          type: 'NUBANK_LINK_STATUS_SUCCESS',
          status: response.data.status,
        });
      } else {
        dispatch({
          type: 'NUBANK_LINK_STATUS_ERROR',
          error: ERROR_MESSAGES.DEFAULT,
        });
      }
    } catch (error) {
      dispatch({
        type: 'NUBANK_LINK_STATUS_ERROR',
        error: ERROR_MESSAGES.DEFAULT,
      });
    }
  };
};

export const resetNubankLinkStatus = () => {
  return {
    type: 'RESET_NUBANK_LINK_STATUS',
  };
};

export const requestNubankLink = (cpf, password) => {
  return async (dispatch) => {
    dispatch({ type: 'NUBANK_LINK_START' });
    try {
      const response = await api.post(ENDPOINTS.ACCOUNT.REQUEST_NUBANK_LINK, {
        cpf,
        password,
      });
      if (response.status === 204) {
        dispatch({
          type: 'NUBANK_LINK_SUCCESS',
        });
        dispatch(getNubankLinkStatus());
      } else {
        dispatch({
          type: 'NUBANK_LINK_ERROR',
          error: ERROR_MESSAGES.DEFAULT,
        });
      }
    } catch (error) {
      dispatch({
        type: 'NUBANK_LINK_ERROR',
        error: ERROR_MESSAGES.DEFAULT,
      });
    }
  };
};

export const nubankLink = (code, passphrase) => {
  return async (dispatch) => {
    dispatch({ type: 'NUBANK_LINK_START' });
    try {
      const response = await api.post(ENDPOINTS.ACCOUNT.NUBANK_LINK, {
        code,
        passphrase,
      });
      if (response.status === 204) {
        dispatch({
          type: 'NUBANK_LINK_SUCCESS',
        });
        dispatch(getNubankLinkStatus());
      } else {
        dispatch({
          type: 'NUBANK_LINK_ERROR',
          error: ERROR_MESSAGES.DEFAULT,
        });
      }
    } catch (error) {
      dispatch({
        type: 'NUBANK_LINK_ERROR',
        error: ERROR_MESSAGES.DEFAULT,
      });
    }
  };
};

export const unlinkNubank = () => {
  return async (dispatch) => {
    dispatch({ type: 'NUBANK_UNLINK_START' });
    try {
      const response = await api.post(ENDPOINTS.ACCOUNT.UNLINK_NUBANK);
      if (response.status === 204) {
        dispatch({
          type: 'NUBANK_UNLINK_SUCCESS',
        });
        dispatch(getNubankLinkStatus());
      } else {
        dispatch({
          type: 'NUBANK_UNLINK_ERROR',
          error: ERROR_MESSAGES.DEFAULT,
        });
      }
    } catch (error) {
      dispatch({
        type: 'NUBANK_UNLINK_ERROR',
        error: ERROR_MESSAGES.DEFAULT,
      });
    }
  };
};
