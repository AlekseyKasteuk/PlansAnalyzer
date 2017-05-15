import { routerReducer } from 'react-native-redux-router';
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import sitesReducer from './sitesReducer';

module.exports = combineReducers({
  routerReducer,
  userReducer,
  sitesReducer
});
