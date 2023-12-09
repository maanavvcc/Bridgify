import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { setSocket } from "../config/actions.js";
import { useSelector, useDispatch } from "react-redux";

const NavScreen = ({ route, navigation }) => {
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();

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
    alignItems: "stretch", // Align items along the cross-axis (stretch to fill the width)
    padding: 20,
  },
  button: {
    flex: 1, // Each button takes up equal portions of the available space
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db",
    borderRadius: 10, // Adjust the borderRadius to make rounded corners
    marginBottom: 10, // Add marginBottom for spacing between buttons
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default NavScreen;
