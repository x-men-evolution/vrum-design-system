import { Text as RNText } from 'react-native';
import type { TextProps as RNTextProps } from 'react-native';
import { cssInterop } from 'nativewind';
import { textVariants } from '../internal/typography';
import type { TextVariant } from '../internal/typography';

export { TEXT_VARIANTS } from '../internal/typography';
export type { TextVariant } from '../internal/typography';

// cssInterop registers className → style transformation at runtime for pre-built libs.
const StyledText = cssInterop(RNText, { className: 'style' });

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  className?: string;
};

export function Text({ variant = 'bodyMedium', style, className, ...props }: TextProps) {
  return <StyledText style={[textVariants[variant], style]} className={className} {...props} />;
}
