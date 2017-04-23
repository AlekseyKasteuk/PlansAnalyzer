import { routerReducer } from 'react-native-redux-router';
import { combineReducers } from 'redux';
import userReducer from './userReducer';

module.exports = combineReducers({
  routerReducer,
  userReducer
});
