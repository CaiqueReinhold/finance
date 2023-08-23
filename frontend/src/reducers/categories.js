const initialState = {
  categories: [],
  showLoader: false,
  error: null,
  created: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CATEGORIES_CREATE_START':
      return {
        ...state,
        error: null,
        created: false,
      };
    case 'CATEGORIES_CREATE_SUCCESS':
      return {
        ...state,
        error: null,
        created: true,
        categories: [...state.categories, action.category],
      };
    case 'CATEGORIES_CREATE_ERROR':
      return {
        ...state,
        error: action.error,
        created: false,
      };
    case 'CATEGORIES_FETCH_START':
      return {
        ...state,
        error: null,
        showLoader: true,
        created: false,
      };
    case 'CATEGORIES_FETCH_SUCCESS':
      return {
        ...state,
        error: null,
        showLoader: false,
        categories: action.categories,
        created: false,
      };
    case 'CATEGORIES_FETCH_ERROR':
      return {
        ...state,
        error: action.error,
        showLoader: false,
        created: false,
      };
    case 'CATEGORIES_DELETE_START':
      return {
        ...state,
        error: null,
        created: false,
      };
    case 'CATEGORIES_DELETE_SUCCESS':
      return {
        ...state,
        error: null,
        categories: state.categories.filter(
          (category) => category.id !== action.id
        ),
      };
    case 'CATEGORIES_DELETE_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'CATEGORIES_EDIT_START':
      return {
        ...state,
        error: null,
        created: false,
      };
    case 'CATEGORIES_EDIT_SUCCESS':
      return {
        ...state,
        error: null,
        categories: state.categories.map((category) =>
          category.id === action.category.id ? action.category : category
        ),
      };
    case 'CATEGORIES_EDIT_ERROR':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default categoryReducer;
