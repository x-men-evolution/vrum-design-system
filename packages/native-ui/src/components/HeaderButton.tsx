import { Pressable, StyleSheet, View } from 'react-native';
import type { GestureResponderEvent, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { ArrowLeft, X } from 'lucide-react-native';
import { SpacingXs } from '@x-men-evolution/design-tokens/native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export const HEADER_BUTTON_TYPES = ['voltar', 'fechar'] as const;
export type HeaderButtonType = (typeof HEADER_BUTTON_TYPES)[number];

export type HeaderButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  type?: HeaderButtonType;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

const icons = {
  voltar: ArrowLeft,
  fechar: X
};

const labels = {
  voltar: 'Voltar',
  fechar: 'Fechar'
};

export function HeaderButton({ type = 'voltar', style, ...props }: HeaderButtonProps) {
  const theme = useTheme();
  const Icon = icons[type];

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={labels[type]} style={[styles.base, style]} {...props}>
      <View style={styles.icon}>
        <Icon size={18} color={theme.text.brand} />
      </View>
      <Text variant="labelLargeBold" style={{ color: theme.text.brand }}>
        {labels[type]}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingXs
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
