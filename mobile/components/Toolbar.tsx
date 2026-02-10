import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing } from "../constants/theme";

const TOOLBAR_HEIGHT = 62;

export interface ToolbarProps {
  left?: ReactNode;
  right?: ReactNode;
}

export default function Toolbar({ left, right }: ToolbarProps) {
  const { height } = useReanimatedKeyboardAnimation();
  const insets = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => {
    const keyboardUp = height.value < -50;
    return {
      bottom: keyboardUp
        ? -height.value + spacing.sm
        : Math.max(spacing.sm, insets.bottom),
      transform: [{ translateY: 0 }],
    };
  });

  return (
    <Animated.View
      style={[styles.container, animatedStyle]}
      pointerEvents="box-none"
    >
      <View style={styles.inner} pointerEvents="box-none">
        <View style={styles.side}>{left}</View>
        <View style={styles.spacer} pointerEvents="none" />
        <View style={[styles.side, styles.rightSide]}>{right}</View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    zIndex: 20,
  },
  inner: {
    height: TOOLBAR_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
  },
  side: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  rightSide: {
    alignItems: "flex-end",
  },
  spacer: {
    flex: 1,
  },
});
