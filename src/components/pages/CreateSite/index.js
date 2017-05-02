import React, {Component} from 'react'
import { Modal } from '../../elements/modal';
import { Actions } from 'react-native-redux-router';

import Site from './Site';

class CreateSite extends Component {

    render() {
        return (
            <Modal
                navigatorProps={{
                    component: Site,
                    title: Site.title,
                    onRightButtonPress: Site.rightButtonClick,
                    rightButtonTitle: Site.rightButtonTitle,
                    onLeftButtonPress: () => { Actions.dismiss(); },
                    leftButtonTitle: 'Close'
                }}
            />
        );
    }

}

export default CreateSite;
