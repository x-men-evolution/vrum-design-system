import { Text as RNText } from 'react-native';
import type { GestureResponderEvent, StyleProp, TextProps as RNTextProps, TextStyle } from 'react-native';
import { ColorBlue600, ColorTextDisabled } from '@x-men-evolution/design-tokens/native';
import { textVariants } from '../internal/typography';

export type LinkProps = Omit<RNTextProps, 'style'> & {
  children: string;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

export function Link({ children, disabled = false, style, onPress, ...props }: LinkProps) {
  // Sempre anexa um handler estável ao host, em vez de omitir onPress
  // condicionalmente: fireEvent.press (RNTL) sobe pela árvore de fibers e
  // encontra o onPress recebido pelo próprio componente Link caso o host
  // fique sem handler, disparando o clique mesmo com disabled.
  const handlePress = (event: GestureResponderEvent) => {
    if (disabled) return;
    onPress?.(event);
  };

  return (
    <RNText
      accessibilityRole="link"
      accessibilityState={{ disabled }}
      suppressHighlighting
      onPress={handlePress}
      style={[textVariants.bodyMedium, { color: disabled ? ColorTextDisabled : ColorBlue600 }, style]}
      {...props}
    >
      {children}
    </RNText>
  );
}
