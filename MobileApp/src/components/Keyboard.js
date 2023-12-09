import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "../config/styles.js";

const Keyboard = ({ navigation }) => {
  const socket = useSelector((state) => state.socket);
  const [inputText, setInputText] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  // Remove the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleFocus = () => {
    // Hide the TextInput when it's focused
    setIsVisible(false);
  };

  const handleBlur = () => {
    setIsVisible(true);
    setInputText("");
  };
  const handleBackspace = () => {
    socket.emit("backspace");
  };

  return (
    <View style={styles.connect}>
      {isVisible && (
        <TextInput
          id="Text-input"
          style={{
            height: 40,
            marginTop: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: "80%",
            marginBottom: 20,
            padding: 10,
            color: isVisible ? "black" : "transparent",
          }}
          value={inputText}
          placeholder="Type here..."
          onChangeText={(text) => {
            socket.emit("text", text);
          }}
          onBlur={handleBlur}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === "Backspace") {
              handleBackspace();
            }
          }}
        />
      )}
    </View>
  );
};

export default Keyboard;
