import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    RefreshControl,
    ListView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Actions } from 'react-native-redux-router';
import { connect } from 'react-redux';
import sendRequest from '../../../../util/send-request';

import SiteCard from './components/SiteCard';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 45
    },
    sitesList: {
        flex: 1
    },
    searchWrapper: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        height: 50
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 14
    }
});

class Sites extends Component {

    sitesDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    constructor(props) {
        super(props);
        this.state = {
            sites: [],
            refreshing: false,
            searchQuery: ''
        };
    }

    componentWillMount () {
        this.refreshSites.bind(this)(true);
    }

    renderSite(site, section, number) {
        const num = number - 0;
        return (
            <SiteCard
                site={ site }
                style={
                    this.state.sites.length !== num + 1 ? { borderBottomWidth: 1, borderBottomColor: '#ccc' } : {}
                }
            />
        );
    }

    refreshSites(withoutRefreshControl) {
        if (!withoutRefreshControl) {
            this.setState({ refreshing: true });
        }
        sendRequest('SITES_LIST').then((response) => {
            this.setState({ sites: response.data, refreshing: false });
            console.log(this.state);
        });
    }

    render() {
        return (
            <View style={ styles.wrapper }>
                <View style={ styles.searchWrapper }>
                    <TextInput
                        style={ styles.searchInput }
                        placeholder="Search"
                        value={ this.state.searchQuery }
                        onChangeText={ (text) => { this.setState({ searchQuery: text }) } }
                    />
                </View>
                <ListView
                    automaticallyAdjustContentInsets={false}
                    style={ styles.sitesList }
                    refreshControl={
                        <RefreshControl
                            refreshing={ this.state.refreshing }
                            onRefresh={ this.refreshSites.bind(this) }
                        />
                    }
                    dataSource={ this.sitesDataSource.cloneWithRows(this.state.sites.filter((site) => {
                        const query = this.state.searchQuery.toLowerCase();
                        const fields = ['name', 'address_country', 'address_city', 'address_street'];
                        for (let i = 0; i < fields.length; i++) {
                            if (site[fields[i]].toLowerCase().indexOf(query) > -1) {
                                return true;
                            }
                        }
                        return false;

                    })) }
                    renderRow={ this.renderSite.bind(this) }
                    enableEmptySections={ true }
                />
            </View>
        );
    }

}

export default connect((state) => {
    console.log(state);
    return {
        user: state.userReducer.user
    }
})(Sites);