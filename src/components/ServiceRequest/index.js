import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListingView from './ListingView';

import {Button, Icon} from 'native-base';
import {COLORS} from '../../common/colors';
import AddView from './AddView';
import SelectSubClassifications from './SelectSubClassifications';
import RequestDetails from './RequestDetails';
import WorkLogView from './WorkLogView';
import Attachments from './Attachments';

const Stack = createStackNavigator();

const ServiceRequestStack = props => {
  return (
    <Stack.Navigator initialRouteName="ListingView">
      <Stack.Screen
        name="ListingView"
        component={ListingView}
        options={{
          title: 'DASHBOARD',
          headerTintColor: COLORS.white,
          headerStyle: {fontSize: 20, backgroundColor: COLORS.blue},
          headerLeft: () => (
            <Button transparent onPress={() => props.navigation.toggleDrawer()}>
              <Icon
                type="Feather"
                name="menu"
                style={{fontSize: 34, color: COLORS.white}}
              />
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="AddView"
        component={AddView}
        options={{
          title: 'CLASSIFICATION',
          headerTintColor: COLORS.white,
          headerStyle: {fontSize: 20, backgroundColor: COLORS.blue},
          headerLeft: () => (
            <Button transparent onPress={() => props.navigation.toggleDrawer()}>
              <Icon
                type="Feather"
                name="menu"
                style={{fontSize: 34, color: COLORS.white}}
              />
            </Button>
          ),
        }}
      />

      <Stack.Screen
        name="SelectSubClassifications"
        component={SelectSubClassifications}
        options={{
          title: 'Add Service Request',
          headerTintColor: COLORS.white,
          headerStyle: {fontSize: 20, backgroundColor: COLORS.blue},
          headerLeft: () => (
            <Button transparent onPress={() => props.navigation.toggleDrawer()}>
              <Icon
                type="Feather"
                name="menu"
                style={{fontSize: 34, color: COLORS.white}}
              />
            </Button>
          ),
        }}
      />

      <Stack.Screen
        name="RequestDetails"
        component={RequestDetails}
        options={{
          title: 'Request details',
          headerTintColor: COLORS.white,
          headerStyle: {fontSize: 20, backgroundColor: COLORS.blue},
          headerLeft: () => (
            <Button transparent onPress={() => props.navigation.toggleDrawer()}>
              <Icon
                type="Feather"
                name="menu"
                style={{fontSize: 34, color: COLORS.white}}
              />
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="WorkLogView"
        component={WorkLogView}
        options={{
          title: 'Worklog',
          headerTintColor: COLORS.white,
          headerStyle: {fontSize: 20, backgroundColor: COLORS.blue},
          headerLeft: () => (
            <Button transparent onPress={() => props.navigation.toggleDrawer()}>
              <Icon
                type="Feather"
                name="menu"
                style={{fontSize: 34, color: COLORS.white}}
              />
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="Attachments"
        component={Attachments}
        options={{
          title: 'Attachments',
          headerTintColor: COLORS.white,
          headerStyle: {fontSize: 20, backgroundColor: COLORS.blue},
          headerLeft: () => (
            <Button transparent onPress={() => props.navigation.toggleDrawer()}>
              <Icon
                type="Feather"
                name="menu"
                style={{fontSize: 34, color: COLORS.white}}
              />
            </Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ServiceRequestStack;
