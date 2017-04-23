/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';

import {
    Actions, Router, Route, Container, Animations, Schema
} from 'react-native-redux-router';
import { Provider } from 'react-redux';

import AppRouter from './src/util/router';
import AppStorage from './src/util/storage';

const store = AppStorage.getStore();

export default class PlansAnalyzer extends Component {

    render() {
        return (
            <View style={ styles.container }>
                <StatusBar barStyle="light-content"/>
                <Provider store={ store }>
                    <Router>
                        <Schema name="default" sceneConfig={ Animations.FlatFloatFromRight }/>
                        <Schema name="modal" sceneConfig={ Animations.FlatFloatFromBottom}/>
                        <Schema name="popup"/>

                        <Route name="loading" component={ AppRouter.loading.page } initial={ true }/>
                        <Route name="auth" component={ AppRouter.auth.page }/>
                        <Route name="createTeam" component={ AppRouter.createTeam.page } schema="popup"/>
                        <Route name="sites" component={ AppRouter.sites.page }/>

                    </Router>
                </Provider>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

AppRegistry.registerComponent('PlansAnalyzer', () => PlansAnalyzer);
