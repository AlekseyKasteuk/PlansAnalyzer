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
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
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
                    <Icon name="arrow-back" size={ 25 } onPress={ () => { Actions.pop(); } } />
                </View>
                <View>
                    <Text style={ styles.name }>{ this.props.site.name }</Text>
                </View>
                <View style={ styles.sideElement }></View>
            </View>
        );
    }

}

export default connect((state) => {
    return {
        site: state.sitesReducer.selected
    };
})(DirectoryNavbar);