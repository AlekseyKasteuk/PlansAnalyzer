import createAction from './action';

module.exports.selectSite = (site) => {
    return createAction('SITE_SELECT', site);
};

module.exports.dismissSite = () => {
    return createAction('SITE_DISMISS');
};

module.exports.getSitesList = (data) => {
    return createAction('SITES_LIST', data);
};

module.exports.addSite = (data) => {
    return createAction('SITE_ADD', data)
};