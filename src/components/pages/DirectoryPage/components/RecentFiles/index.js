import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';

const styles = StyleSheet.create({
    mainWrapper: {
        width: 250,
        borderRightColor: '#ddd',
        borderRightWidth: 1
    },
    filesList: {
        flex: 1
    }
});

class RecentFiles extends Component {

    filesDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    renderFile(file, section, number) {
        const num = number - 0;
        return (
            <View>
                <Text>{ file.name }</Text>
            </View>
        );
    }

    renderList() {
        if (this.state.items.length) {
            return (
                <ListView
                    automaticallyAdjustContentInsets={false}
                    style={ styles.filesList }
                    dataSource={ this.filesDataSource.cloneWithRows(this.state.items) }
                    renderRow={ this.renderFile.bind(this) }
                />
            );
        } else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text>There is no recent files</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={ styles.mainWrapper }>
                <View>
                    <Text>Recent files</Text>
                </View>
                {
                    this.renderList()
                }
            </View>
        );
    }

}

export default RecentFiles;