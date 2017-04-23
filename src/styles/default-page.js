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
    marginTop: 32,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10
  }
});
