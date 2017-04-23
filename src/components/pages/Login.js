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

class LoginTeam extends FormWrapper {

    static rightBtnClick () {
        LoginTeam.rightBtnClickHandle();
    }
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
                if (response.status >= 200 && response.status < 300) {
                    this.props.navigator.push({

                    });
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
                                ref='name'
                                placeholder='Name'
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

class LoginTeam extends Component {

    render() {
        return (
            <Modal
                navigatorProps={{
                    component: LoginTeam,
                    title: LoginTeam.title,
                    onRightButtonPress: LoginTeam.rightBtnClick,
                    rightButtonTitle: LoginTeam.rightButtonTitle
                }}
            />
        );
    }

}

export default LoginTeam;
