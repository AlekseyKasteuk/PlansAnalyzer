import createAction from './action';

module.exports.login = (data) => {
    return createAction('USER_LOGIN', data);
};

module.exports.setUser = (data) => {
    return createAction('USER_SET', data);
};

module.exports.logout = () => {
    return createAction('USER_LOGOUT');
};