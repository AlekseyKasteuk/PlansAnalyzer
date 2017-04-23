import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';

const defaultPageStyles = require('../../styles/default-page');

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class LoadingPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[defaultPageStyles.pageWithStatusBar, styles.container]}>
                <ActivityIndicator
                    animating={true}
                    style={{
                        height: 80,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                    }}
                    size="large"
                />
            </View>
        );
    }

}

export default LoadingPage;
