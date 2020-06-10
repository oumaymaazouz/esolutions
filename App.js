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
import {PersistGate} from 'redux-persist/integration/react';
import {Root} from 'native-base';
import {Provider} from 'react-redux';

import {getStore, setUpStore, getPersistor} from './src/store';
import LoginView from './src/components/Auth/Login';
import Home from './src/components/Home';

const Stack = createStackNavigator();

setUpStore();
const store = getStore();
const persistor = getPersistor();

const App = () => {
  return (
    <Root>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
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
        </PersistGate>
      </Provider>
    </Root>
  );
};

export default App;
