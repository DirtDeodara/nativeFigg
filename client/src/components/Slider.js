import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const BaseSlider = (props) => {
  const [value, setValue] = useState(props.value ?? 0);
  return (
    <View>
      <Text style={styles.text}>{value && +value.toFixed(3)}</Text>
      <Slider
        step={1}
        style={styles.slider}
        {...props}
        value={value}
        onValueChange={setValue}
        maximumValue={99}
      />
    </View>
  );
};
const AdvancedSlider = (props) => {
  const [slideStartingValue, setSlideStartingValue] = useState(0);
  const [slideStartingCount, setSlideStartingCount] = useState(0);
  const [slideCompletionValue, setSlideCompletionValue] = useState(0);
  const [slideCompletionCount, setSlideCompletionCount] = useState(0);
  return (
    <View>
      <BaseSlider
        {...props}
        onSlidingStart={(value) => {
          setSlideStartingValue(value);
          setSlideStartingCount((prev) => prev + 1);
        }}
        onSlidingComplete={(value) => {
          setSlideCompletionValue(value);
          setSlideCompletionCount((prev) => prev + 1);
        }}
      />
      <Text>
        Starts: {slideStartingCount} Value: {slideStartingValue}
      </Text>
      <Text>
        Completions: {slideCompletionCount} Value: {slideCompletionValue}
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 10,
  },
});

export default AdvancedSlider;
