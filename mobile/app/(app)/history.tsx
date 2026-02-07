import { JournalEntry, journalService } from "@/services/journalService";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function History() {
  const [entries, setEntries] = useState<JournalEntry[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    var entries = await journalService.getJournalEntries();
    setEntries(entries);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  type ItemProps = { title: string; preview: string };

  const Item = ({ title, preview }: ItemProps) => (
    <View>
      <Text>{title}</Text>
      <Text>{preview}</Text>
    </View>
  );

  return (
    <FlatList
      ListEmptyComponent={
        !loading ? (
          <View>
            <Text>No entries yet</Text>
          </View>
        ) : null
      }
      refreshing={loading}
      onRefresh={fetchEntries}
      data={entries}
      renderItem={({ item }) => (
        <Item
          title={new Date(item.createdUtc).toLocaleDateString()}
          preview={item.content}
        />
      )}
      keyExtractor={(entry) => entry.id}
    />
  );
}
