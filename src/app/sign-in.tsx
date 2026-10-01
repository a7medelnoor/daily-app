import * as AppleAuthentication from 'expo-apple-authentication';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { isAppleSignInAvailable, signInWithApple, signInWithGoogle } from '../lib/social-auth';
import { supabase } from '../lib/supabase';
import { colors, radius, space } from '../theme';

type Mode = 'sign-in' | 'sign-up';
type Busy = 'email' | 'google' | 'apple' | null;

export default function SignIn() {
  const [mode, setMode] = useState<Mode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState<Busy>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [appleAvailable, setAppleAvailable] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') isAppleSignInAvailable().then(setAppleAvailable);
  }, []);

  async function run(kind: Exclude<Busy, null>, action: () => Promise<unknown>) {
    setBusy(kind);
    setError(null);
    setNotice(null);
    try {
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Try again.');
    } finally {
      setBusy(null);
    }
  }

  function submitEmail() {
    return run('email', async () => {
      if (mode === 'sign-in') {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password });
        if (error) throw error;
        if (!data.session) setNotice('Check your inbox to confirm your email, then sign in.');
      }
    });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>Daily</Text>
          <Text style={styles.tagline}>Small habits, every day.</Text>
        </View>

        <View style={styles.form}>
          {appleAvailable ? (
            // Apple's own button: App Review expects it to follow Apple's design rules.
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={radius.md}
              style={styles.apple}
              onPress={() => run('apple', signInWithApple)}
            />
          ) : null}
          <Button label="Continue with Google" variant="secondary" onPress={() => run('google', signInWithGoogle)} busy={busy === 'google'} />

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.or}>or with email</Text>
            <View style={styles.line} />
          </View>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={colors.muted}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password (8+ characters)"
            placeholderTextColor={colors.muted}
            secureTextEntry
            autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
            style={styles.input}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {notice ? <Text style={styles.notice}>{notice}</Text> : null}
          <Button
            label={mode === 'sign-in' ? 'Sign in' : 'Create account'}
            onPress={submitEmail}
            disabled={!email.includes('@') || password.length < 8}
            busy={busy === 'email'}
          />
          <Pressable onPress={() => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')} hitSlop={8}>
            <Text style={styles.switch}>
              {mode === 'sign-in' ? 'New here? Create an account' : 'Have an account? Sign in'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: space.lg, justifyContent: 'center', gap: space.xl },
  header: { alignItems: 'center', gap: space.xs },
  logo: { fontSize: 40, fontWeight: '700', color: colors.accent },
  tagline: { fontSize: 16, color: colors.muted },
  form: { gap: space.sm },
  apple: { height: 52, width: '100%' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: space.sm, marginVertical: space.sm },
  line: { flex: 1, height: 1, backgroundColor: colors.line },
  or: { fontSize: 13, color: colors.muted },
  input: {
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingHorizontal: space.md,
    fontSize: 16,
    color: colors.ink,
  },
  error: { fontSize: 14, color: colors.danger },
  notice: { fontSize: 14, color: colors.accent },
  switch: { fontSize: 15, color: colors.accent, textAlign: 'center', paddingVertical: space.sm },
});
