import React from 'react';
import {connect} from 'react-redux';

import {View, Text, StyleSheet} from 'react-native';
import {Button, Icon} from 'native-base';

import {createStackNavigator} from '@react-navigation/stack';

import {COLORS} from '../../common/colors';

import LaborList from './LaborList';
import LaborMonthlyTransList from './LaborMonthlyTransList';
import LaborTransList from './LaborTransList';
import {getStore} from '../../store';
import {$removeAllTransactions} from './state';

const Stack = createStackNavigator();

const withStore = connect(state => ({
  selectedTransactions: state.LaborApproval.selectedTransactions,
}));
const LaborApprovalStack = props => {
  const {selectedTransactions} = props;
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
                  <View>
                    <Text style={styles.headerTitleStyle}>
                      {selectedTransactions.length}
                    </Text>
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
