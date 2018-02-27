import { combineReducers } from 'redux';
// import usersReducer from './usersReducer';
import authReducer from './authReducer';
// import adminsReducer from './adminsReducer';
import contentReducer from './contentReducer';
import itemReducer from './itemReducer';
import portfolioItem from './portfolioItem.reducer';
import publicUserReducer from './publicUserReducer';

export default combineReducers({
  // users: usersReducer,
  authentication: authReducer,
  // admins: adminsReducer,
  publicUser: publicUserReducer,
  items: itemReducer,
  portfolioItem: portfolioItem
});
