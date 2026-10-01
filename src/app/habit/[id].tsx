import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { lastDays, streak } from '../../lib/dates';
import { useHabits } from '../../lib/habits-store';
import { colors, radius, space } from '../../theme';

const WEEKDAY = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function HabitDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { habits, doneDays, deleteHabit } = useHabits();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const habit = habits.find((h) => h.id === id);

  if (!habit) return <EmptyState title="Habit not found" body="It may have been deleted." />;

  const days = doneDays[habit.id] ?? [];
  const week = lastDays(7);

  async function remove() {
    setBusy(true);
    setError(null);
    try {
      await deleteHabit(habit!.id);
      router.back();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not delete. Try again.');
      setBusy(false);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: habit.name }} />
      <View style={styles.hero}>
        <Text style={styles.big}>{streak(days)}</Text>
        <Text style={styles.caption}>day streak</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Last 7 days</Text>
        <View style={styles.week}>
          {week.map((day) => {
            const done = days.includes(day);
            const weekday = WEEKDAY[new Date(`${day}T12:00:00`).getDay()];
            return (
              <View key={day} style={styles.dayCol} accessibilityLabel={`${day}: ${done ? 'done' : 'not done'}`}>
                <View style={[styles.dot, done && styles.dotDone]} />
                <Text style={styles.dayLabel}>{weekday}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.spacer} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {confirming ? (
        <View style={styles.confirm}>
          <Text style={styles.confirmText}>Delete "{habit.name}" and its history?</Text>
          <View style={styles.confirmRow}>
            <View style={styles.flex}><Button label="Cancel" variant="secondary" onPress={() => setConfirming(false)} /></View>
            <View style={styles.flex}><Button label="Delete" variant="danger" onPress={remove} busy={busy} /></View>
          </View>
        </View>
      ) : (
        <Button label="Delete habit" variant="danger" onPress={() => setConfirming(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: space.lg, gap: space.lg },
  hero: { alignItems: 'center', paddingVertical: space.lg },
  big: { fontSize: 72, fontWeight: '700', color: colors.accent, fontVariant: ['tabular-nums'] },
  caption: { fontSize: 15, color: colors.muted },
  card: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.line, padding: space.md, gap: space.md },
  cardTitle: { fontSize: 14, fontWeight: '600', color: colors.muted },
  week: { flexDirection: 'row', justifyContent: 'space-between' },
  dayCol: { alignItems: 'center', gap: 6 },
  dot: { width: 28, height: 28, borderRadius: radius.pill, backgroundColor: colors.line },
  dotDone: { backgroundColor: colors.accent },
  dayLabel: { fontSize: 12, color: colors.muted },
  spacer: { flex: 1 },
  error: { fontSize: 14, color: colors.danger, textAlign: 'center' },
  confirm: { gap: space.sm },
  confirmText: { fontSize: 15, color: colors.text, textAlign: 'center' },
  confirmRow: { flexDirection: 'row', gap: space.sm },
  flex: { flex: 1 },
});
