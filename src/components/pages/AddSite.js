import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    CameraRoll
} from 'react-native'
import {connect} from 'react-redux'
import AddSiteNavBar from '../navbars/add-site-navbar'
import {addSite} from '../../util/storage'

const defaultPageStyles = require('../../styles/default-page');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    siteAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    formContainer: {
        flex: 1,
        padding: 5
    },
    formRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 5
    },
    formRowLabelContainer: {
        width: 100
    },
    formRowLabel: {
        fontSize: 15
    },
    formRowValueContainer: {
        flex: 1,
		height: 40
    },
	formRowMultilineValueContainer: {
		flex: 1,
		height: 80
	},
    formRowValueInputText: {
        flex: 1,
        padding: 5,
        borderColor: '#ccc',
        borderWidth: 1
    },
    popupFooter: {
        borderTopColor: '#ccc',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    popupFooterButton: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 3,
        backgroundColor: '#05A5D1'
    },
    popupFooterButtonText: {
        fontSize: 14,
        color: 'white'
    }
});

class AddSite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            site: {
                title: '',
                address: '',
                description: '',
                image: 'default_building'
            }
        }
    }

    saveSite = async() => {
        console.log('Save site result:', await addSite(this.state.site));
    }

    getNewImage() {
        console.log('Upload new image');
    }

    render() {
        return (
            <View style={defaultPageStyles.popupContainer}>
                <AddSiteNavBar/>
                <View style={styles.container}>
                    <View style={{
                        padding: 5
                    }}>
                        <TouchableOpacity onPress={this.getNewImage}>
                            <Image source={{
                                uri: this.state.site.image
                            }} style={styles.siteAvatar}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.formRow}>
                            <View style={styles.formRowLabelContainer}>
                                <Text style={styles.formRowLabel}>Title:</Text>
                            </View>
                            <View style={styles.formRowValueContainer}>
                                <TextInput value={this.state.site.title} onChangeText={(text) => {
                                    this.setState({
                                        site: {
                                            ...this.state.site,
                                            title: text
                                        }
                                    });
                                }} style={styles.formRowValueInputText} placeholder="Title"/>
                            </View>
                        </View>
                        <View style={styles.formRow}>
                            <View style={styles.formRowLabelContainer}>
                                <Text style={styles.formRowLabel}>Address:</Text>
                            </View>
                            <View style={styles.formRowValueContainer}>
                                <TextInput value={this.state.site.address} onChangeText={(text) => {
                                    this.setState({
                                        site: {
                                            ...this.state.site,
                                            address: text
                                        }
                                    });
                                }} style={styles.formRowValueInputText} placeholder="Address"/>
                            </View>
                        </View>
                        <View style={styles.formRow}>
                            <View style={styles.formRowLabelContainer}>
                                <Text style={styles.formRowLabel}>Description:</Text>
                            </View>
                            <View style={styles.formRowMultilineValueContainer}>
                                <TextInput value={this.state.site.description} multiline={true} onChangeText={(text) => {
                                    this.setState({
                                        site: {
                                            ...this.state.site,
                                            description: text
                                        }
                                    });
                                }} style={[
                                    styles.formRowValueInputText, {
                                        height: 35
                                    }
                                ]} placeholder="Description"/>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.popupFooter}>
                    <TouchableOpacity style={styles.popupFooterButton} onPress={this.saveSite} disabled={!this.state.site.address || !this.state.site.address}>
                        <Text style={styles.popupFooterButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

module.exports = connect((state) => {
    console.log('Connect state:', state);
    return {};
})(AddSite);
