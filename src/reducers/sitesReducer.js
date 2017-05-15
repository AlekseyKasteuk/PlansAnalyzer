import { setCredentials } from '../util/storage/userStorage';

const defaultState = {
    selected: null,
    sites: []
};

export default (_state=defaultState, action) => {
    let state = {..._state};
    switch (action.type) {
        case 'SITE_SELECT':
            state.selected = action.data;
            break;
        case 'SITE_DISMISS':
            state.selected = null;
            break;
        case 'SITES_LIST':
            state.sites = action.data;
            break;
        case 'SITE_ADD':
            state.sites.push(action.data);
            state.sites.sort((site1, site2) => {
                return site1.name.toLowerCase() > site2.name.toLowerCase() ? 1 :
                            site1.name.toLowerCase() < site2.name.toLowerCase() ? -1 : 0;
            });
            break;
    }
    return state;
}