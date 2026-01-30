import { useRef, useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, TextInput } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const { height } = useReanimatedKeyboardAnimation();
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleClear = () => {
    Keyboard.dismiss();
    setIsEditing(false);
  };

  const swipeUp = Gesture.Fling()
    .direction(Directions.UP)
    .onEnd(() => {
      setText("");
    })
    .runOnJS(true);
  const tap = Gesture.Tap()
    .onEnd(() => {
      setIsEditing(true);
      inputRef.current?.focus();
    })
    .runOnJS(true);

  const gestures = Gesture.Race(swipeUp, tap);

  const buttonStyle = useAnimatedStyle(() => ({
    bottom: Math.max(20, -height.value + 20),
  }));

  return (
    <SafeAreaView style={styles.container}>
      {!isEditing && (
        <GestureDetector gesture={gestures}>
          <Animated.View style={styles.overlay} pointerEvents="box-only" />
        </GestureDetector>
      )}
      <TextInput
        ref={inputRef}
        value={text}
        onChangeText={setText}
        onFocus={handleFocus}
        style={styles.input}
        autoFocus={true}
        multiline={true}
      />
      <Animated.View style={[styles.clearButton, buttonStyle]}>
        <Pressable onPress={handleClear} style={styles.pressable}>
          <Text style={styles.clearButtonText}>✕</Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 24,
    textAlignVertical: "top",
    padding: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  clearButton: {
    position: "absolute",
    right: 20,
  },
  pressable: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 20,
  },
});
