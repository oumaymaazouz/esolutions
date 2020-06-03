/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Root} from 'native-base';
import {Provider} from 'react-redux';

import {getStore, setUpStore} from './src/store';
import ServerConnectView from './src/components/SystemConfig/ServerConnectView';
import LoginView from './src/components/Auth/Login';
import Home from './src/components/Home';

const Stack = createStackNavigator();

setUpStore();
const store = getStore();

const App = () => {
  return (
    <Root>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SystemConfig"
              component={ServerConnectView}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginView}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </Root>
  );
};

export default App;
