import React, {Component} from 'react'
import { Modal } from '../../elements/modal';
import { Actions } from 'react-native-redux-router';

import LoginTeam from './LoginTeam';

class Login extends Component {

    render() {
        return (
            <Modal
                navigatorProps={{
                    component: LoginTeam,
                    title: LoginTeam.title,
                    onRightButtonPress: LoginTeam.rightButtonClick,
                    rightButtonTitle: LoginTeam.rightButtonTitle,
                    onLeftButtonPress: () => { Actions.dismiss(); },
                    leftButtonTitle: 'Close'
                }}
            />
        );
    }

}

export default Login;
