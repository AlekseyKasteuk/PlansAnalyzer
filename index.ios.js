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

    getRoutes () {
        let routes = [];
        for (let key in AppRouter) {
            if (AppRouter.hasOwnProperty(key)) {
                const route = AppRouter[key];
                routes.push({
                    name: key,
                    component: route.page,
                    type: route.type ? route.type : 'push',
                    schema: route.schema ? route.schema : 'default',
                    initial: !!route.initial
                });
            }
        }
        return routes;
    }

    render() {
        return (
            <View style={ styles.container }>
                <StatusBar barStyle="light-content"/>
                <Provider store={ store }>
                    <Router>
                        <Schema name="default" sceneConfig={ Animations.FlatFloatFromRight }/>
                        <Schema name="modal" sceneConfig={ Animations.FlatFloatFromBottom}/>
                        <Schema name="reset" sceneConfig={ Animations.FlatFloatFromBottom}/>
                        <Schema name="popup"/>

                        {
                            this.getRoutes().map((route, index) => {
                                return (
                                    <Route
                                        key={ index }
                                        name={ route.name }
                                        component={ route.component }
                                        initial={ route.initial }
                                        type={ route.type }
                                        schema={ route.schema }
                                    />
                                );
                            })
                        }

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
