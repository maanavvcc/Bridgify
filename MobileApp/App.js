import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Connect from './src/components/Connect';
import Home from './src/components/Home';
import SystemInfoListener from './src/config/sysinfo.js'; // Import the SystemInfoListener
import ShortcutInfoListener from './src/config/shortcut.js';
import store from './src/config/store.js';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SystemInfoListener />
          <ShortcutInfoListener />
          <Stack.Navigator initialRouteName="Connect">
            <Stack.Screen name="Connect" component={Connect} />
            <Stack.Screen name="HomeScreen" component={Home} />
          </Stack.Navigator>
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
