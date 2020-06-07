import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {Header, Left, Button, Icon, Body, Right} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';

import ListTransacrtionsView from './ListTransacrtionsView';

import COLORS from '../../common/colors';
import AddTransactionsView from './AddTransactionsView';
import PreviewAddTransactionsView from './PreviewAddTransactionsView';
import MonthlyTransList from './MonthlyTransList';

const Stack = createStackNavigator();

const LaborStack = props => {
  return (
    <Stack.Navigator initialRouteName="MonthlyTransList">
      <Stack.Screen
        name="MonthlyTransList"
        component={MonthlyTransList}
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
              <Body>
                <Text style={{fontSize: 14, color: COLORS.white}}>
                  Monthly Transactions
                </Text>
              </Body>
              <Right />
            </Header>
          ),
        }}
      />
      <Stack.Screen
        name="TransactionsList"
        component={ListTransacrtionsView}
        options={({route}) => ({
          headerTintColor: COLORS.white,
          headerStyle: {backgroundColor: COLORS.blue},
          headerTitle: () => (
            <View style={styles.headerTitleComponent}>
              <Text style={styles.screenTitleText}>
                {`Period : ${route.params.month}`}
              </Text>
              <View>
                <View style={styles.transCountView}>
                  <Icon
                    type="FontAwesome"
                    name="circle"
                    style={styles.transCountApprovedIcon}
                  />
                  <Text style={styles.transCountText}>
                    {route.params.approvedTrans}
                  </Text>
                </View>
                <View style={styles.transCountView}>
                  <Icon
                    type="FontAwesome"
                    name="circle"
                    style={styles.transCountNotApprovedIcon}
                  />
                  <Text style={styles.transCountText}>
                    {route.params.notApprovedTrans}
                  </Text>
                </View>
              </View>
            </View>
          ),
        })}
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

const styles = StyleSheet.create({
  headerTitleComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenTitleText: {fontSize: 16, color: COLORS.white},
  transCountText: {
    color: COLORS.white,
    fontSize: 14,
  },
  transCountView: {flexDirection: 'row', alignItems: 'center'},
  transCountApprovedIcon: {
    color: COLORS.success,
    fontSize: 15,
    marginRight: 10,
  },
  transCountNotApprovedIcon: {
    color: COLORS.danger,
    fontSize: 15,
    marginRight: 10,
  },
});
export default LaborStack;
