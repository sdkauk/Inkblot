import { Feather } from "@expo/vector-icons";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  ink,
  lineHeight,
  opacity,
  spacing,
} from "../constants/theme";

export interface MenuItem {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
  confirm?: { title: string; message: string };
}

export interface PopoverMenuProps {
  visible: boolean;
  onDismiss: () => void;
  items: MenuItem[];
}

export default function PopoverMenu({
  visible,
  onDismiss,
  items,
}: PopoverMenuProps) {
  if (!visible) return null;

  const handlePress = (item: MenuItem) => {
    if (item.confirm) {
      onDismiss();
      Alert.alert(item.confirm.title, item.confirm.message, [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", style: "destructive", onPress: item.onPress },
      ]);
    } else {
      onDismiss();
      item.onPress();
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        <View style={styles.menu}>
          {items.map((item, i) => (
            <Pressable
              key={i}
              style={({ pressed }) => [
                styles.menuItem,
                i < items.length - 1 ? styles.menuItemBorder : undefined,
                pressed ? styles.menuItemPressed : undefined,
              ]}
              onPress={() => handlePress(item)}
            >
              <Feather name={item.icon} size={16} color={ink(opacity.full)} />
              <Text style={styles.menuItemText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    top: 100,
    left: spacing.md,
    minWidth: 160,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ink(opacity.border),
    shadowColor: ink(opacity.full),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  menuItemPressed: {
    backgroundColor: ink(opacity.border),
  },
  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ink(opacity.border),
  },
  menuItemText: {
    fontFamily: fonts.sans,
    fontSize: fontSize.ui,
    lineHeight: lineHeight.ui,
    color: ink(opacity.full),
  },
});
