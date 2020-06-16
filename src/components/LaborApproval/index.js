import React from 'react';

import {StyleSheet} from 'react-native';
import {Button, Icon} from 'native-base';

import {createStackNavigator} from '@react-navigation/stack';

import {COLORS} from '../../common/colors';

import LaborList from './LaborList';
import LaborMonthlyTransList from './LaborMonthlyTransList';

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
      <Stack.Screen
        name="LaborMonthlyTransList"
        component={LaborMonthlyTransList}
        options={({route}) => ({
          title: `${route.params.laborcode} : ${route.params.firstname} ${
            route.params.lastname
          }`,
          headerTintColor: COLORS.white,
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {backgroundColor: COLORS.blue},
  headerTitleStyle: {fontSize: 18, fontStyle: 'italic'},
  menuIcon: {
    fontSize: 34,
    color: COLORS.white,
  },
});

export default LaborApprovalStack;
