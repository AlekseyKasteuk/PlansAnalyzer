import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-redux-router';
import { connect } from 'react-redux';
import sendRequest from '../../../../util/send-request';
import { dismissSite } from '../../../../actions/sitesActions';
import configs from '../../../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';

const styles = StyleSheet.create({
    wrapper: {
        width: 300,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        padding: 10,
        height: 50,
        backgroundColor: 'yellow',
        marginBottom: 40
    },
    headerImage: {
        resizeMode: 'contain',
        width: 80,
        height: 80,
        borderRadius: 40
    },
    headerTextWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    content: {
        flex: 1
    },
    buttonsWrapper: {
        paddingBottom: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd'
    },
    button: {
        flexDirection: 'row',
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: 30,
        backgroundColor: 'yellow'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 14
    },
    buttonRightIndicator: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50
    },
    buttonRightIndicatorText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    }
});

class SelectedSite extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount () {
        console.log('IMAGE PICKER:', ImagePicker);
    }

    dismissSelectedSite() {
        this.props.dispatch(dismissSite());
    }

    render() {
        if (!this.props.site) {
            return null;
        }
        const site = this.props.site;
        return (
            <View style={ styles.wrapper }>
                <View style={ styles.header }>
                    <Image source={{ uri: configs.server.url + site.image }} style={ styles.headerImage } />
                    <View style={ styles.headerTextWrapper }>
                        <Text style={ styles.headerText } numberOfLines={2}>{ site.name }</Text>
                    </View>
                    <TouchableOpacity onPress={ this.dismissSelectedSite.bind(this) }>
                        <Icon name="close" size={ 16 } />
                    </TouchableOpacity>
                </View>
                <View style={ styles.content }>

                </View>
                <View style={ styles.buttonsWrapper }>
                    <TouchableOpacity style={ styles.button } onPress={ () => { Actions.directory(); } }>
                        <Text style={ styles.buttonText }>Files</Text>
                        <View style={ styles.buttonRightIndicator }>
                            <Text style={ styles.buttonRightIndicatorText }>{ this.props.site.files_count }</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

export default connect((state) => {
    return {
        site: state.sitesReducer.selected
    }
})(SelectedSite);