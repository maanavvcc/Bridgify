import React, { useState, useEffect } from 'react';
import { View, Button, Image, TouchableOpacity, Text } from 'react-native';
import Collapsible from 'react-native-collapsible';
import io from 'socket.io-client';
import { setSocket, updateSystemInfo } from '../config/actions.js'; // Assuming you have an action to update system info
import { useSelector, useDispatch } from 'react-redux';

const HomeScreen = ({ route, navigation }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const socket = useSelector((state) => state.socket);
  const systemInfo = useSelector((state) => state.systemInfo); // Assuming you store system info in the Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      // Listen for 'system-info' events from the server
      socket.on('system-info', (data) => {
        console.log('Received system-info:', data);
        // Dispatch an action to update the Redux store with the received system information
        dispatch(updateSystemInfo(data));
      });
    }

    // Clean up the socket event listener when the component unmounts
    return () => {
      if (socket) {
        socket.off('system-info');
      }
    };
  }, [socket, dispatch]);

  const handleDisconnect = () => {
    if (socket) {
      socket.disconnect();
      dispatch(setSocket(null)); // Clear the socket in the Redux store
      navigation.navigate('Connect');
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end', margin: 10 }}>
      <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
        <Image source={require('../assets/adaptive-icon.png')} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <View>
          <Button title="Disconnect" onPress={handleDisconnect} />
          {/* Display system information */}
          {systemInfo && (
            <View>
              <Text>CPU: {systemInfo.cpu.manufacturer} {systemInfo.cpu.brand}</Text>
              <Text>GPU: {systemInfo.gpu.controllers[0].vendor} {systemInfo.gpu.controllers[0].model}</Text>
              <Text>Memory Usage: {Math.round((1 - systemInfo.memory.free / systemInfo.memory.total) * 100)}%</Text>
              {/* Add more information as needed */}
            </View>
          )}
        </View>
      </Collapsible>
    </View>
  );
};

export default HomeScreen;
