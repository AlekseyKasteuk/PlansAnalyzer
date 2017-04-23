import { AsyncStorage } from 'react-native';

let _token = undefined;

module.exports.getCredentials = () => {
    return new Promise((resolve, reject) => {
        if (!_token) {
            AsyncStorage.getItem('token', (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    _token = token || '';
                    resolve(_token);
                }
            });
        } else {
            resolve(_token);
        }
    });
};

module.exports.setCredentials = (token) => {
    if (typeof token !== 'string' && token) {
        return false
    }
    AsyncStorage.setItem('token', JSON.stringify(token), (err) => {
        if (err) {
            console.error(err);
        } else {
            _token = token
        }
    });
    return true;
};