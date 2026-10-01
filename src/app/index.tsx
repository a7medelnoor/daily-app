import { Link, Stack } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { HabitRow } from '../components/HabitRow';
import { useHabits } from '../lib/habits-store';
import { colors, space } from '../theme';

export default function Today() {
  const { habits, doneDays, loading, error, toggleToday } = useHabits();

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Link href="/settings" asChild>
              <Pressable accessibilityLabel="Settings" hitSlop={12}>
                <Text style={styles.headerButton}>⚙︎</Text>
              </Pressable>
            </Link>
          ),
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
        ListHeaderComponent={error ? <Text style={styles.error}>{error}</Text> : null}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color={colors.accent} style={styles.loading} />
          ) : (
            <EmptyState title="No habits yet" body="Tap + to add your first one. Start small: one glass of water counts." />
          )
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { padding: space.md, gap: space.sm },
  error: { fontSize: 14, color: colors.danger, paddingBottom: space.sm },
  loading: { marginTop: 64 },
  headerButton: { fontSize: 26, color: colors.accent, paddingHorizontal: space.xs },
});
