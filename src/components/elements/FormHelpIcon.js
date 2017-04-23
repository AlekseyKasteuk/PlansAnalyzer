import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Popover from './Popover';

const styles = StyleSheet.create({
});

class FormHelpIcon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttonRect: {}
        };
    }

    closePopover() {
        this.setState({isVisible: false});
    }

    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    render() {
        return this.props.text ? <Icon style={{marginTop:7, color: 'red' }} name="error" size={30} /> : null;
    }
}

export default FormHelpIcon;