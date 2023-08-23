import api from './api';
import { ENDPOINTS } from '../constants/api';

const ERROR_MESSAGES = {
  DEFAULT: 'Something went wrong, our engineers are on it!',
};

export const setSearchParams = (page, searchTerm, since, until) => ({
  type: 'TRANSACTIONS_SET_SEARCH_PARAMS',
  searchParams: {
    page,
    searchTerm,
    since,
    until,
  },
});

export const createTransaction = (transaction) => {
  return async (dispatch) => {
    dispatch({ type: 'TRANSACTIONS_CREATE_START' });
    try {
      const response = await api.post(
        ENDPOINTS.TRANSACTIONS.CREATE,
        transaction
      );
      if (response.status === 201) {
        dispatch({
          type: 'TRANSACTIONS_CREATE_SUCCESS',
          transaction: response.data,
        });
        dispatch(fetchTransactions());
      } else {
        dispatch({
          type: 'TRANSACTIONS_CREATE_ERROR',
          error: ERROR_MESSAGES[response.data.code] || ERROR_MESSAGES.DEFAULT,
        });
      }
    } catch (error) {
      dispatch({
        type: 'TRANSACTIONS_CREATE_ERROR',
        error: ERROR_MESSAGES.DEFAULT,
      });
    }
  };
};

export const editTransaction = (transaction_id, values) => {
  return async (dispatch) => {
    dispatch({ type: 'TRANSACTIONS_EDIT_START' });
    try {
      const response = await api.put(
        ENDPOINTS.TRANSACTIONS.EDIT(transaction_id),
        values
      );
      if (response.status === 200) {
        dispatch({
          type: 'TRANSACTIONS_EDIT_SUCCESS',
          transaction: response.data,
        });
        dispatch(fetchTransactions());
      } else {
        dispatch({
          type: 'TRANSACTIONS_EDIT_ERROR',
          error: ERROR_MESSAGES[response.data.code] || ERROR_MESSAGES.DEFAULT,
        });
      }
    } catch (error) {
      dispatch({
        type: 'TRANSACTIONS_EDIT_ERROR',
        error: ERROR_MESSAGES.DEFAULT,
      });
    }
  };
};

export const deleteTransaction = (transaction_id) => {
  return async (dispatch) => {
    dispatch({ type: 'TRANSACTIONS_DELETE_START' });
    try {
      const response = await api.delete(
        ENDPOINTS.TRANSACTIONS.DELETE(transaction_id)
      );
      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: 'TRANSACTIONS_DELETE_SUCCESS',
        });
        dispatch(fetchTransactions());
      } else {
        dispatch({
          type: 'TRANSACTIONS_DELETE_ERROR',
          error: ERROR_MESSAGES[response.data.code] || ERROR_MESSAGES.DEFAULT,
        });
      }
    } catch (error) {
      dispatch({
        type: 'TRANSACTIONS_DELETE_ERROR',
        error: ERROR_MESSAGES.DEFAULT,
      });
    }
  };
};

export const fetchTransactions = () => {
  return async (dispatch, getState) => {
    dispatch({ type: 'TRANSACTIONS_FETCH_START' });
    try {
      const { page, searchTerm, since, until } =
        getState().transactions.searchParams;
      const response = await api.get(ENDPOINTS.TRANSACTIONS.LIST, {
        params: {
          page,
          q: searchTerm,
          since,
          until,
        },
      });
      if (response.status === 200) {
        dispatch({
          type: 'TRANSACTIONS_FETCH_SUCCESS',
          data: response.data,
        });
      } else {
        dispatch({
          type: 'TRANSACTIONS_FETCH_ERROR',
          error: ERROR_MESSAGES.DEFAULT,
        });
      }
    } catch (error) {
      dispatch({
        type: 'TRANSACTIONS_FETCH_ERROR',
        error: ERROR_MESSAGES.DEFAULT,
      });
    }
  };
};
