import React from 'react';
import {Header, Left, Button, Icon, Body, Right} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';

import ListTransacrtionsView from './ListTransacrtionsView';

import COLORS from '../../common/colors';
import AddTransactionsView from './AddTransactionsView';
import PreviewAddTransactionsView from './PreviewAddTransactionsView';

const Stack = createStackNavigator();

const LaborStack = props => {
  return (
    <Stack.Navigator initialRouteName="TransactionsList">
      <Stack.Screen
        name="TransactionsList"
        component={ListTransacrtionsView}
        options={{
          header: () => (
            <Header style={{backgroundColor: COLORS.blue}}>
              <Left>
                <Button
                  transparent
                  onPress={() => props.navigation.toggleDrawer()}>
                  <Icon type="Feather" name="menu" style={{fontSize: 34}} />
                </Button>
              </Left>
              <Body />
              <Right />
            </Header>
          ),
        }}
      />
      <Stack.Screen
        name="AddTransactions"
        component={AddTransactionsView}
        options={{
          headerTitle: 'Bulk add transactions',
          headerTitleStyle: {fontSize: 16},
          headerStyle: {backgroundColor: COLORS.blue},
          headerTintColor: COLORS.white,
        }}
      />
      <Stack.Screen
        name="PreviewAddTransactions"
        component={PreviewAddTransactionsView}
        options={{
          headerTitle: 'Preview transactions',
          headerTitleStyle: {fontSize: 16},
          headerStyle: {backgroundColor: COLORS.blue},
          headerTintColor: COLORS.white,
        }}
      />
    </Stack.Navigator>
  );
};

export default LaborStack;
