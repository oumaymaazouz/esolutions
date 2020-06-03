import React from 'react';
import {Header, Left, Button, Icon, Body, Right} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';

import ListingView from '../Tickets/ListingView';
import DeatilsView from './DetailsView';
import AddView from './AddView';
import COLORS from '../../common/colors';

const Stack = createStackNavigator();

const TicketsStack = props => {
  return (
    <Stack.Navigator initialRouteName="Tickets">
      <Stack.Screen
        name="Tickets"
        component={ListingView}
        options={{
          header: () => (
            <Header style={{backgroundColor: COLORS.blue}}>
              <Left>
                <Button
                  // style={{paddingLeft: 0}}
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
        name="Details"
        component={DeatilsView}
        options={{
          headerStyle: {backgroundColor: COLORS.blue},
          headerTintColor: COLORS.white,
        }}
      />
      <Stack.Screen
        name="Add"
        component={AddView}
        options={{
          headerStyle: {backgroundColor: COLORS.blue},
          headerTintColor: COLORS.white,
        }}
      />
    </Stack.Navigator>
  );
};

export default TicketsStack;
