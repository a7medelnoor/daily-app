import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { dayKey, streak } from '../lib/dates';
import { Habit } from '../lib/habits-store';
import { colors, radius, space } from '../theme';

type Props = { habit: Habit; days: string[]; onToggle: () => void };

export function HabitRow({ habit, days, onToggle }: Props) {
  const done = days.includes(dayKey());
  const count = streak(days);

  return (
    <View style={styles.row}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: done }}
        accessibilityLabel={`Mark ${habit.name} done today`}
        hitSlop={8}
        style={[styles.check, done && styles.checkDone]}
      >
        {done ? <Text style={styles.tick}>✓</Text> : null}
      </Pressable>
      <Link href={{ pathname: '/habit/[id]', params: { id: habit.id } }} asChild>
        <Pressable style={styles.body}>
          <Text style={[styles.name, done && styles.nameDone]} numberOfLines={1}>
            {habit.name}
          </Text>
          <Text style={styles.streak}>{count === 1 ? '1 day' : `${count} days`}</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: space.md,
    paddingVertical: 14,
  },
  check: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: { backgroundColor: colors.accent, borderColor: colors.accent },
  tick: { color: colors.onAccent, fontSize: 16, fontWeight: '700' },
  body: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: space.sm },
  name: { flex: 1, fontSize: 17, color: colors.ink, fontWeight: '500' },
  nameDone: { color: colors.muted },
  streak: { fontSize: 14, color: colors.accent, fontVariant: ['tabular-nums'] },
});
