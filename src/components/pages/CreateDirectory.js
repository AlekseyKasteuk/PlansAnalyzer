import React, {Component, PropTypes} from 'react'
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

class CreateDirectoryPopup extends FormWrapper {

    static rightBtnClick () {
        CreateDirectoryPopup.rightBtnClickHandle();
    }
    static title = 'Create Directory';
    static rightButtonTitle = 'Create';

    formName = 'create-form';

    constructor(props) {
        super(props);
        CreateDirectoryPopup.rightBtnClickHandle = this.createDirectory.bind(this);
        this.state = {
            formData: {},
            spinner: false
        }
    }

    createDirectory() {
        if (this.formValidation.bind(this, this.formName)()) {
            let request = {
                directory: {
                    name: this.state.formData.name,
                    parent_directory_id: this.props.parentDirectory
                }
            };
            this.setState({ spinner: true });
            requestSender('SITE_DIRECTORY_CREATE', request).then((response) => {
                console.log(response);
                if (response.status >= 200 && response.status < 300) {
                    this.props.callback(response.data);
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
                            <Separator label="Directory"/>
                            <InputField
                                ref='name'
                                placeholder='Directory Name'
                                autoCapitalize="none"
                                iconLeft={
                                    <Icon style={{marginLeft:10, alignSelf:'center', color:'#999'}} name='folder' size={30} />
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

class CreateDirectory extends Component {

    render() {
        return (
            <Modal
                navigatorProps={{
                    component: CreateDirectoryPopup,
                    title: CreateDirectoryPopup.title,
                    onRightButtonPress: CreateDirectoryPopup.rightBtnClick,
                    rightButtonTitle: CreateDirectoryPopup.rightButtonTitle,
                    onLeftButtonPress: () => { Actions.dismiss(); },
                    leftButtonTitle: 'Close',
                    passProps: {...this.props}
                }}
            />
        );
    }

}

export default CreateDirectory;