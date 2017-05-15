import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import DirectoryContent from './components/DirectoryContent';
import RecentFiles from './components/RecentFiles';
import DirectoryNavbar from './components/DirectoryNavbar';

const defaultPageStyles = require('../../../styles/default-page');
const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        flexDirection: 'row'
    }
});

class DirectoryPage extends Component {

    constructor(props) {
        super(props);
    }

    renderDirectoryContent(route, navigator) {
        return <DirectoryContent directory={route.directory} navigator={navigator} />;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={[ defaultPageStyles.pageWithStatusBar ]}>
                    <DirectoryNavbar />
                    <View style={ styles.contentWrapper }>
                        <RecentFiles />
                        <Navigator
                            style={{ flex: 1 }}
                            initialRoute={{}}
                            renderScene={ this.renderDirectoryContent }
                        />
                    </View>
                </View>
                <KeyboardSpacer />
            </View>
        );
    }

}

export default DirectoryPage;