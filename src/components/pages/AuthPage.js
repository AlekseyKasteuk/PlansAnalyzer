import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { Actions } from 'react-native-redux-router';
import { LoginBtn } from '../buttons';

const defaultPageStyles = require('../../styles/default-page');

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBackground: {
        position: 'absolute',
        width: 1024,
        height: 768,
        left: 0,
        top: 0,
        resizeMode: 'cover'
    },
    appIcon: {
        width: 70,
        height: 70,
        marginBottom: 10
    },
    appName: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Regular'
    }
});

class AuthPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[defaultPageStyles.pageWithStatusBar, styles.container]}>
                {
                    false && <Image
                        style={ [ styles.imageBackground] }
                        source={ require('../../imgs/gradient-background.png') }
                    />
                }
                <Image style={ styles.appIcon } source={ require('../../imgs/app-icon.png') }/>
                <Text style={ styles.appName }>PLANS ANALYZER</Text>
                <LoginBtn text="LOGIN" onPress={ () => { Actions.login() } }/>
                <LoginBtn text="CREATE TEAM" onPress={ () => { Actions.createTeam() } }/>
            </View>
        );
    }

}

export default AuthPage;
