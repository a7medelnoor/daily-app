import { StyleSheet, Text, View } from 'react-native';
import { colors, space } from '../theme';

// Mission 0: if you can read this on your phone, you have earned "First Launch".
export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, Daily</Text>
      <Text style={styles.body}>Your app is running on your phone. Open PROMPTS.md and start Mission 1.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl, gap: space.sm },
  title: { fontSize: 32, fontWeight: '700', color: colors.ink },
  body: { fontSize: 16, color: colors.muted, textAlign: 'center' },
});
