import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { colors, ink, opacity } from "../constants/theme";

const CIRCLE_SIZE = 36;
const HIT_AREA = 44;
const ICON_SIZE = 20;

export type CircleButtonVariant = "filled" | "ghost";

export interface CircleButtonProps {
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
  variant?: CircleButtonVariant;
  disabled?: boolean;
}

export default function CircleButton({
  icon,
  onPress,
  variant = "filled",
  disabled = false,
}: CircleButtonProps) {
  const isFilled = variant === "filled";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={(HIT_AREA - CIRCLE_SIZE) / 2}
      style={styles.hitArea}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.circle,
            isFilled ? styles.circleFilled : styles.circleGhost,
            pressed &&
              !disabled &&
              (isFilled
                ? styles.circleFilledPressed
                : styles.circleGhostPressed),
            disabled && styles.disabled,
          ]}
        >
          <Feather
            name={icon}
            size={ICON_SIZE}
            color={isFilled ? colors.background : ink(opacity.full)}
          />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hitArea: {
    width: HIT_AREA,
    height: HIT_AREA,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.3,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  circleFilled: {
    backgroundColor: ink(opacity.full),
  },
  circleFilledPressed: {
    backgroundColor: ink(0.7),
  },
  circleGhost: {
    backgroundColor: "transparent",
  },
  circleGhostPressed: {
    backgroundColor: ink(opacity.border),
  },
});
