import { JournalEntry } from "@/services/journalService";
import { formatDate } from "@/utils/format";
import { useEffect } from "react";
import { BackHandler, StyleSheet, Text } from "react-native";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import { colors, fontSize, ink, opacity, spacing } from "../constants/theme";

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
          <Pressable onPress={onDismiss} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </Pressable>
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
  card: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: ink(opacity.border),
    borderRadius: 4,
    padding: spacing.md,
    flex: 1,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xxl,
  },
  outerWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    flex: 1,
  },
  innerWrapper: {
    flex: 1,
    backgroundColor: ink(0.6),
  },
  date: {
    fontSize: fontSize.label,
    color: ink(opacity.light),
    marginBottom: spacing.sm,
  },
  content: {
    fontSize: fontSize.body,
    color: ink(opacity.full),
    lineHeight: 24,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginTop: spacing.md,
  },
  closeButtonText: {
    fontSize: fontSize.body,
    color: ink(opacity.light),
  },
});
