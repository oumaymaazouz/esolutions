import React from 'react';
import {connect} from 'react-redux';

import {View, Text, StyleSheet, Alert} from 'react-native';
import {Button, Icon, Toast} from 'native-base';

import {createStackNavigator} from '@react-navigation/stack';

import {COLORS} from '../../common/colors';

import LaborList from './LaborList';
import LaborMonthlyTransList from './LaborMonthlyTransList';
import LaborTransList from './LaborTransList';
import {getStore} from '../../store';
import {$handleTransactionApproval} from './state';

const Stack = createStackNavigator();

const withStore = connect(state => ({
  selectedTransactions: state.LaborApproval.selectedTransactions,
}));
const LaborApprovalStack = props => {
  const {selectedTransactions} = props;

  const approveTransactions = navigation => {
    const arrayIds = selectedTransactions.filter(
      item => item.genapprservreceipt === false,
    );
    const {dispatch} = getStore();
    Alert.alert(
      'Delete',
      'Do you really want to approve selected transactions ?',
      [
        {
          text: 'Approval',
          onPress: () => {
            Promise.all(
              arrayIds.map(async obj => {
                await dispatch($handleTransactionApproval(obj.labtransid, 1));
              }),
            ).then(() => {
              navigation.navigate('LaborMonthlyTransList');
              Toast.show({
                text: 'Successful approval.',
                type: 'success',
                duration: 6000,
              });
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
      <Stack.Screen
        name="LaborTransList"
        component={LaborTransList}
        options={({route, navigation}) => {
          const {firstname, lastname, month} = route.params;
          const isDeleting =
            !!selectedTransactions && selectedTransactions.length;
          function CustomHeader() {
            return (
              <View>
                {isDeleting ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.headerTitleStyle}>
                      {selectedTransactions.length}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Button
                        transparent
                        style={{
                          width: 60,
                          borderWidth: 1,
                          borderColor: COLORS.danger,
                          marginRight: 10,
                        }}>
                        <Icon
                          type="AntDesign"
                          name="closecircleo"
                          style={{color: COLORS.danger}}
                        />
                      </Button>
                      <Button
                        transparent
                        onPress={() => approveTransactions(navigation)}
                        style={{
                          width: 60,
                          borderWidth: 1,
                          borderColor: COLORS.success,
                        }}>
                        <Icon
                          type="AntDesign"
                          name="checkcircleo"
                          style={{color: COLORS.success}}
                        />
                      </Button>
                    </View>
                  </View>
                ) : (
                  <View>
                    <Text
                      style={
                        styles.headerTitleStyle
                      }>{`${firstname} ${lastname} (${month})`}</Text>
                  </View>
                )}
              </View>
            );
          }
          return {
            headerTitle: () => <CustomHeader />,
            headerTintColor: COLORS.white,
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
          };
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {backgroundColor: COLORS.blue},
  headerTitleStyle: {fontSize: 18, fontStyle: 'italic', color: COLORS.white},
  menuIcon: {
    fontSize: 34,
    color: COLORS.white,
  },
});

export default withStore(LaborApprovalStack);
