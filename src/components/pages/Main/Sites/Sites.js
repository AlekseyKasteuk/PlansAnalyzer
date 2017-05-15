import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    RefreshControl,
    ListView,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Actions } from 'react-native-redux-router';
import { connect } from 'react-redux';
import sendRequest from '../../../../util/send-request';
import { selectSite, getSitesList } from '../../../../actions/sitesActions';

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
            refreshing: false,
            searchQuery: ''
        };
    }

    componentWillMount () {
        this.refreshSites(true);
    }

    selectSite(site) {
        this.props.dispatch(selectSite(site));
    }

    renderSite(site, section, number) {
        const num = number - 0;
        const isSelected = this.props.selectedSite && this.props.selectedSite.id === site.id;
        return (
            <SiteCard
                site={ site }
                style={
                    this.props.sites.length !== num + 1 ? { borderBottomWidth: 1, borderBottomColor: '#ccc' } : {}
                }
                selected={isSelected}
                onPress={ this.selectSite.bind(this, site) }
            />
        );
    }

    refreshSites(withoutRefreshControl) {
        if (!withoutRefreshControl) {
            this.setState({ refreshing: true });
        }

        sendRequest('SITES_LIST').then((response) => {
            this.props.dispatch(getSitesList(response.data));
            this.setState({ refreshing: false });
        });
    }

    renderList() {
        const sites = this.props.sites.filter((site) => {
            const query = this.state.searchQuery.toLowerCase();
            const fields = ['name', 'address_country', 'address_city', 'address_street'];
            for (let i = 0; i < fields.length; i++) {
                if (site[fields[i]].toLowerCase().indexOf(query) > -1) {
                    return true;
                }
            }
            return false;

        });
        if (sites.length) {
            return (
                <ListView
                    automaticallyAdjustContentInsets={false}
                    style={ styles.sitesList }
                    refreshControl={
                        <RefreshControl
                            refreshing={ this.state.refreshing }
                            onRefresh={ this.refreshSites.bind(this) }
                        />
                    }
                    dataSource={ this.sitesDataSource.cloneWithRows(sites) }
                    renderRow={ this.renderSite.bind(this) }
                    enableEmptySections={ true }
                />
            );
        } else {
            return (
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    style={ styles.sitesList }
                    refreshControl={
                        <RefreshControl
                            refreshing={ this.state.refreshing }
                            onRefresh={ this.refreshSites.bind(this) }
                        />
                    }
                    centerContent={ true }
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>There is no Sites</Text>
                    </View>
                </ScrollView>
            );
        }
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
                {
                    this.renderList()
                }
            </View>
        );
    }

}

export default connect((state) => {
    return {
        user: state.userReducer.user,
        selectedSite: state.sitesReducer.selected,
        sites: state.sitesReducer.sites
    }
})(Sites);