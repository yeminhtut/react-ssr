import { combineReducers } from 'redux';
// import usersReducer from './usersReducer';
import authReducer from './authReducer';
// import adminsReducer from './adminsReducer';
import contentReducer from './contentReducer';
import itemReducer from './itemReducer';
import portfolioItem from './portfolioItem.reducer';

export default combineReducers({
  // users: usersReducer,
  authentication: authReducer,
  // admins: adminsReducer,
  content: contentReducer,
  items: itemReducer,
  portfolioItem: portfolioItem
});
