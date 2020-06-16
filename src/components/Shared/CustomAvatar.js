import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../common/colors';

const CustomAvatar = props => {
  const firstLetter =
    props.firstname && props.firstname.slice(0, 1).toUpperCase();
  const lastLetter = props.lastname && props.lastname.slice(0, 1).toUpperCase();
  return (
    <View style={styles.avatar}>
      <Text style={styles.capitals}>{`${firstLetter}${lastLetter}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DA6DD',
    borderWidth: 0.5,
    borderColor: COLORS.darkGray,
  },
  capitals: {
    color: COLORS.white,
    fontSize: 18,
    letterSpacing: 2,
  },
});

export default CustomAvatar;
