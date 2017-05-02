import { setCredentials } from '../util/storage/userStorage';

const defaultState = {
    team: {
        name: ''
    },
    user: {
        username: '',
        email: '',
        role: '',
        id: ''
    }
};

export default (_state=defaultState, action) => {
    let state = {..._state};
    switch (action.type) {
        case 'USER_LOGIN':
            if (setCredentials(action.data.token)) {
                state = action.data;
            }
            break;
        case 'USER_SET':
            state = action.data;
            break;
        case 'USER_LOGOUT':
            setCredentials('');
            state = defaultState;
            break;
    }
    return state;
}