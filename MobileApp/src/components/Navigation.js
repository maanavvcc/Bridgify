import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { setSocket } from "../config/actions.js";
import { useSelector, useDispatch } from "react-redux";

const NavScreen = ({ route, navigation }) => {
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();

    // Remove the header
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]);

  const handleDisconnect = () => {
    if (socket) {
      socket.disconnect();
      dispatch(setSocket(null));
      navigation.navigate("Connect");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Performance")}
      >
        <Text style={styles.buttonText}>
          Computer Performance and File Transfer
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Mouse")}
      >
        <Text style={styles.buttonText}>Mousepad</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Keyboard")}
      >
        <Text style={styles.buttonText}>Keyboard</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDisconnect}>
        <Text style={styles.buttonText}>Disconnect</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch", 
    padding: 20,
    backgroundColor: "#161616",
    color: "white",
  },
  button: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#52400f",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default NavScreen;
