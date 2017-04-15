import reducers from '../reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { AsyncStorage } from 'react-native'
import idGenerator from './id-generator'

const store = createStore(reducers, applyMiddleware(thunk));

let getAllDataFromStore = async () => {
  AsyncStorage.getAllKeys((err, keys) => {
    console.log('Get all keys store:', err, keys);
    if (err) { return; }
    AsyncStorage.multiGet(keys, (err, result) => {
      console.log('multiGet store:', err, result);
      if (err) { return; }
      result.forEach((keyValue) => {
        switch (keyValue[0]) {
          case 'sites': {
            store.dispatch(require('../actions/private-sites').setSites(JSON.parse(keyValue[1])));
          }
        }
      });
    })
  });
}

getAllDataFromStore();

module.exports.getReduxStore = () => {
  return store;
}

module.exports.addSite = async (site) => {
  site.id = idGenerator();
  let result = await AsyncStorage.getItem('sites');
  if (!result) { result = '[]' }
  let sites = JSON.parse(result);
  if (!(sites instanceof Array)) { sites = [] }
  sites.push(site);
  result = await AsyncStorage.setItem('sites', JSON.stringify(sites));
  console.log('Add site result:', result);
  store.dispatch(require('../actions/private-sites').addSite(site));
  return { err: null, data: site };
};
