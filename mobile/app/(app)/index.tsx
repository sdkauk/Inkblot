import { useAuth } from "@/hooks/useAuth";
import { journalService } from "@/services/journalService";
import { useRouter } from "expo-router";
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
import Drawer from "../../components/Drawer";
import HistoryList from "../../components/HistoryList";

export default function Journal() {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const { height } = useReanimatedKeyboardAnimation();
  const inputRef = useRef<TextInput>(null);
  const { logout } = useAuth();
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleClear = () => {
    Keyboard.dismiss();
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const handleDismissDrawer = () => {
    setDrawerVisible(false);
  };

  const swipeUp = Gesture.Fling()
    .direction(Directions.UP)
    .onEnd(async () => {
      if (text.trim()) {
        try {
          await journalService.createJournalEntry({ content: text });
        } catch (error) {
          console.error("Failed to save entry:", error);
          return;
        }
      }
      setText("");
    })
    .runOnJS(true);

  const swipeDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onEnd(() => setDrawerVisible(true))
    .runOnJS(true);

  const tap = Gesture.Tap()
    .onEnd(() => {
      setIsEditing(true);
      inputRef.current?.focus();
    })
    .runOnJS(true);

  const gestures = Gesture.Race(swipeUp, swipeDown, tap);

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
      <Drawer visible={drawerVisible} onDismiss={handleDismissDrawer}>
        {({ translateY, screenHeight }) => (
          <HistoryList
            onDismiss={handleDismissDrawer}
            translateY={translateY}
            screenHeight={screenHeight}
          />
        )}
      </Drawer>
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
