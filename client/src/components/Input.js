import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const Input = ({ type, value }) => {
  const [isActive, setIsActive] = React.useState(false);
  const styles = StyleSheet.create({
    container: {
      height: 40,
      width: 40,
      borderColor: isActive ? "black" : "grey",
      borderWidth: 5,
    },
  });

  return (
    // <View style={styles.container}>
    <Pressable
      style={{
        width: 50,
        height: 50,
        borderColor: isActive ? "black" : "grey",
        borderWidth: 5,
        borderRadius: 5,
      }}
      onPress={() => setIsActive(!isActive)}
    >
      <Text>{value || type}</Text>
    </Pressable>
    // </View>
  );
};

export default Input;
