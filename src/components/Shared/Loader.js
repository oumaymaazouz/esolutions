import React from 'react';
import {View} from 'react-native';
import {Spinner} from 'native-base';

import {COLORS} from '../../common/colors';

const Loader = () => (
  <View style={{flex: 1, justifyContent: 'center'}}>
    <Spinner color={COLORS.blue} />
  </View>
);

export default Loader;
