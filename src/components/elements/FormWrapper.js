import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator
} from 'react-native';

class FormWrapper extends Component {

    handleFormChange(formData) {
        this.setState({formData});
        this.props.onFormChange && this.props.onFormChange(formData);
    }

    handleFormFocus(e, component) {

    }

    validation(formName, fieldName) {
        if (this.refs[formName] && !this.refs[formName].refs[fieldName].valid) {
            return this.refs[formName].refs[fieldName].validationErrors.join("\n");
        }
    }

    componentDidMount() {
        this.handleFormChange.bind(this)({});
    }

    formValidation(formName) {
        for (let key in this.refs[formName].refs) {
            console.log(this.refs[formName].refs[key]);
            if (!this.refs[formName].refs[key].valid) {
                return false;
            }
        }
        return true;
    }

}

export default FormWrapper;
