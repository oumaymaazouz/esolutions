import React from 'react';
import {View} from 'react-native';

class TouchableLongPress extends React.Component {
  static defaultProps = {
    onPress: () => null,
    delay: 300,
  };

  startPress = null;

  onStartShouldSetResponder = evt => {
    this.startPress = Date.now();

    return true;
  };

  onResponderRelease = () => {
    const now = Date.now();
    if (this.startPress && now - this.startPress > this.props.delay) {
      this.props.onPress();
    }
    this.startPress = null;
  };
  render() {
    return (
      <View
        onStartShouldSetResponder={this.onStartShouldSetResponder}
        onResponderRelease={this.onResponderRelease}>
        {this.props.children}
      </View>
    );
  }
}

export default TouchableLongPress;
