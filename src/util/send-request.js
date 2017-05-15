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
    SITE_CREATE: requestObject('POST', '/site'),
    SITE_DIRECTORY: requestObject('GET', '/directory'),
    SITE_DIRECTORY_CREATE: requestObject('POST', '/directory')
};

export default (type, data) => {
    if (!requests[type]) {
        return new Promise((resolve, reject) => { reject('UNKNOWN REQUEST NAME') });
    }
    const request = Object.assign({}, requests[type]);
    return new Promise((resolve) => {
        getCredentials().then((token) => {
            if ((request.method === 'GET' || request.method === 'DELETE') && data) {
                let params = [];
                for (let key in data) {
                    if (data.hasOwnProperty(key) && data[key]) {
                        params.push(key + '=' + data[key]);
                    }
                }
                request.url += '?' + params.join('&');
                data = undefined;
            }
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