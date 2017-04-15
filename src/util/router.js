import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import { Actions } from 'react-native-redux-router'
import Icon from 'react-native-vector-icons/MaterialIcons'

import SitesView from '../components/pages/sites'
import AddSite from '../components/pages/add-site'

const routes = {
  'sites': {
    page: SitesView
  },
  'addSite': {
    page: AddSite
  }
}


module.exports = routes;
