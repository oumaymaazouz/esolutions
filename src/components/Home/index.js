import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import SideBar from './SideBar';

import MappingView from '../Tickets/MappingView';
import TicketsStack from '../Tickets';
import ProfileView from '../Auth/ProfileView';
import LaborStack from '../Labor';
import COLORS from '../../common/colors';

const Drawer = createDrawerNavigator();

const Home = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <SideBar {...props} />}
      drawerContentOptions={{
        activeTintColor: '#1d6b5b',
      }}
      initialRouteName="LaborTransactions"
      drawerPosition="left"
      drawerType="front">
      <Drawer.Screen
        name="Profile"
        component={ProfileView}
        options={{
          headerTitle: 'Profile',
          headerTitleStyle: {fontSize: 16},
          headerStyle: {backgroundColor: COLORS.blue},
          headerTintColor: COLORS.white,
        }}
      />
      <Drawer.Screen name="LaborTransactions" component={LaborStack} />
      {/* <Drawer.Screen name="Tickets" component={TicketsStack} /> */}
      <Drawer.Screen name="Map" component={MappingView} />
    </Drawer.Navigator>
  );
};

export default Home;
