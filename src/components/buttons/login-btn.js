import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import CustomButton from './custom-btn';

const styles = StyleSheet.create({
    textWrapper: {
        minHeight: 30,
        padding: 5,
        width: 300,
        borderWidth: 1,
        borderColor: '#c8b900',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        color: '#c8b900'
    }
});

class LoginButton extends Component {

    constructor(props) {
        console.log('***', props);
        super(props);
        this.state = {
            currentState: 'default'
        };
    }

    render() {
        return (
            <TouchableOpacity
                onPress={ this.props.onPress }
                activeOpacity={ 0.7 }
            >
                <View style={ styles.textWrapper }>
                    <Text style={ styles.text }>{ this.props.text }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default LoginButton;