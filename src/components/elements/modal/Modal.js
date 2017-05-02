import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const styles = StyleSheet.create({
    modal: {
        width: 500,
        marginBottom: 10,
        marginTop: 32,
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden'
    }
});

class Modal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.modal}>
                    <NavigatorIOS
                        initialRoute={this.props.navigatorProps}
                        style={{ flex: 1 }}
                    />
                </View>
                <KeyboardSpacer />
            </View>
        );
    }
}

export default Modal;