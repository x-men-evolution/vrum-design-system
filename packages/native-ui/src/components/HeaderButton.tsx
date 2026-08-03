import { Pressable, StyleSheet, View } from 'react-native';
import type { GestureResponderEvent, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { ArrowLeft, X } from 'lucide-react-native';
import { ColorPrimary700, SpacingXs } from '@x-men-evolution/design-tokens/native';
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
  const Icon = icons[type];

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={labels[type]} style={[styles.base, style]} {...props}>
      <View style={styles.icon}>
        <Icon size={18} color={ColorPrimary700} />
      </View>
      <Text variant="labelLargeBold" style={{ color: ColorPrimary700 }}>
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
