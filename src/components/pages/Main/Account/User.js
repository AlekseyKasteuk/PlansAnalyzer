import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-redux-router';
import AuthPage from '../../AuthPage';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import configs from '../../../../config';
import { logout } from '../../../../actions/userActions';
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 30,
        paddingLeft: 15,
        paddingRight: 15
    },
    avatarWrapper: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    username: {
        fontFamily: 'SF UI Text',
        fontSize: 30,
        alignSelf: 'center'
    },
    email: {
        fontFamily: 'SF UI Text',
        fontStyle: 'italic',
        color: '#555',
        alignSelf: 'center'
    },
    logoutBtn: {
        borderRadius: 5,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa'
    },
    logoutBtnText: {
        fontSize: 20,
        color: '#ff3b30',
        fontFamily: 'SF UI Text'
    }
});

class User extends Component {

    constructor(props) {
        super(props);
        console.log(configs.server.url + '/img/default/default_user.png');
    }

    render() {
        return (
            <View style={ styles.wrapper }>
                <View style={ styles.avatarWrapper }>
                    <Image source={{ uri: configs.server.url + '/img/default/default_user.png' }} style={ styles.avatar } />
                </View>
                <View>
                    <Text style={ styles.username }>{ this.props.user.username }</Text>
                    <Text style={ styles.email }>{ this.props.user.email }</Text>
                </View>
                <View>
                    <TouchableOpacity style={ styles.logoutBtn } onPress={ () => {
                        this.props.dispatch(logout());
                        Actions.auth();
                    }}>
                        <Text style={ styles.logoutBtnText }>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

export default connect((state) => {
    console.log(state);
    return {
        user: state.userReducer.user
    }
})(User);