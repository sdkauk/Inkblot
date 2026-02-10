import { JournalEntry } from "@/services/journalService";
import { formatDate } from "@/utils/format";
import { useEffect } from "react";
import { BackHandler, StyleSheet, Text } from "react-native";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import {
  colors,
  fonts,
  fontSize,
  ink,
  lineHeight,
  opacity,
  spacing,
} from "../constants/theme";
import CircleButton from "./CircleButton";

export default function EntryCard({ entry, onDismiss }: EntryCardProps) {
  useEffect(() => {
    const handler = BackHandler.addEventListener("hardwareBackPress", () => {
      onDismiss();
      return true;
    });
    return () => handler.remove();
  }, []);

  return (
    <Pressable style={styles.outerWrapper} onPress={onDismiss}>
      <Pressable style={styles.innerWrapper} onPress={onDismiss}>
        <Pressable style={styles.card} onPress={() => {}}>
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
            <Text style={styles.date}>{formatDate(entry.createdUtc)}</Text>
            <Text style={styles.content}>{entry.content}</Text>
          </ScrollView>
          <CircleButton icon="x" onPress={onDismiss} variant="ghost" />
        </Pressable>
      </Pressable>
    </Pressable>
  );
}

export interface EntryCardProps {
  entry: JournalEntry;
  onDismiss: () => void;
}

const styles = StyleSheet.create({
  outerWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
  innerWrapper: {
    flex: 1,
    backgroundColor: colors.scrim,
  },
  card: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: ink(opacity.border),
    borderRadius: 4,
    padding: spacing.lg,
    flex: 1,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xxl,
  },
  date: {
    fontFamily: fonts.sans,
    fontSize: fontSize.label,
    lineHeight: lineHeight.label,
    color: ink(opacity.light),
    marginBottom: spacing.sm,
  },
  content: {
    fontFamily: fonts.serif,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    color: ink(opacity.full),
  },
  closeButton: {
    alignSelf: "flex-end",
    marginTop: spacing.md,
  },
  closeButtonText: {
    fontFamily: fonts.sans,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    color: ink(opacity.light),
  },
});
