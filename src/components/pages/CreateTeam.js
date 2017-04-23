import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { Form,
    Separator,InputField, LinkField,
    SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';
import { Modal, ModalContainer } from '../elements/modal';
import FormWrapper from '../elements/FormWrapper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FormHelpIcon from '../elements/FormHelpIcon';
import requestSender from '../../util/send-request';
import { Actions } from 'react-native-redux-router';

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class CreateTeamPopup extends FormWrapper {

    static rightBtnClick () {
        CreateTeamPopup.rightBtnClickHandle();
    }
    static title = 'Create team';
    static rightButtonTitle = 'Create';

    formName = 'create-form';

    constructor(props) {
        super(props);
        CreateTeamPopup.rightBtnClickHandle = this.createTeam.bind(this);
        this.state = {
            formData: {},
            spinner: false
        }
    }

    createTeam() {
        if (this.formValidation.bind(this, this.formName)()) {
            let request = {
                team: {
                    name: this.state.formData.teamName
                },
                user: {
                    username: this.state.formData.username,
                    email: this.state.formData.email,
                    password: this.state.formData.password
                }
            };
            this.setState({ spinner: true });
            requestSender('CREATE_TEAM', request).then((response) => {
                console.log(response);
                if (response.status >= 200 && response.status < 300) {
                    Actions.dismiss();
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
                    !this.state.spinner &&
                    <ScrollView keyboardShouldPersistTaps="always" style={{paddingLeft:10,paddingRight:10}}>
                        <Form
                            ref={ this.formName }
                            onFocus={this.handleFormFocus.bind(this)}
                            onChange={this.handleFormChange.bind(this)}
                        >
                            <Separator label="Team"/>
                            <InputField
                                ref='teamName'
                                placeholder='Team name'
                                autoCapitalize="none"
                                iconLeft={
                                    <Icon style={{marginLeft:10, alignSelf:'center', color:'#999'}} name='people-outline' size={30} />
                                }
                                validationFunction={(value) => {
                                    return (!value && 'Required') ||
                                        (!(/^[a-zA-Z0-9][a-zA-Z0-9\._ \$#&'"]{0,79}$/.test(value)) && 'Invalid value') ||
                                        true;
                                }}
                                iconRight={
                                    <FormHelpIcon text={ this.validation.bind(this, this.formName)('teamName') } size={40} />
                                }
                            />
                            <Separator label="User"/>
                            <InputField
                                ref='username'
                                placeholder='Username'
                                autoCapitalize="none"
                                iconLeft={
                                    <Icon style={{marginLeft:10, alignSelf:'center', color:'#999'}} name='person-outline' size={30} />
                                }
                                validationFunction={(value) => {
                                    return (!value && 'Required') ||
                                        (!(/^[a-zA-Z0-9][a-zA-Z0-9\._ \$#&'"]{0,79}$/.test(value)) && 'Invalid value') ||
                                        true;
                                }}
                                iconRight={
                                    <FormHelpIcon text={ this.validation.bind(this, this.formName)('username') } size={40} />
                                }
                            />
                            <InputField
                                ref='email'
                                placeholder='Email'
                                keyboardType="email-address"
                                autoCapitalize="none"
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
                            <InputField
                                ref='confirmPassword'
                                placeholder='Confirm Password'
                                secureTextEntry={ true }
                                autoCapitalize="none"
                                iconLeft={
                                    <Icon style={{marginLeft:10, alignSelf:'center', color:'#999'}} name='lock-outline' size={30} />
                                }
                                validationFunction={(value) => {
                                    return (!value && 'Required') ||
                                        (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!_\?\.;:'"]{8,64}$/.test(value)) && 'Invalid value') ||
                                        (this.state.formData.password !== value && 'Invalid value') ||
                                        true;
                                }}
                                iconRight={
                                    <FormHelpIcon text={ this.validation.bind(this, this.formName)('confirmPassword') } size={40} />
                                }
                            />
                        </Form>
                    </ScrollView>
                }
                {
                    this.state.spinner && (
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
                    )
                }
            </ModalContainer>
        );
    }
}

class CreateTeam extends Component {

    render() {
        return (
            <Modal
                navigatorProps={{
                    component: CreateTeamPopup,
                    title: CreateTeamPopup.title,
                    onRightButtonPress: CreateTeamPopup.rightBtnClick,
                    rightButtonTitle: CreateTeamPopup.rightButtonTitle
                }}
            />
        );
    }

}

export default CreateTeam;
