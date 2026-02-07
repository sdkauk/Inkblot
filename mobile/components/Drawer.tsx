import { colors } from "@/constants/theme";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function Drawer({
  visible,
  onDismiss,
  canDismiss,
  children,
}: DrawerProps) {
  const [mounted, setMounted] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  const translateY = useSharedValue(-screenHeight);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const swipeUp = Gesture.Fling()
    .direction(Directions.UP)
    .onEnd(() => {
      if (canDismiss) {
        onDismiss();
      }
    })
    .runOnJS(true);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    } else {
      translateY.value = withTiming(-screenHeight, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      setTimeout(() => setMounted(false), 300);
    }
  }, [visible]);

  if (!mounted) return null;
  return (
    <View style={styles.view}>
      <GestureDetector gesture={swipeUp}>
        <Animated.View
          style={[animatedStyle, styles.animatedView, { height: screenHeight }]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export interface DrawerProps {
  visible: boolean;
  onDismiss: () => void;
  canDismiss: boolean;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: "#FAF9F6",
  },
  animatedView: {
    backgroundColor: colors.background,
  },
});
