import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Form, Separator, InputField } from 'react-native-form-generator';
import { ModalContainer } from '../../elements/modal';
import FormWrapper from '../../elements/FormWrapper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FormHelpIcon from '../../elements/FormHelpIcon';
import requestSender from '../../../util/send-request';
import { Actions } from 'react-native-redux-router';

const styles = StyleSheet.create({

});

class Site extends FormWrapper {

    static rightButtonClick () { Site.rightBtnClickHandle(); }
    static title = 'Create Site: Main';
    static rightButtonTitle = 'Create';

    formName = 'create-site-form';

    constructor(props) {
        super(props);
        Site.rightBtnClickHandle = this.nextStep.bind(this);
        this.state = {
            formData: {
                description: ''
            },
            spinner: false
        }
    }

    nextStep() {
        if (this.formValidation.bind(this, this.formName)()) {
            const request = {
                site: {
                    name: this.state.formData.name,
                    description: this.state.formData.description,
                    address: {
                        country: this.state.formData.addr_country,
                        city: this.state.formData.addr_city,
                        street: this.state.formData.addr_street,
                        number: this.state.formData.addr_number
                    }
                }
            };
            this.setState({ spinner: true });
            requestSender('SITE_CREATE', request).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    Actions.dismiss();
                } else {
                    this.setState({ spinner: false });
                }
            });
        }
    }

    render() {
        return (
            <ModalContainer
            >
                {
                    this.state.spinner ?
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
                        /> :
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
                                <Separator label="Main Info"/>
                                <InputField
                                    ref='name'
                                    placeholder='Name'
                                    autoCapitalize="none"
                                    value={ this.state.formData.name }
                                    iconLeft={
                                        <Icon style={{marginLeft:10, alignSelf:'center', color:'#999'}} name='business' size={30} />
                                    }
                                    validationFunction={(value) => {
                                        return (!value && 'Required') ||
                                            (!(/^[a-zA-Z0-9][a-zA-Z0-9\. ]{0,79}$/.test(value)) && 'Invalid value') ||
                                            true;
                                    }}
                                    iconRight={
                                        <FormHelpIcon text={ this.validation.bind(this, this.formName)('name') } size={40} />
                                    }
                                />
                                <InputField
                                    ref='description'
                                    placeholder='Description'
                                    multiline={ true }
                                    value={ this.state.formData.description }
                                    style={{ paddingTop: 7 }}
                                    iconLeft={
                                        <Icon style={{marginLeft:10, alignSelf:'center', color:'#999'}} name='description' size={30} />
                                    }
                                    validationFunction={(value) => {
                                        return (value.length > 255 && 'Invalid value') ||
                                            true;
                                    }}
                                    iconRight={
                                        <FormHelpIcon text={ this.validation.bind(this, this.formName)('description') } size={40} />
                                    }
                                />
                                <Separator label="Address"/>
                                <InputField
                                    ref='addr_country'
                                    placeholder='Country'
                                    value={ this.state.formData.addr_country }
                                    iconLeft={
                                        <Icon style={{marginLeft:10, alignSelf:'center', color:'#999'}} name='location-on' size={30} />
                                    }
                                    validationFunction={(value) => {
                                        return (!value && 'Required') ||
                                            true;
                                    }}
                                    iconRight={
                                        <FormHelpIcon text={ this.validation.bind(this, this.formName)('addr_country') } size={40} />
                                    }
                                />
                                <InputField
                                    ref='addr_city'
                                    placeholder='City'
                                    value={ this.state.formData.addr_city }
                                    iconLeft={
                                        <Icon style={{marginLeft:10, alignSelf:'center', color:'#999'}} name='location-on' size={30} />
                                    }
                                    validationFunction={(value) => {
                                        return (!value && 'Required') ||
                                            true;
                                    }}
                                    iconRight={
                                        <FormHelpIcon text={ this.validation.bind(this, this.formName)('addr_city') } size={40} />
                                    }
                                />
                                <InputField
                                    ref='addr_street'
                                    placeholder='Street'
                                    value={ this.state.formData.addr_street }
                                    iconLeft={
                                        <Icon style={{marginLeft:10, alignSelf:'center', color:'#999'}} name='location-on' size={30} />
                                    }
                                    validationFunction={(value) => {
                                        return (!value && 'Required') ||
                                            true;
                                    }}
                                    iconRight={
                                        <FormHelpIcon text={ this.validation.bind(this, this.formName)('addr_street') } size={40} />
                                    }
                                />
                                <InputField
                                    ref='addr_number'
                                    placeholder='Building number'
                                    value={ this.state.formData.addr_number }
                                    iconLeft={
                                        <Icon style={{marginLeft:10, alignSelf:'center', color:'#999'}} name='location-on' size={30} />
                                    }
                                    validationFunction={(value) => {
                                        return (!value && 'Required') ||
                                            true;
                                    }}
                                    iconRight={
                                        <FormHelpIcon text={ this.validation.bind(this, this.formName)('addr_number') } size={40} />
                                    }
                                />
                            </Form>
                        </ScrollView>
                }
            </ModalContainer>
        );
    }
}

export default Site;
