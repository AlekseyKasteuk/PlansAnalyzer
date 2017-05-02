import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Form, Separator, InputField } from 'react-native-form-generator';
import { ModalContainer } from '../../elements/modal';
import FormWrapper from '../../elements/FormWrapper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FormHelpIcon from '../../elements/FormHelpIcon';
import requestSender from '../../../util/send-request';
import { Actions } from 'react-native-redux-router';
import { getStore } from '../../../util/storage';
import { login } from '../../../actions/userActions';

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class LoginUser extends FormWrapper {

    static rightButtonClick () { LoginUser.rightBtnClickHandle(); }
    static title = 'Login: User';
    static rightButtonTitle = 'Login';
    static leftButtonClick () { LoginUser.leftBtnClickHandle(); }
    static leftButtonTitle = 'Back';

    formName = 'user-form';

    constructor(props) {
        super(props);
        LoginUser.rightBtnClickHandle = this.login.bind(this);
        LoginUser.leftBtnClickHandle = this.props.navigator.pop;
        this.state = {
            formData: {},
            spinner: false
        }
    }

    login() {
        if (this.formValidation.bind(this, this.formName)()) {
            let request = {
                team: {...this.props.team},
                user: {...this.state.formData}
            };
            this.setState({ spinner: true });
            requestSender('USER_LOGIN', request).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    const store = getStore();
                    store.dispatch(login({...response.user, token: response.data}));
                    Actions.dismiss();
                    Actions.main();
                } else {
                    this.setState({ spinner: false });
                }
            }).catch((err) => {
                console.log(err);
                this.setState({ spinner: false });
            });
        }
    }

    render() {
        return (
            <ModalContainer
            >
                {
                    !this.state.spinner ?
                    <ScrollView
                        keyboardShouldPersistTaps="always"
                        style={{paddingLeft:10,paddingRight:10}}
                        automaticallyAdjustContentInsets={false}
                    >
                        <Form
                            ref={ this.formName }
                            onFocus={this.handleFormFocus.bind(this)}
                            onChange={this.handleFormChange.bind(this)}
                        >
                            <Separator label="User"/>
                            <InputField
                                ref='email'
                                placeholder='Email'
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={ this.state.formData.email }
                                iconLeft={
                                    <Icon style={{marginLeft:10, alignSelf:'center', color:'#999'}} name='mail-outline' size={30} />
                                }
                                validationFunction={(value) => {
                                    return (!value && 'Required') ||
                                        (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) && 'Invalid value') ||
                                        true;
                                }}
                                iconRight={
                                    <FormHelpIcon text={ this.validation.bind(this, this.formName)('email') } size={40} />
                                }
                            />
                            <InputField
                                ref='password'
                                placeholder='Password'
                                secureTextEntry={ true }
                                autoCapitalize="none"
                                value={ this.state.formData.password }
                                iconLeft={
                                    <Icon style={{marginLeft:10, alignSelf:'center', color:'#999'}} name='lock-outline' size={30} />
                                }
                                validationFunction={(value) => {
                                    return (!value && 'Required') ||
                                        (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!_\?\.;:'"]{8,64}$/.test(value)) && 'Invalid value') ||
                                        true;
                                }}
                                iconRight={
                                    <FormHelpIcon text={ this.validation.bind(this, this.formName)('password') } size={40} />
                                }
                            />
                        </Form>
                    </ScrollView> :
                    <ActivityIndicator
                        animating={true}
                        style={{
                            height: 80,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 8,
                            flex: 1
                        }}
                        size="large"
                    />
                }
            </ModalContainer>
        );
    }
}

export default LoginUser;
