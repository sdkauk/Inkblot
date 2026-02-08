import { colors } from "@/constants/theme";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function Drawer({ visible, onDismiss, children }: DrawerProps) {
  const screenHeight = Dimensions.get("window").height;
  const translateY = useSharedValue(-screenHeight);
  const display = useSharedValue<"flex" | "none">("none");

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    display: display.value,
  }));

  useEffect(() => {
    if (visible) {
      display.value = "flex";
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    } else {
      if (translateY.value > -screenHeight + 10) {
        translateY.value = withTiming(
          -screenHeight,
          {
            duration: 300,
            easing: Easing.out(Easing.ease),
          },
          (finished) => {
            if (finished) {
              display.value = "none";
            }
          },
        );
      } else {
        display.value = "none";
      }
    }
  }, [visible]);

  return (
    <View style={styles.view} pointerEvents={visible ? "auto" : "none"}>
      <Animated.View
        style={[animatedStyle, styles.animatedView, { height: screenHeight }]}
      >
        {children({ translateY, screenHeight })}
      </Animated.View>
    </View>
  );
}

export interface DrawerChildProps {
  translateY: SharedValue<number>;
  screenHeight: number;
}

export interface DrawerProps {
  visible: boolean;
  onDismiss: () => void;
  children: (props: DrawerChildProps) => React.ReactNode;
}

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  animatedView: {
    backgroundColor: colors.background,
    overflow: "hidden",
  },
});
