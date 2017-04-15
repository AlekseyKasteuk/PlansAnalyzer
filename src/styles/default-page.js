import React from 'react'
import { StyleSheet } from 'react-native'

module.exports = StyleSheet.create({
  pageWithStatusBar: {
    borderTopWidth: 22,
    borderTopColor: 'rgba(0,0,0,0.8)',
    flex: 1
  },
  pageWithoutStatusBar: {
    flex: 1
  },
  popupContainer: {
    width: 600,
    height: 400,
    backgroundColor: 'white'
  }
});
