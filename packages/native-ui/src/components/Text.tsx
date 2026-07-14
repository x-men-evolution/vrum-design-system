import { Text as RNText } from 'react-native';
import type { TextProps as RNTextProps } from 'react-native';
import { textVariants } from '../internal/typography';
import type { TextVariant } from '../internal/typography';

export { TEXT_VARIANTS } from '../internal/typography';
export type { TextVariant } from '../internal/typography';

export type TextProps = RNTextProps & {
  variant?: TextVariant;
};

export function Text({ variant = 'bodyMedium', style, ...props }: TextProps) {
  return <RNText style={[textVariants[variant], style]} {...props} />;
}
