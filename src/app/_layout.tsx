import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '../lib/auth';
import { HabitsProvider } from '../lib/habits-store';
import { colors } from '../theme';

export default function RootLayout() {
  return (
    <AuthProvider>
      <HabitsProvider>
        <StatusBar style="dark" />
        <RootStack />
      </HabitsProvider>
    </AuthProvider>
  );
}

function RootStack() {
  const { session, ready } = useAuth();
  if (!ready) return null; // the splash screen stays up until we know who is signed in

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTintColor: colors.accent,
        headerTitleStyle: { color: colors.ink },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="index" options={{ title: 'Today' }} />
        <Stack.Screen name="new" options={{ title: 'New habit', presentation: 'modal' }} />
        <Stack.Screen name="habit/[id]" options={{ title: '' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Screen name="auth/callback" options={{ headerShown: false }} />
    </Stack>
  );
}
