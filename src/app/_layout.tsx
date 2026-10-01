import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { HabitsProvider } from '../lib/habits-store';
import { colors } from '../theme';

export default function RootLayout() {
  return (
    <HabitsProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerTintColor: colors.accent,
          headerTitleStyle: { color: colors.ink },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Today' }} />
        <Stack.Screen name="new" options={{ title: 'New habit', presentation: 'modal' }} />
        <Stack.Screen name="habit/[id]" options={{ title: '' }} />
      </Stack>
    </HabitsProvider>
  );
}
