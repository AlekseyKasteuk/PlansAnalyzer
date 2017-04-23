import reducers from '../../reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import sendRequest from '../send-request';

const authCheckMiddleware = (store) => (next) => (action) => {
    if (action) {
        console.log(action);
        if (action.type === 'INIT') {
            sendRequest('AUTH_CHECK').then((resonse) => {
                next({
                    type: 'REPLACE',
                    name: resonse.status === 200 ? 'sites' : 'auth',
                    data: { data: undefined }
                });
            });
        } else {
            next(action);
        }
    }
};

const store = createStore(reducers, applyMiddleware(thunk, authCheckMiddleware));

module.exports.getStore = () => {
    return store;
};
