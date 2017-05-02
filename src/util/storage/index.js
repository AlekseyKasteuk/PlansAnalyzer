import reducers from '../../reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import sendRequest from '../send-request';
import { setUser } from '../../actions/userActions';

const authCheckMiddleware = (store) => (next) => (action) => {
    if (action) {
        console.log(action);
        if (action.type === 'INIT') {
            sendRequest('AUTH_CHECK').then((response) => {
                console.log('AUTH_CHECK', response);
                if (response.status === 200) {
                    store.dispatch(setUser(response.user));
                }
                store.dispatch({
                    type: 'REPLACE',
                    name: response.status === 200 ? 'main' : 'auth',
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
