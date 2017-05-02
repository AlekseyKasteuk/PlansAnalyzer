import React, { Component } from 'react';
import {
    StyleSheet,
    NavigatorIOS,
    View
} from 'react-native';
import { connect } from 'react-redux';
import Sites from './Sites';
import { Actions } from 'react-native-redux-router';
const styles = StyleSheet.create({
});



class SitesWrapper extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: Sites,
                    title: 'Sites',
                    onRightButtonPress: () => {
                        Actions.createSite();
                    },
                    rightButtonTitle: this.props.user.role === 'admin' && 'Create'
                }}
                style={{ flex: 1 }}
            />
        );
    }

}

export default connect((state) => {
    return {
        user: state.userReducer.user
    };
})(SitesWrapper);