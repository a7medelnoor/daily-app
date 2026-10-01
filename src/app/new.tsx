import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../components/Button';
import { useHabits } from '../lib/habits-store';
import { colors, radius, space } from '../theme';

const MAX = 60;

export default function NewHabit() {
  const { addHabit } = useHabits();
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const valid = name.trim().length > 0;

  async function save() {
    if (!valid) return;
    setBusy(true);
    setError(null);
    try {
      await addHabit(name);
      router.back();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save the habit. Try again.');
      setBusy(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Habit name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Read 10 pages"
        placeholderTextColor={colors.muted}
        maxLength={MAX}
        autoFocus
        returnKeyType="done"
        onSubmitEditing={save}
        style={styles.input}
      />
      <Text style={styles.hint}>{name.length}/{MAX}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button label="Save" onPress={save} disabled={!valid} busy={busy} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: space.lg, gap: space.sm },
  label: { fontSize: 14, fontWeight: '600', color: colors.muted },
  input: {
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingHorizontal: space.md,
    fontSize: 17,
    color: colors.ink,
  },
  hint: { fontSize: 13, color: colors.muted, alignSelf: 'flex-end', fontVariant: ['tabular-nums'] },
  error: { fontSize: 14, color: colors.danger },
});
