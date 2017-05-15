import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableWithoutFeedback
} from 'react-native';
import configs from '../../../../../config';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5
    },
    previewImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: 'cover',
        marginRight: 10
    },
    textBlock: {
        flex: 1
    },
    siteName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    siteDescription: {
        fontSize: 12,
        fontWeight: '300',
        color: '#999',
        fontStyle: 'italic'
    },
    selectedSite: {
        backgroundColor: '#f0f0f0'
    },
    filesCounterWrapper: {
        flexDirection: 'row'
    },
    filesCounterIcon: {
        color: 'red'
    },
    filesCounterCount: {
        color: 'red',
        fontSize: 12
    }
});

class SiteCard extends Component {

    render() {
        return (
            <TouchableWithoutFeedback onPress={ this.props.onPress }>
                <View style={ [styles.wrapper, this.props.style, this.props.selected && styles.selectedSite] }>
                    <Image
                        source={{ uri:  configs.server.url + this.props.site.image }}
                        style={ styles.previewImage }
                    />
                    <View style={ styles.textBlock }>
                        <Text
                            numberOfLines={1}
                            style={ styles.siteName }
                        >
                            { this.props.site.name }
                        </Text>
                        <Text
                            numberOfLines={2}
                            style={ styles.siteDescription }
                        >
                            { this.props.site.address_country + ', ' +  this.props.site.address_city + ', ' + this.props.site.address_street + ' ' + this.props.site.address_number }
                        </Text>
                    </View>
                    <View style={ styles.filesCounterWrapper }>
                        <Icon name="description" size={13} style={ styles.filesCounterIcon }/>
                        <Text style={ styles.filesCounterCount }>{ this.props.site.files_count }</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

}

export default SiteCard;