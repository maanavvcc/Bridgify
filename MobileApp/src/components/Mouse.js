import React, { createContext, useState } from "react";
import { View, Text, PanResponder, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

const MovementInput = ({ route, navigation }) => {
  const socket = useSelector((state) => state.socket);
  let numberOfTouches;

  const panResponder = React.useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { x0, y0, moveX, moveY, numberActiveTouches } = gestureState;
        numberOfTouches = numberActiveTouches;
        socket.emit("move-mouse", moveX - x0, moveY - y0);
      },
    });
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.buttonContainer}>
        <Button
          title="Click"
          style={styles.button}
          onPress={() => {
            if (numberOfTouches > 1) {
              socket.emit("mouse-right");
            } else {
              socket.emit("mouse-click");
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 30,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    fontSize: 20,
  },
});

export default MovementInput;
