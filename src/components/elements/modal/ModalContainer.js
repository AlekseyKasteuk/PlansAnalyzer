import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        paddingTop: 30
    },
    modalContainerContent: {
        flex: 1
    },
    modalContainerButtonsWrapper: {
        height: 40,
        flexShrink: 0,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    }
});

class ModalContainer extends Component {
    render() {
        return (
            <View style={ styles.modalContainer }>
                <View style={ styles.modalContainerContent }>{ this.props.children }</View>
                { this.props.buttons && <View style={ styles.modalContainerButtonsWrapper }>
                    {
                        this.props.buttons.map((element, index) => {
                            return (
                                <TouchableOpacity key={ 'button' + index } onPress={ element.onPress || (() => {
                                    console.log('NO ONPPRESS');
                                }) }>
                                    <Text>{ element.text }</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View> }
            </View>
        );
    }
}

export default ModalContainer;