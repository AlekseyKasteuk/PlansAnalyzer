import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Form, Separator, InputField } from 'react-native-form-generator';
import { ModalContainer } from '../../elements/modal';
import FormWrapper from '../../elements/FormWrapper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FormHelpIcon from '../../elements/FormHelpIcon';
import requestSender from '../../../util/send-request';
import LoginUser from './LoginUser';

const styles = StyleSheet.create({

});

class LoginTeam extends FormWrapper {

    static rightButtonClick () { LoginTeam.rightBtnClickHandle(); }
    static title = 'Login: Team';
    static rightButtonTitle = 'Next';

    formName = 'team-form';

    constructor(props) {
        super(props);
        LoginTeam.rightBtnClickHandle = this.checkAvailable.bind(this);
        this.state = {
            formData: {},
            spinner: false
        }
    }

    checkAvailable() {
        if (this.formValidation.bind(this, this.formName)()) {
            let request = {
                team: {
                    name: this.state.formData.name
                }
            };
            this.setState({ spinner: true });
            requestSender('TEAM_AVAILABLE', request).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    this.props.navigator.push({
                        component: LoginUser,
                        title: LoginUser.title,
                        leftButtonTitle: LoginUser.leftButtonTitle,
                        onLeftButtonPress: LoginUser.leftButtonClick,
                        onRightButtonPress: LoginUser.rightButtonClick,
                        rightButtonTitle: LoginUser.rightButtonTitle,
                        passProps: { team: response.data }
                    });
                }
                this.setState({ spinner: false });
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
                            <Separator label="Team"/>
                            <InputField
                                ref='name'
                                placeholder='Name'
                                autoCapitalize="none"
                                value={ this.state.formData.name }
                                iconLeft={
                                    <Icon style={{marginLeft:10, alignSelf:'center', color:'#999'}} name='people-outline' size={30} />
                                }
                                validationFunction={(value) => {
                                    return (!value && 'Required') ||
                                        (!(/^[a-zA-Z0-9][a-zA-Z0-9\._ \$#&'"]{0,79}$/.test(value)) && 'Invalid value') ||
                                        true;
                                }}
                                iconRight={
                                    <FormHelpIcon text={ this.validation.bind(this, this.formName)('name') } size={40} />
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

export default LoginTeam;
