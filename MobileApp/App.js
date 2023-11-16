import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import io from 'socket.io-client';
const config = require('./config.json');

const Stack = createStackNavigator();

const ConnectScreen = ({ navigation }) => {
  const [securityKey, setSecurityKey] = useState('');

  const handleConnect = () => {
    const socket = io(config.server.ip);

    // Emit the security key to the server
    socket.emit('mobile-connect', securityKey, (acknowledgment) => {
      if (acknowledgment === 'success') {
        console.log('Connection successful. Navigating to DisconnectScreen.');
        // Successful connection, navigate to the DisconnectScreen with socketId
        navigation.navigate('DisconnectScreen', { socketId: socket.id });
      } else {
        // Handle unsuccessful connection (optional)
        console.error('Connection unsuccessful');
        // You may want to show an error message or take other actions here
      }

      // Disconnect the socket regardless of the connection status
      socket.disconnect();
    });

    // Move the acknowledgment logic to the server side
    socket.on('mobile-connected', () => {
      console.log('Server acknowledged successful connection.');
      // Assuming the acknowledgment is successful, navigate here
      navigation.navigate('DisconnectScreen', { socketId: socket.id });
      
      // Disconnect the socket after the connection is established
      socket.disconnect();
    });

    socket.on('connection-error', (error) => {
      console.error('Server acknowledged unsuccessful connection:', error);
      // You can handle the error message here

      // Disconnect the socket in case of connection error
      socket.disconnect();
    });
  };

  // Remove the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginBottom: 20,
          padding: 10,
        }}
        placeholder="Enter Security Key"
        value={securityKey}
        onChangeText={(text) => {
          const numericValue = text.replace(/[^0-9]/g, '');
          const limitedValue = numericValue.slice(0, 6);
          setSecurityKey(limitedValue);
        }}
        keyboardType="numeric"
        maxLength={6}
      />
      <Button title="Connect" onPress={handleConnect} />
    </View>
  );
};

const DisconnectScreen = ({ route, navigation }) => {
  const { socketId } = route.params;

  // Retrieve the socket object based on socketId
  const socket = io(config.server.ip);

  const handleDisconnect = () => {
    // Implement the logic to disconnect or navigate to the ConnectScreen
    if (socket) {
      socket.disconnect();
    }
    // Navigate to the ConnectScreen
    navigation.navigate('ConnectScreen');
  };

  // Remove headers
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Connected!</Text>
      <Button title="Disconnect" onPress={handleDisconnect} />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ConnectScreen">
        <Stack.Screen name="ConnectScreen" component={ConnectScreen} />
        <Stack.Screen name="DisconnectScreen" component={DisconnectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
