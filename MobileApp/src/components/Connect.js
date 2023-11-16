import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import config from '../config/config.json';
import { setSocket } from '../config/actions.js'; // Assuming config.json exports an object

const Connect = ({ navigation }) => {
  const [securityKey, setSecurityKey] = useState('');
  const dispatch = useDispatch();

  
  const handleConnect = () => {
    const socket = io(config.server.ip);

    // Move the acknowledgment logic to the server side
    socket.on('mobile-connected', () => {
      console.log('Server acknowledged successful connection.');
      // Assuming the acknowledgment is successful, navigate here
      dispatch(setSocket(socket));
      navigation.navigate('HomeScreen');
      
      // Disconnect the socket after the connection is established
    });
  
    // Emit the security key to the server
    socket.emit('mobile-connect', securityKey, (acknowledgment) => {
      if (acknowledgment !== 'success') {
        // Handle unsuccessful connection (optional)
        console.error('Connection unsuccessful');
        // You may want to show an error message or take other actions here
        // Disconnect the socket in case of connection error
        socket.disconnect();
      }
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

export default Connect;
