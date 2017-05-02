import config from '../config';
import { getCredentials } from './storage/userStorage';

const requestObject = (method, url) => {
    return {
        method,
        url: config.server.url + url
    };
};

const requests = {
    CREATE_TEAM: requestObject('POST', '/team/create'),
    TEAM_AVAILABLE: requestObject('POST', '/team/available'),
    AUTH_CHECK: requestObject('GET', '/user/check'),
    USER_LOGIN: requestObject('POST', '/user/login'),
    SITES_LIST: requestObject('GET', '/sites'),
    SITE_CREATE: requestObject('POST', '/site')
};

export default (type, data) => {
    const request = requests[type];
    if (!request) {
        return new Promise((resolve, reject) => { reject('UNKNOWN REQUEST NAME') });
    }
    return new Promise((resolve, reject) => {
        getCredentials().then((token) => {
            fetch(request.url, {
                method: request.method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: data ? JSON.stringify(data) : undefined
            }).then((response) => { resolve(response.json()); });
        });
    });
}