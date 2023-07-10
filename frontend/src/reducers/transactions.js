const initialState = {
  transactions: null,
  page: 1,
  total: 0,
  showLoader: false,
  error: null,
  created: false,
};

const transationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSACTIONS_FETCH_START':
      return {
        ...state,
        error: null,
        created: false,
        showLoader: true,
      };
    case 'TRANSACTIONS_FETCH_SUCCESS':
      return {
        ...state,
        transactions: action.transactions,
        page: action.page,
        total: action.total,
        showLoader: false,
      };
    case 'TRANSACTIONS_FETCH_ERROR':
      return {
        ...state,
        error: action.error,
        showLoader: false,
      };
    default:
      return state;
  }
};

export default transationsReducer;
