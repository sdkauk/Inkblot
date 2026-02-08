import { JournalEntry, journalService } from "@/services/journalService";
import { formatDate } from "@/utils/format";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import EntryCard from "./EntryCard";

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<JournalEntry>,
);

export default function HistoryList({
  onDismiss,
  translateY,
  screenHeight,
}: HistoryListProps) {
  const [entries, setEntries] = useState<JournalEntry[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  const isScrollAtBottom = useSharedValue(true);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const result = await journalService.getJournalEntries();
      setEntries(result.reverse());
    } catch (e) {
      setError("Failed to load entries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      isScrollAtBottom.value = event.contentOffset.y <= 5;
    },
  });

  const nativeGesture = Gesture.Native();

  const panGesture = Gesture.Pan()
    .activeOffsetY(-10)
    .failOffsetY(10)
    .simultaneousWithExternalGesture(nativeGesture)
    .onEnd((event) => {
      const swipedFarEnough = event.translationY < -30;
      const swipedFastEnough = event.velocityY < -300;

      if (isScrollAtBottom.value && (swipedFarEnough || swipedFastEnough)) {
        translateY.value = withTiming(
          -screenHeight,
          {
            duration: 250,
            easing: Easing.out(Easing.ease),
          },
          (finished) => {
            if (finished) {
              runOnJS(onDismiss)();
            }
          },
        );
      }
    });

  const composedGesture = Gesture.Simultaneous(panGesture, nativeGesture);

  const Item = ({ entry }: { entry: JournalEntry }) => (
    <Pressable onPress={() => setSelectedEntry(entry)}>
      <View style={styles.item}>
        <Text style={styles.date}>{formatDate(entry.createdUtc)}</Text>
        <Text style={styles.preview} numberOfLines={2}>
          {entry.content}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <>
      <GestureDetector gesture={composedGesture}>
        <AnimatedFlatList
          inverted
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            !loading ? (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No entries yet</Text>
              </View>
            ) : null
          }
          data={entries}
          renderItem={({ item }) => <Item entry={item} />}
          keyExtractor={(entry) => entry.id}
        />
      </GestureDetector>
      {selectedEntry && (
        <EntryCard
          entry={selectedEntry}
          onDismiss={() => setSelectedEntry(null)}
        />
      )}
    </>
  );
}

export interface HistoryListProps {
  onDismiss: () => void;
  translateY: SharedValue<number>;
  screenHeight: number;
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  listContent: {
    padding: 16,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  date: {
    fontSize: 13,
    color: "rgba(0,0,0,0.4)",
    marginBottom: 4,
  },
  preview: {
    fontSize: 16,
    color: "rgba(0,0,0,0.6)",
    lineHeight: 22,
  },
  empty: {
    paddingTop: 60,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "rgba(0,0,0,0.4)",
  },
});
