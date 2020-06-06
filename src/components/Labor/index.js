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
          header: () => (
            <Header style={{backgroundColor: COLORS.blue}}>
              <Left>
                <Button
                  transparent
                  onPress={() => props.navigation.toggleDrawer()}>
                  <Icon type="Feather" name="menu" style={{fontSize: 34}} />
                </Button>
              </Left>
              <Body style={styles.transListHeaderBody}>
                <Text style={{fontSize: 16, color: COLORS.white}}>
                  {`Transactions: ${route.params.month}`}
                </Text>
              </Body>
              <Right style={styles.transInfos}>
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
              </Right>
            </Header>
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
  transListHeaderBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  transInfos: {
    flexDirection: 'column',
    marginRight: 20,
  },
  transCountText: {
    color: COLORS.white,
    fontSize: 14,
  },
  transCountView: {flexDirection: 'row', alignItems: 'center'},
  transCountApprovedIcon: {color: '#5cb85c', fontSize: 15, marginRight: 10},
  transCountNotApprovedIcon: {color: '#d9534f', fontSize: 15, marginRight: 10},
});
export default LaborStack;
