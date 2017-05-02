import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    MapView,
    TabBarIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Account from './Account';
import Sites from './Sites';

const defaultPageStyles = require('../../../styles/default-page');
const styles = StyleSheet.create({
    mainWrapper: {
        flexDirection: 'row'
    },
    tabMenu: {
        width: 300,
        borderRightColor: '#d3d3d3',
        borderRightWidth: 1
    },
    mapView: {
        flex: 1
    }
});

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'sites'
        }
    }

    selectTab (name) {
        this.setState({ selectedTab: name });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={[ defaultPageStyles.pageWithStatusBar, styles.mainWrapper ]}>
                    <View style={ styles.tabMenu }>
                        <TabBarIOS
                            unselectedTintColor="gray"
                            tintColor="#333"
                            unselectedItemTintColor="gray"
                            barTintColor="white"
                        >
                            <TabBarIOS.Item
                                systemIcon="history"
                                title="Sites"
                                badge={5}
                                badgeColor="red"
                                selected={ this.state.selectedTab === 'sites' }
                                onPress={this.selectTab.bind(this, 'sites')}
                            >
                                <Sites />
                            </TabBarIOS.Item>
                            <TabBarIOS.Item
                                systemIcon="contacts"
                                title="Account"
                                selected={ this.state.selectedTab === 'account' }
                                onPress={this.selectTab.bind(this, 'account')}
                            >
                                <Account />
                            </TabBarIOS.Item>
                        </TabBarIOS>
                    </View>
                    <MapView
                        style={ styles.mapView }
                        showsUserLocation={true}
                    />
                </View>
                <KeyboardSpacer />
            </View>
        );
    }

}

export default Main;
