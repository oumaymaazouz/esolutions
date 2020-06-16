import React from 'react';

import {StyleSheet} from 'react-native';
import {Button, Icon} from 'native-base';

import {createStackNavigator} from '@react-navigation/stack';

import LaborList from './LaborList';
import {COLORS} from '../../common/colors';

const Stack = createStackNavigator();

const LaborApprovalStack = props => {
  return (
    <Stack.Navigator initialRouteName="LaborList">
      <Stack.Screen
        name="LaborList"
        component={LaborList}
        options={{
          title: 'Labor list',
          headerTintColor: COLORS.white,
          headerStyle: styles.headerStyle,
          headerLeft: () => (
            <Button transparent onPress={() => props.navigation.toggleDrawer()}>
              <Icon type="Feather" name="menu" style={styles.menuIcon} />
            </Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {backgroundColor: COLORS.blue},
  menuIcon: {
    fontSize: 34,
    color: COLORS.white,
  },
});

export default LaborApprovalStack;
