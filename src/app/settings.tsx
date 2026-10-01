import Constants from 'expo-constants';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { colors, radius, space } from '../theme';

export default function Settings() {
  const { session } = useAuth();
  const [busy, setBusy] = useState<'sign-out' | 'delete' | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signOut() {
    setBusy('sign-out');
    await supabase.auth.signOut();
  }

  // App Store guideline 5.1.1(v): an app that lets people create an account must let them delete it.
  async function deleteAccount() {
    setBusy('delete');
    setError(null);
    const { error } = await supabase.functions.invoke('delete-account', { method: 'POST' });
    if (error) {
      setError('Could not delete your account. Check your connection and try again.');
      setBusy(null);
      return;
    }
    await supabase.auth.signOut();
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Signed in as</Text>
        <Text style={styles.value}>{session?.user.email ?? 'Apple private email'}</Text>
      </View>
      <Button label="Sign out" variant="secondary" onPress={signOut} busy={busy === 'sign-out'} />

      <View style={styles.spacer} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {confirming ? (
        <View style={styles.confirm}>
          <Text style={styles.confirmText}>This deletes your account and every habit. It cannot be undone.</Text>
          <View style={styles.row}>
            <View style={styles.flex}><Button label="Cancel" variant="secondary" onPress={() => setConfirming(false)} /></View>
            <View style={styles.flex}><Button label="Delete" variant="danger" onPress={deleteAccount} busy={busy === 'delete'} /></View>
          </View>
        </View>
      ) : (
        <Button label="Delete account" variant="danger" onPress={() => setConfirming(true)} />
      )}
      <Text style={styles.version}>Daily {Constants.expoConfig?.version}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: space.lg, gap: space.md },
  card: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.line, padding: space.md, gap: 2 },
  label: { fontSize: 13, color: colors.muted },
  value: { fontSize: 17, color: colors.ink },
  spacer: { flex: 1 },
  error: { fontSize: 14, color: colors.danger, textAlign: 'center' },
  confirm: { gap: space.sm },
  confirmText: { fontSize: 15, color: colors.text, textAlign: 'center' },
  row: { flexDirection: 'row', gap: space.sm },
  flex: { flex: 1 },
  version: { fontSize: 12, color: colors.muted, textAlign: 'center' },
});
