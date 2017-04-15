import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  TouchableWithoutFeedback,
  Animated,
  Alert,
  TextInput,
  MapView
} from 'react-native'
import * as sitesActions from '../../actions/private-sites'
import { connect } from 'react-redux'
import SitesNavBar from '../navbars/sites-navbar'
import Icon from 'react-native-vector-icons/MaterialIcons'

import DefaultButton from '../buttons/default'

const defaultPageStyles = require('../../styles/default-page');
const styles = StyleSheet.create({
  noSitesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sitesListWrapper: {
    width: 250
  },
  pageContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  mapContainer: {
    flex: 1
  },
  siteCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    padding: 10
  },
  siteCardAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  titleText: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  aditionalFieldsText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#999'
  }
});

class SitesView extends Component {

  constructor (props) {
    super(props);
    this.state = {
      animations: {
        centralPanel: {
          width: new Animated.Value(0)
        },
        sites: {
          search: {
            height: new Animated.Value(0),
            maxHeight: 0
          }
        }
      },
      searchers: {
        sites: {
          query: '',
          visible: false
        }
      }
    }
  }

  drawSiteCards () {
    let sites = this.props.privateSites.data.filter((site) => {
      return  site.title.toLowerCase().indexOf(this.state.searchers.sites.query.toLowerCase()) > -1 ||
              site.address.toLowerCase().indexOf(this.state.searchers.sites.query.toLowerCase()) > -1 ||
              site.description.toLowerCase().indexOf(this.state.searchers.sites.query.toLowerCase()) > -1
    });
    if (sites.length) {
      return (
          <View style={ styles.siteCardsContainer }>
            {
              sites.map((site) => {
                return (
                  <TouchableWithoutFeedback
                    key={site.id}
                    onPress={() => { this.props.dispatch(sitesActions.selectSite(site)); }}
                    delayLongPress={ 2000 }
                    onLongPress={ () => { Alert.alert('Long press', 'This is long press') } }
                    onPressIn={ () => {  } }
                  >
                    <View style={ [styles.siteCard, {
                        backgroundColor: !this.props.privateSites.selected ? 'white' : this.props.privateSites.selected.id === site.id ? '#eff6fa' : 'white'
                      } ]}>
                      <View>
                        <Image source={ { uri: site.image } } style={ styles.siteCardAvatar } />
                      </View>
                      <View style={ { flex: 1, paddingLeft: 10, paddingRight: 5 } }>
                        <View><Text numberOfLines={1} style={ styles.titleText }>{ site.title }</Text></View>
                        <View><Text numberOfLines={1} style={ styles.aditionalFieldsText }>{ site.address }</Text></View>
                        {
                          (() => {
                            if (site.description) {
                              return <View><Text numberOfLines={1} style={ styles.aditionalFieldsText }>{ site.description }</Text></View>
                            }
                          })()
                        }
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })
            }
          </View>
      )
    } else {
      return (<View style={ styles.noSitesContainer }><Text>There are no sites</Text></View>)
    }
  }

  drawSelectedSite () {

    if (!this.props.privateSites.selected) { return null }

    return (
      <View style={ { flex: 1 } }>
        <View style={ { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffe500', marginBottom: 20 } }>
          <View style={ { width: 70, height: 40, padding: 5 } }>
            <Image source={ { uri: this.props.privateSites.selected.image } } style={ { width: 60, height: 60, borderRadius: 30 } } />
          </View>
          <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 14 } }>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }} numberOfLines={1}>{ this.props.privateSites.selected.title }</Text>
          </View>
          <View>
            <TouchableWithoutFeedback onPress={ () => { this.props.dispatch(sitesActions.unselectSite()); } }>
              <View style={ { padding: 5 } }>
                <Icon name="close" color="#000" style={ { fontSize: 20 } } />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={ { flex: 1 } }></View>

        <View style={ { padding: 5, borderTopWidth: 1, borderTopColor: '#ccc' } }>
          <View>
            <DefaultButton>
              <Text style={ { fontWeight: 'bold' } }>Files</Text>
            </DefaultButton>
          </View>
        </View>
      </View>
    );

  }

  _onRefresh () {
    console.log(this);
  }

  makeAnimations () {
    console.log(this.props.privateSites.selected);
    Animated.timing(
      this.state.animations.centralPanel.width,
      {
        toValue: this.props.privateSites.selected ? 300 : 0,
        duration: 500
      }
    ).start();
    Animated.timing(
      this.state.animations.sites.search.height,
      {
        toValue: this.state.searchers.sites.visible ? this.state.animations.sites.search.maxHeight : 0,
        duration: 100
      }
    ).start();
  }

  render () {
      setTimeout(() => { this.makeAnimations(); }, 0);
      return (
        <View style={ [defaultPageStyles.pageWithStatusBar, { zIndex: 3 }] }>
          <SitesNavBar />
          <View style={ styles.pageContainer }>
            <View style={ [styles.sitesListWrapper, {
              borderRightColor: '#ccc',
              borderRightWidth: 1
            }] }>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: this.state.searchers.sites.visible ? 0 : 1, borderBottomColor: '#ccc' }}>
                <View></View>
                <View>
                  <TouchableWithoutFeedback
                    onPress={ () => {
                        let newState = {...this.state};
                        newState.searchers.sites.visible = !this.state.searchers.sites.visible;
                        newState.searchers.sites.visible ? this.refs.seacrhSitesInput.focus() : this.refs.seacrhSitesInput.blur();
                        this.setState(newState);
                      }
                    }
                  >
                    <View
                      style={{
                        backgroundColor: this.state.searchers.sites.visible ? '#000' : '#fff',
                        padding: 5,
                        borderRadius: 0,
                        borderWidth: 0
                      }}
                    >
                      <Icon name="search" color={ this.state.searchers.sites.visible ? '#fff' : '#000' }
                        style={{ fontSize: 20 }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <Animated.View
                style={{ borderBottomWidth: this.state.searchers.sites.visible ? 1 : 0, borderBottomColor: '#ccc', height: this.state.animations.sites.search.height, overflow: 'hidden' }}
              >
                <View style={{ padding: 5, backgroundColor: '#000' }}
                  onLayout={ (e) => {
                    let newState = {...this.state};
                    newState.animations.sites.search.maxHeight = e.nativeEvent.layout.height;
                    this.setState(newState);
                  }}
                >
                  <TextInput ref={ 'seacrhSitesInput' } keyboardType="web-search" value={ this.state.searchers.sites.query } onChangeText={ (text) => { let newState = {...this.state}; newState.searchers.sites.query = text; this.setState(newState); } } style={{ height: 30, flex: 1, borderWidth: 1, borderColor: '#ccc', fontSize: 12, paddingTop: 3, paddingRight: 5,
                          paddingBottom: 3, paddingLeft: 5, backgroundColor: '#fff' }} placeholder="Search..." />
                </View>
              </Animated.View>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }
              >
                { this.drawSiteCards() }
              </ScrollView>
            </View>
            <Animated.View style={ { width: this.state.animations.centralPanel.width, zIndex: 2, overflow: 'hidden', borderRightColor: '#ccc', borderRightWidth: this.props.privateSites.selected ? 1 : 0 } }>
              { this.drawSelectedSite() }
            </Animated.View>
            <MapView
              style={ [styles.mapContainer, { zIndex: 1 }]}
            />
          </View>
        </View>
      );
  }

}

module.exports = connect(
  (state) => {
    return {
      privateSites: state.privateSites
    };
  })(SitesView);
