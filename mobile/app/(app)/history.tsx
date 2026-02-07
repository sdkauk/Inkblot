import { JournalEntry, journalService } from "@/services/journalService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function History() {
  const [entries, setEntries] = useState<JournalEntry[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const fetchEntries = async () => {
    setLoading(true);
    try {
      var entries = await journalService.getJournalEntries();
      setEntries(entries);
    } catch (e) {
      setError("Failed to load entries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  type ItemProps = { title: string; preview: string; id: string };

  const Item = ({ title, preview }: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.date}>{title}</Text>
      <Text style={styles.preview} numberOfLines={2}>
        {preview}
      </Text>
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        !loading ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No entries yet</Text>
          </View>
        ) : null
      }
      refreshing={loading}
      onRefresh={fetchEntries}
      data={entries}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/(app)/entry/${item.id}` as any)}
        >
          <Item
            title={new Date(item.createdUtc).toLocaleDateString()}
            preview={item.content}
            id={item.id}
          />
        </Pressable>
      )}
      keyExtractor={(entry) => entry.id}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    padding: 16,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  date: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  preview: {
    fontSize: 16,
    color: "#000",
    lineHeight: 22,
  },
  empty: {
    paddingTop: 60,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
