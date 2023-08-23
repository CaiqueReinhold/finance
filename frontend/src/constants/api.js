export const ENDPOINTS = {
  ACCOUNT: {
    LOGIN: '/account/login/',
    LOGOUT: '/account/logout/',
    CREATE: '/account/',
    ME: '/account/me/',
  },
  CATEGORIES: {
    LIST: '/category/',
    CREATE: '/category/',
    EDIT: (id) => `/category/${id}/`,
    DELETE: (id) => `/category/${id}/`,
  },
  TRANSACTIONS: {
    LIST: '/transaction/',
    CREATE: '/transaction/',
    EDIT: (id) => `/transaction/${id}/`,
    DELETE: (id) => `/transaction/${id}/`,
  },
};
