import React, { useRef } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useGameState } from "../context/GameContext";

const HomeScreen = ({ navigation }) => {
  const { name, setName } = useGameState();
  const inputRef = useRef();

  const handleSubmit = () => {
    inputRef.current.clear(); // Clear the text field
  };

  return (
    <View style={styles.container}>
      <Text>Welcome, {name || "player"}!!</Text>
      <TextInput
        ref={inputRef}
        placeholder="Enter your name"
        onChangeText={setName}
        blurOnSubmit
        onSubmitEditing={handleSubmit}
      />
      <Button title="Go to Game" onPress={() => navigation.navigate("Game")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
