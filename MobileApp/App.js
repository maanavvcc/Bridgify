import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Connect from './src/components/Connect';
import Home from './src/components/Home';
import store from './src/config/store.js';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Connect">
          <Stack.Screen name="Connect" component={Connect} />
          <Stack.Screen name="HomeScreen" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;