import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Actions } from 'react-native-redux-router'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

const defaultNavStyles = require('../../styles/default-nav');

const styles = StyleSheet.create({

});

class AddSiteNavBar extends Component {

  render () {
      return (
        <View style={ defaultNavStyles.container }>

          <View style={ defaultNavStyles.leftSection }></View>

          <View style={ defaultNavStyles.centerSection }>
            <Text style={ defaultNavStyles.pageName }>Add Sites</Text>
          </View>

          <View style={ defaultNavStyles.rightSection }>
            <Icon.Button
              underlayColor="#ffffff"
              name="close"
              color="#000"
              style={ { backgroundColor: 'white', padding: 2, borderRadius: 0, borderWidth: 0 } }
              onPress={ () => {
                  Actions.dismiss();
                }
              }
            />
          </View>
        </View>
      );
  }

}

module.exports = connect(
  (state) => {
    return state
  })(AddSiteNavBar);
