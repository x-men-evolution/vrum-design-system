import { Text as RNText } from 'react-native';
import type { TextProps as RNTextProps } from 'react-native';
import { cssInterop } from 'nativewind';
import { textVariants } from '../internal/typography';
import type { TextVariant } from '../internal/typography';

export { TEXT_VARIANTS } from '../internal/typography';
export type { TextVariant } from '../internal/typography';

// Permite className (Tailwind via NativeWind) em cima do <Text> nativo do RN.
// Necessário porque este componente não passa pelo babel plugin do NativeWind
// (é uma lib pré-compilada) — cssInterop registra o mapeamento em runtime.
cssInterop(RNText, { className: 'style' });

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  className?: string;
};

export function Text({ variant = 'bodyMedium', style, ...props }: TextProps) {
  return <RNText style={[textVariants[variant], style]} {...props} />;
}
