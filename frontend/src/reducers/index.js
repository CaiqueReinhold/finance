import { combineReducers } from 'redux';

import account from './account';
import categories from './categories';
import transactions from './transactions';

export default combineReducers({
  account,
  categories,
  transactions,
});
