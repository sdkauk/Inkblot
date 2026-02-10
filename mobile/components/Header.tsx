import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  ink,
  lineHeight,
  opacity,
  spacing,
} from "../constants/theme";

const HEADER_HEIGHT = 44;
export { HEADER_HEIGHT };

export interface HeaderProps {
  left?: ReactNode;
  title?: string;
  center?: ReactNode;
  right?: ReactNode;
}

export default function Header({ left, title, center, right }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>{left}</View>
      {center ? (
        <View style={styles.center}>{center}</View>
      ) : title ? (
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      ) : (
        <View style={styles.center} />
      )}
      <View style={[styles.side, styles.rightSide]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ink(opacity.border),
    backgroundColor: colors.background,
    zIndex: 20,
  },
  side: {
    width: 48,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  rightSide: {
    alignItems: "flex-end",
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontFamily: fonts.sans,
    fontSize: fontSize.ui,
    lineHeight: lineHeight.ui,
    color: ink(opacity.full),
  },
});
