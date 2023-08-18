import api from './api';
import { ENDPOINTS } from '../constants/api';

const ERROR_MESSAGES = {
  DEFAULT: 'Something went wrong, our engineers are on it!',
};

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

export const fetchTransactions = ({ page = 1, searchTerm, since, until }) => {
  return async (dispatch) => {
    dispatch({ type: 'TRANSACTIONS_FETCH_START' });
    try {
      const response = await api.get(ENDPOINTS.TRANSACTIONS.LIST, {
        params: {
          page,
          search: searchTerm,
          since,
          until,
        },
      });
      if (response.status === 200) {
        dispatch({
          type: 'TRANSACTIONS_FETCH_SUCCESS',
          transactions: response.data,
          page,
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
