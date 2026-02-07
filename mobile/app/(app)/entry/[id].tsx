import { JournalEntry, journalService } from "@/services/journalService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function EntryDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [entry, setEntry] = useState<JournalEntry>();
  const [loading, setLoading] = useState(false);

  const getJournalEntry = async () => {
    setLoading(true);
    var entry = await journalService.getJournalEntry(id);
    setEntry(entry);
    setLoading(false);
  };

  useEffect(() => {
    getJournalEntry();
  }, []);

  return (
    <>
      <Text>{new Date(entry?.createdUtc ?? "").toLocaleDateString()}</Text>
      <Text>{entry?.content}</Text>
    </>
  );
}
