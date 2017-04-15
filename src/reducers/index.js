import { routerReducer } from 'react-native-redux-router'
import { combineReducers } from 'redux'
import privateSitesReducer from './privateSitesReducer'

module.exports = combineReducers({
  routerReducer,
  privateSites: privateSitesReducer
});
