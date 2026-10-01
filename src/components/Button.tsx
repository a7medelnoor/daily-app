import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius } from '../theme';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  busy?: boolean;
};

export function Button({ label, onPress, variant = 'primary', disabled, busy }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || busy}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        (disabled || busy) && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {busy ? (
        <ActivityIndicator color={variant === 'primary' ? colors.onAccent : colors.accent} />
      ) : (
        <Text style={[styles.label, variant === 'primary' ? styles.onPrimary : variant === 'danger' ? styles.onDanger : styles.onSecondary]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { height: 52, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  primary: { backgroundColor: colors.accent },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  danger: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.danger },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.8 },
  label: { fontSize: 16, fontWeight: '600' },
  onPrimary: { color: colors.onAccent },
  onSecondary: { color: colors.ink },
  onDanger: { color: colors.danger },
});
