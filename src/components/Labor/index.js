import React from 'react';
import {connect} from 'react-redux';

import { Text, View, StyleSheet, Alert } from 'react-native';
import { Button, Icon, Toast } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';

import ListTransacrtionsView from './ListTransacrtionsView';

import COLORS from '../../common/colors';
import AddTransactionsView from './AddTransactionsView';
import PreviewAddTransactionsView from './PreviewAddTransactionsView';
import MonthlyTransList from './MonthlyTransList';

import { getStore } from '../../store';

import { $deleteTransaction, $fetchLaborTransactions } from './state';

const Stack = createStackNavigator();

const withStore = connect(state => ({
  monthlyLaborTransactions: state.Labor.monthlyLaborTransactions,
}));
const LaborStack = props => {
  const deleteTransactions = arrayIds => {
    const { dispatch } = getStore();
    Alert.alert(
      'Delete',
      'Do you really want to delete highlighted transactions ?',
      [
        {
          text: 'Delete',
          onPress: () => {
            Promise.all(
              arrayIds.map(async id => {
                await dispatch($deleteTransaction(id));
              }),
            ).then(() => {
              Toast.show({
                text: 'Bulk delete successful.',
                type: 'success',
                duration: 6000,
              });
              dispatch($fetchLaborTransactions()).catch(() =>
                Toast.show({
                  text: 'Bulk delete failed.',
                  type: 'danger',
                  duration: 6000,
                }),
              );
            });
          },
        },
        {
          text: 'Cancel',
        },
      ],
    );
  };

  return (
    <Stack.Navigator initialRouteName="MonthlyTransList">
      <Stack.Screen
        name="MonthlyTransList"
        component={MonthlyTransList}
        options={{
          title: 'Summary',
          headerTintColor: COLORS.white,
          headerStyle: { fontSize: 20, backgroundColor: COLORS.blue },
          headerLeft: () => (
            <Button transparent onPress={() => props.navigation.toggleDrawer()}>
              <Icon
                type="Feather"
                name="menu"
                style={{ fontSize: 34, color: COLORS.white }}
              />
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="TransactionsList"
        component={ListTransacrtionsView}
        options={({ route }) => ({
          headerTintColor: COLORS.white,
          headerStyle: { backgroundColor: COLORS.blue },
          headerTitleStyle: { color: 'green' },
          headerRight: () => {
            const notApprovedTrans = props.monthlyLaborTransactions && props.monthlyLaborTransactions[route.params.month].filter((item) => item['spi:genapprservreceipt']).length;
            const approvedTrans = props.monthlyLaborTransactions && props.monthlyLaborTransactions[route.params.month].filter((item) => !item['spi:genapprservreceipt']).length;
            return (<View style={styles.headerRight}>
              <View style={styles.transCountView}>
                <Icon
                  type="FontAwesome"
                  name="circle"
                  style={styles.transCountApprovedIcon}
                />
                <Text style={styles.transCountText}>
                  {approvedTrans}
                </Text>
              </View>
              <View style={styles.transCountView}>
                <Icon
                  type="FontAwesome"
                  name="circle"
                  style={styles.transCountNotApprovedIcon}
                />
                <Text style={styles.transCountText}>
                  {notApprovedTrans}
                </Text>
              </View>
            </View>)
          },
          headerTitle: () => {
            return (
              <View style={styles.headerTitleComponent}>
                <Text style={styles.screenTitleText}>{route.params.month}</Text>
                <Button
                  transparent
                  style={styles.btnDelete}
                  onPress={() =>
                    deleteTransactions(route.params.itemsToDelete)
                  }>
                  <Icon
                    style={styles.btnDeleteIcon}
                    type="MaterialIcons"
                    name="delete"
                  />
                  <Text style={styles.btnDeleteText}>
                    {route.params.itemsToDelete &&
                      route.params.itemsToDelete.length}
                  </Text>
                </Button>
              </View>
            );
          },
        })}
      />
      <Stack.Screen
        name="AddTransactions"
        component={AddTransactionsView}
        options={{
          headerTitle: 'Labor reporting',
          headerTitleStyle: { fontSize: 20 },
          headerStyle: { backgroundColor: COLORS.blue },
          headerTintColor: COLORS.white,
        }}
      />
      <Stack.Screen
        name="PreviewAddTransactions"
        component={PreviewAddTransactionsView}
        options={{
          headerTitle: 'Preview transactions',
          headerTitleStyle: { fontSize: 20 },
          headerStyle: { backgroundColor: COLORS.blue },
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
  screenTitleText: { fontSize: 20, color: COLORS.white },
  transCountText: {
    color: COLORS.white,
    fontSize: 18,
  },
  transCountView: { flexDirection: 'row', alignItems: 'center' },
  transCountApprovedIcon: {
    color: COLORS.success,
    fontSize: 20,
    marginRight: 10,
  },
  transCountNotApprovedIcon: {
    color: COLORS.danger,
    fontSize: 20,
    marginRight: 10,
  },
  btnDeleteIcon: { color: COLORS.danger, fontSize: 40, marginTop: 0 },
  btnDeleteText: {
    color: COLORS.white,
    position: 'absolute',
    top: 15,
    left: 32,
    fontWeight: 'bold',
  },
  headerRight: {
    marginRight: 10,
  },
});
export default withStore(LaborStack);
