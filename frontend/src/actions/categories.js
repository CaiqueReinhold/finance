import api from './api';
import { ENDPOINTS } from '../constants/api';

const ERROR_MESSAGES = {
  DEFAULT: 'Something went wrong, our engineers are on it!',
};

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch({ type: 'CATEGORIES_FETCH_START' });
    try {
      const response = await api.get(ENDPOINTS.CATEGORIES.LIST);
      if (response.status === 200) {
        dispatch({
          type: 'CATEGORIES_FETCH_SUCCESS',
          categories: response.data,
        });
      } else {
        dispatch({
          type: 'CATEGORIES_FETCH_ERROR',
          error: ERROR_MESSAGES.DEFAULT,
        });
      }
    } catch (error) {
      dispatch({
        type: 'CATEGORIES_FETCH_ERROR',
        error: ERROR_MESSAGES.DEFAULT,
      });
    }
  };
};

export const editCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: 'CATEGORIES_EDIT_START' });
    try {
      const response = await api.get(`${ENDPOINTS.CATEGORIES.LIST}/${id}`);
      if (response.status === 200) {
        dispatch({
          type: 'CATEGORIES_EDIT_SUCCESS',
          category: response.data,
        });
      } else {
        dispatch({
          type: 'CATEGORIES_EDIT_ERROR',
          error: ERROR_MESSAGES.DEFAULT,
        });
      }
    } catch (error) {
      dispatch({
        type: 'CATEGORIES_EDIT_ERROR',
        error: ERROR_MESSAGES.DEFAULT,
      });
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: 'CATEGORIES_DELETE_START' });
    try {
      const response = await api.delete(ENDPOINTS.CATEGORIES.DELETE(id));
      if (response.status === 204) {
        dispatch({
          type: 'CATEGORIES_DELETE_SUCCESS',
          id,
        });
      } else {
        dispatch({
          type: 'CATEGORIES_DELETE_ERROR',
          error: ERROR_MESSAGES.DEFAULT,
        });
      }
    } catch (error) {
      dispatch({
        type: 'CATEGORIES_DELETE_ERROR',
        error: ERROR_MESSAGES.DEFAULT,
      });
    }
  };
};

export const createCategory = (category) => {
  return async (dispatch) => {
    dispatch({ type: 'CATEGORIES_CREATE_START' });
    try {
      const response = await api.post(ENDPOINTS.CATEGORIES.CREATE, category);
      if (response.status === 201) {
        dispatch({
          type: 'CATEGORIES_CREATE_SUCCESS',
          category: response.data,
        });
      } else {
        dispatch({
          type: 'CATEGORIES_CREATE_ERROR',
          error: ERROR_MESSAGES[response.data.code] || ERROR_MESSAGES.DEFAULT,
        });
      }
    } catch (error) {
      dispatch({
        type: 'CATEGORIES_CREATE_ERROR',
        error: ERROR_MESSAGES.DEFAULT,
      });
    }
  };
};
