import { useAuth } from "@/hooks/useAuth";
import { journalService } from "@/services/journalService";
import * as Haptics from "expo-haptics";
import { useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleButton from "../../components/CircleButton";
import Drawer from "../../components/Drawer";
import HistoryList from "../../components/HistoryList";
import {
  colors,
  fonts,
  fontSize,
  ink,
  lineHeight,
  opacity,
  spacing,
} from "../../constants/theme";

export default function Journal() {
  const { logout } = useAuth();
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const { height } = useReanimatedKeyboardAnimation();
  const inputRef = useRef<TextInput>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const saveTranslateY = useSharedValue(0);
  const saveOpacity = useSharedValue(1);
  const [saveError, setSaveError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      bottom: Math.max(spacing.lg, -height.value + spacing.lg),
    };
  });
  const textAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: saveTranslateY.value }],
    opacity: saveOpacity.value,
  }));

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleClear = () => {
    Keyboard.dismiss();
    setIsEditing(false);
  };

  const handleDismissDrawer = () => {
    setDrawerVisible(false);
  };

  const resetAfterSave = () => {
    setText("");
    setRefreshKey((k) => k + 1);
    requestAnimationFrame(() => {
      saveTranslateY.value = 0;
      saveOpacity.value = 1;
    });
  };
  const swipeUp = Gesture.Fling()
    .direction(Directions.UP)
    .onEnd(async () => {
      if (!text.trim()) return;
      try {
        await journalService.createJournalEntry({ content: text });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        saveTranslateY.value = withTiming(-200, {
          duration: 250,
          easing: Easing.out(Easing.ease),
        });
        saveOpacity.value = withTiming(0, { duration: 250 }, (finished) => {
          if (finished) {
            runOnJS(resetAfterSave)();
          }
        });
      } catch (error) {
        setSaveError(true);
        setTimeout(() => setSaveError(false), 3000);
      }
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuButton}>
        <CircleButton icon="menu" variant="ghost" onPress={logout} />
      </View>
      {saveError && (
        <Text style={styles.errorText}>Couldn't save. Try again.</Text>
      )}
      {!isEditing && (
        <GestureDetector gesture={gestures}>
          <Animated.View style={styles.overlay} pointerEvents="box-only" />
        </GestureDetector>
      )}
      <Animated.View style={[{ flex: 1 }, textAnimatedStyle]}>
        <TextInput
          ref={inputRef}
          value={text}
          onChangeText={setText}
          onFocus={handleFocus}
          style={styles.input}
          autoFocus={true}
          multiline={true}
          // placeholder="What's on your mind..."
          placeholderTextColor={ink(opacity.subtle)}
        />
      </Animated.View>
      <Animated.View style={[styles.actionButton, buttonAnimatedStyle]}>
        <CircleButton icon="arrow-up" onPress={handleClear} />
      </Animated.View>
      <Drawer visible={drawerVisible} onDismiss={handleDismissDrawer}>
        {({ translateY, screenHeight }) => (
          <HistoryList
            onDismiss={handleDismissDrawer}
            translateY={translateY}
            screenHeight={screenHeight}
            refreshKey={refreshKey}
          />
        )}
      </Drawer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  menuButton: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    zIndex: 20,
  },
  input: {
    flex: 1,
    fontFamily: fonts.serif,
    fontSize: fontSize.writing,
    lineHeight: lineHeight.writing,
    color: ink(opacity.full),
    textAlignVertical: "top",
    padding: spacing.lg,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  actionButton: {
    position: "absolute",
    right: spacing.lg,
  },
  errorText: {
    fontFamily: fonts.sans,
    textAlign: "center",
    color: ink(opacity.light),
    fontSize: fontSize.label,
    lineHeight: lineHeight.label,
    paddingVertical: spacing.sm,
  },
});
