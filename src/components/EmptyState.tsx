import { StyleSheet, Text, View } from 'react-native';
import { colors, space } from '../theme';

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: 'center', paddingVertical: 64, paddingHorizontal: space.xl, gap: space.sm },
  title: { fontSize: 20, fontWeight: '600', color: colors.ink },
  body: { fontSize: 15, color: colors.muted, textAlign: 'center', lineHeight: 22 },
});
