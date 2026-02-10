import { useAuth } from "@/hooks/useAuth";
import { journalService } from "@/services/journalService";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
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
import Header from "../../components/Header";
import HistoryList from "../../components/HistoryList";
import PopoverMenu from "../../components/PopoverMenu";
import Toolbar from "../../components/Toolbar";
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
  const inputRef = useRef<TextInput>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [entryCardOpen, setEntryCardOpen] = useState(false);
  const saveTranslateY = useSharedValue(0);
  const saveOpacity = useSharedValue(1);
  const [saveError, setSaveError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

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

  const handleSave = async () => {
    if (!text.trim()) return;
    try {
      await journalService.createJournalEntry({ content: text });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      Keyboard.dismiss();
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
  };

  const swipeUp = Gesture.Fling()
    .direction(Directions.UP)
    .onEnd(() => {
      handleSave();
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

  const gestures = Gesture.Race(swipeUp, tap);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <GestureDetector gesture={swipeDown}>
        <View>
          <Header
            left={
              <CircleButton
                icon="menu"
                variant="ghost"
                onPress={() => setMenuVisible(true)}
              />
            }
            center={
              <Pressable
                style={styles.drawerTab}
                onPress={() => setDrawerVisible(true)}
              >
                <Text style={styles.drawerTabText}>Inkblot</Text>
                <Feather
                  name="chevron-down"
                  size={14}
                  color={ink(opacity.medium)}
                />
              </Pressable>
            }
            right={
              <CircleButton
                icon="more-horizontal"
                variant="ghost"
                onPress={() => {}}
              />
            }
          />
        </View>
      </GestureDetector>
      <PopoverMenu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        items={[
          {
            label: "Log out",
            icon: "power",
            onPress: logout,
            confirm: {
              title: "Log out?",
              message: "Are you sure you want to log out?",
            },
          },
        ]}
      />
      {saveError && (
        <Text style={styles.errorText}>Couldn't save. Try again.</Text>
      )}
      {!isEditing && (
        <GestureDetector gesture={gestures}>
          <Animated.View style={styles.overlay} pointerEvents="box-only" />
        </GestureDetector>
      )}
      <Animated.View style={[styles.content, textAnimatedStyle]}>
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
      {!entryCardOpen && (
        <Toolbar
          right={
            drawerVisible ? (
              <CircleButton
                icon="home"
                onPress={() => setDrawerVisible(false)}
              />
            ) : (
              <CircleButton icon="arrow-up" onPress={handleSave} />
            )
          }
        />
      )}
      <Drawer visible={drawerVisible} onDismiss={handleDismissDrawer}>
        {({ translateY, screenHeight }) => (
          <HistoryList
            onDismiss={handleDismissDrawer}
            onEntrySelect={setEntryCardOpen}
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
  content: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontFamily: fonts.serif,
    fontSize: fontSize.writing,
    lineHeight: lineHeight.writing,
    color: ink(opacity.full),
    textAlignVertical: "top",
    padding: spacing.lg,
    paddingBottom: 60,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  errorText: {
    fontFamily: fonts.sans,
    textAlign: "center",
    color: ink(opacity.light),
    fontSize: fontSize.label,
    lineHeight: lineHeight.label,
    paddingVertical: spacing.sm,
  },
  drawerTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  drawerTabText: {
    fontFamily: fonts.sans,
    fontSize: fontSize.ui,
    lineHeight: lineHeight.ui,
    color: ink(opacity.full),
  },
});
