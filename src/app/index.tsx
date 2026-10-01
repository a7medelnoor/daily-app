import { Link, Stack } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { HabitRow } from '../components/HabitRow';
import { useHabits } from '../lib/habits-store';
import { colors, space } from '../theme';

export default function Today() {
  const { habits, doneDays, toggleToday } = useHabits();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href="/new" asChild>
              <Pressable accessibilityLabel="Add habit" hitSlop={12}>
                <Text style={styles.headerButton}>＋</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
      <FlatList
        data={habits}
        keyExtractor={(h) => h.id}
        contentContainerStyle={styles.list}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={({ item }) => (
          <HabitRow habit={item} days={doneDays[item.id] ?? []} onToggle={() => toggleToday(item.id)} />
        )}
        ListEmptyComponent={
          <EmptyState title="No habits yet" body="Tap + to add your first one. Start small: one glass of water counts." />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: space.md, gap: space.sm },
  headerButton: { fontSize: 26, color: colors.accent, paddingHorizontal: space.xs },
});
