import React, { useState, useEffect } from 'react';
import { View, TextInput,Image, TouchableOpacity, Text, Button } from 'react-native';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import config from '../config/config.json';
import { styles } from '../config/styles.js';
import { setSocket } from '../config/actions.js'; // Assuming config.json exports an object

const Connect = ({ navigation }) => {
  const [securityKey, setSecurityKey] = useState('');
  const dispatch = useDispatch();
  const systemInfo = useSelector((state) => state.systemInfo);
  
  const handleConnect = () => {
    const socket = io(config.server.ip+":80");

    // Move the acknowledgment logic to the server side
    socket.on('mobile-connected', () => {
      console.log('Server acknowledged successful connection.');
      // Assuming the acknowledgment is successful, navigate here
      dispatch(setSocket(socket));
      // Disconnect the socket after the connection is established
      navigation.navigate('HomeScreen');
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
    <View style={styles.connect}>
      <Image source={require('../assets/disconnected.png')} style={{ width: 100, height: 100}} />
      <TextInput
        style={{
          height: 40,
          marginTop: 40, 
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginBottom: 20,
          padding: 10,
          color: 'white'
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
      <TouchableOpacity style={styles.button} onPress={handleConnect}>
        <Text style={styles.buttonText}>connect</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Connect;