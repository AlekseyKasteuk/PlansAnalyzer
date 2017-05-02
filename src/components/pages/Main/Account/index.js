import React, { Component } from 'react';
import {
    StyleSheet,
    NavigatorIOS
} from 'react-native';
import { connect } from 'react-redux';
import User from './User';
const styles = StyleSheet.create({
});

class Account extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: User,
                    title: 'Account'
                }}
                style={{ flex: 1 }}
            />
        );
    }

}

export default Account;