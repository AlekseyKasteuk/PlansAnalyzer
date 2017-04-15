import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated
} from 'react-native'

let styles = StyleSheet.create({
  defaultButton: {
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  }
});

class DefaultButton extends Component {

  colors = {
    unpressed: 'rgba(255, 209, 0, 1)',
    pressed: 'rgba(228, 205, 0, 1)'
  }

  constructor(props) {
    if (!props.onPress) { props.onPress = () => {} }
    if (!props.onLongPress) { props.onLongPress = () => {} }
    if (!props.delayLongPress) { props.delayLongPress = 1000 }
    if (!props.style) { props.style = {} }
    super(props);
    this.state = {
      backgroundColor: new Animated.Value(0),
      startBackgroundColor: this.colors.unpressed,
      endBackgroundColor: this.colors.pressed
    }
  }

  // 228, 205, 0
  // 255, 209, 0
  pressButton (type) {
    console.log(type, this.state);
    let value;
    if (type === 'in') {
      value = 1;
    } else {
      value = 0;
    }
    Animated.timing(this.state.backgroundColor, { toValue: value, duration: 100 }).start();
  }

  render() {
    const bgColor = this.state.backgroundColor.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ this.state.startBackgroundColor, this.state.endBackgroundColor ]
    })
    return (
      <TouchableWithoutFeedback
        onPressIn={ this.pressButton.bind(this, 'in') }
        onPressOut={ this.pressButton.bind(this, 'out') }
        onPress={ this.props.onPress }
        onLongPress={ this.props.onLongPress }
        delayLongPress={ this.props.delayLongPress }
      >
        <Animated.View style={ [styles.defaultButton, { backgroundColor: bgColor }, this.props.style] }>
          { this.props.children }
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

}

DefaultButton.propTypes = {
  onPress: PropTypes.func,
  style: View.propTypes.style,
  onLongPress: PropTypes.func,
  delayLongPress: PropTypes.number
}


module.exports = DefaultButton;
