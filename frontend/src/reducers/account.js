import { SESSION_STATUS } from '../constants/session';

const initialState = {
  account: null,
  status: SESSION_STATUS.UNFETCHED,
  showLoader: false,
  error: null,
  showEmailValidation: false,
  nubankLinkStatus: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACCOUNT_LOGGED_IN':
      return {
        account: action.account,
        status: SESSION_STATUS.LOGGED_IN,
        showLoader: false,
      };
    case 'ACCOUNT_LOGGED_OUT':
      return { account: null, status: SESSION_STATUS.LOGGED_OUT };
    case 'ACCOUNT_FETCHING':
      return { account: null, status: SESSION_STATUS.FETCHING };
    case 'LOGIN_START':
      return { ...state, account: null, showLoader: true, error: null };
    case 'LOGIN_ERROR':
      return {
        ...state,
        account: null,
        showLoader: false,
        error: action.error,
        showEmailValidation: action.showEmailValidation,
      };
    case 'RESET_EMAIL_VALIDATION':
      return { ...state, showEmailValidation: false };
    case 'ACCOUNT_CREATE_START':
      return { ...state, account: null, showLoader: true, error: null };
    case 'ACCOUNT_CREATE_ERROR':
      return {
        ...state,
        account: null,
        showLoader: false,
        error: action.error,
      };
    case 'ACCOUNT_CREATE_SUCCESS':
      return {
        ...state,
        account: action.account,
        showLoader: false,
        showEmailValidation: true,
        error: null,
      };
    case 'NUBANK_LINK_STATUS_START':
      return { ...state, showLoader: !action.background };
    case 'NUBANK_LINK_STATUS_SUCCESS':
      return {
        ...state,
        nubankLinkStatus: action.status,
        showLoader: false,
        error: null,
      };
    case 'NUBANK_LINK_STATUS_ERROR':
      return {
        ...state,
        showLoader: false,
        error: action.error,
      };
    case 'RESET_NUBANK_LINK_STATUS':
      return {
        ...state,
        nubankLinkStatus: null,
      };
    case 'REQUEST_NUBANK_LINK_START':
      return { ...state, showLoader: true };
    case 'REQUEST_NUBANK_LINK_SUCCESS':
      return {
        ...state,
        showLoader: false,
        error: null,
        nubankLinkStatus: 'code_sent',
      };
    case 'NUBANK_UNLINK_START':
      return { ...state, showLoader: true };
    case 'NUBANK_UNLINK_SUCCESS':
      return {
        ...state,
        showLoader: false,
        error: null,
      };
    case 'NUBANK_UNLINK_ERROR':
      return {
        ...state,
        showLoader: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default accountReducer;
