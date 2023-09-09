const initialState = {
  transactions: null,
  searchParams: {
    page: 1,
    searchTerm: null,
    since: null,
    until: null,
  },
  total: 0,
  showLoader: false,
  error: null,
  created: false,
};

const transationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSACTIONS_SET_SEARCH_PARAMS':
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          ...action.searchParams,
        },
      };
    case 'TRANSACTIONS_FETCH_START':
      return {
        ...state,
        error: null,
        showLoader: true,
        created: false,
        edited: false,
        deleted: false,
      };
    case 'TRANSACTIONS_FETCH_SUCCESS':
      return {
        ...state,
        transactions: action.data.data,
        page: action.data.page,
        total: action.data.total,
        showLoader: false,
      };
    case 'TRANSACTIONS_FETCH_ERROR':
      return {
        ...state,
        error: action.error,
        showLoader: false,
      };
    case 'TRANSACTIONS_CREATE_START':
      return {
        ...state,
        error: null,
        created: false,
      };
    case 'TRANSACTIONS_CREATE_SUCCESS':
      return {
        ...state,
        created: true,
      };
    case 'TRANSACTIONS_CREATE_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'TRANSACTIONS_EDIT_START':
      return {
        ...state,
        error: null,
        edited: false,
      };
    case 'TRANSACTIONS_EDIT_SUCCESS':
      return {
        ...state,
        edited: true,
      };
    case 'TRANSACTIONS_EDIT_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'TRANSACTIONS_DELETE_START':
      return {
        ...state,
        error: null,
        deleted: false,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.transaction_id
        ),
        deleteTransaction: state.transactions.find(
          (transaction) => transaction.id === action.transaction_id
        ),
      };
    case 'TRANSACTIONS_DELETE_SUCCESS':
      return {
        ...state,
        deleted: true,
        deleteTransaction: null,
      };
    case 'TRANSACTIONS_DELETE_ERROR':
      return {
        ...state,
        error: action.error,
        transactions: state.transactions.concat(state.deleteTransaction),
        deleteTransaction: null,
      };
    default:
      return state;
  }
};

export default transationsReducer;
