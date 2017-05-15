import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { Actions } from 'react-native-redux-router';

const styles = StyleSheet.create({
    mainWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    sideElement: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
});

class DirectoryNavbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ styles.mainWrapper }>
                <View style={ styles.sideElement }>
                    {!!this.props.navigator.state.presentedIndex && <Icon name="arrow-back" size={ 25 } onPress={ this.props.navigator.pop } />}
                </View>
                <View>
                    <Text style={ styles.name }>{ this.props.directory.name }</Text>
                </View>
                <View style={ styles.sideElement }>
                    <Icon name="create-new-folder" size={ 25 } onPress={ () => {
                        Actions.createDirectory({ parentDirectory: this.props.directory.id, callback: this.props.addItem });
                    }} />
                    <Icon name="file-upload" size={ 25 } onPress={ () => {  } } />
                </View>
            </View>
        );
    }

}

export default DirectoryNavbar;