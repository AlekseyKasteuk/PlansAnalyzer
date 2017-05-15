import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import Navbar from './components/Navbar';

import sendRequest from '../../../../../util/send-request';
import configs from '../../../../../config';

const styles = StyleSheet.create({
    cardsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
    itemCard: {
        margin: 5,
        width: 170,
        height: 180,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemCardImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    itemCardName: {
        fontSize: 15,
        marginTop: 5,
        marginBottom: 5
    }
});

class DirectoryContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            directory: {},
            items: []
        }
    }

    componentWillMount() {
        this.getDirectory();
    }

    getDirectory() {
        sendRequest('SITE_DIRECTORY', {
            site: this.props.site.id,
            directory: this.props.directory
        }).then((response) => {
            console.log('DIRECTORY RESPONSE', response);
            this.setState({directory: response.data.directory, items: response.data.items});
        }, () => {
            console.log('DIRECTORY ERROR', arguments);
        });
    }

    itemPress(item) {
        if (item.type === 'directory') {
            this.props.navigator.push({ directory: item.id });
        }
    }

    renderList() {
        if (this.state.items.length) {
            return (
                <ScrollView style={{ flex: 1 }} >
                    <View style={[styles.cardsWrapper, this.state.dimensions ? { width: this.state.dimensions.width } : undefined ]}>
                        {
                            this.state.items.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback key={ index } onPress={this.itemPress.bind(this, item)}>
                                        <View style={ styles.itemCard }>
                                            <Image source={{ uri: configs.server.url + item.thumbnail }} style={ styles.itemCardImage } />
                                            <Text linesCount={1} style={styles.itemCardName}>{ item.name }</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            })
                        }
                    </View>
                </ScrollView>
            );
        } else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text>Directory is Empty</Text>
                </View>
            );
        }
    }

    addItem (item) {
        this.setState({ items: this.state.items.concat([item]) });
    }

    render() {
        return (
            <View style={{ flex: 1 }} onLayout={ (event) => { this.setState({ dimensions: event.nativeEvent.layout }) } }>
                <Navbar navigator={ this.props.navigator } directory={ this.state.directory } addItem={ this.addItem.bind(this) }/>
                {
                    this.renderList()
                }
            </View>
        );
    }

}

export default connect((state) => {
    return {
        site: state.sitesReducer.selected
    };
})(DirectoryContent);