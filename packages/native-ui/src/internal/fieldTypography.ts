import { StyleSheet } from 'react-native';
import type { TextStyle } from 'react-native';
import {
  TextStyleBodyLargeFontSize,
  TextStyleBodyLargeFontWeight,
  TextStyleBodyLargeLetterSpacing,
  TextStyleBodyLargeLineHeight,
  TextStyleBodyMediumFontSize,
  TextStyleBodyMediumFontWeight,
  TextStyleBodyMediumLetterSpacing,
  TextStyleBodyMediumLineHeight,
  TextStyleBodySmallFontSize,
  TextStyleBodySmallFontWeight,
  TextStyleBodySmallLetterSpacing,
  TextStyleBodySmallLineHeight,
  TextStyleLabelSmallFontSize,
  TextStyleLabelSmallFontWeight,
  TextStyleLabelSmallLetterSpacing,
  TextStyleLabelSmallLineHeight
} from '@x-men-evolution/design-tokens/native';

export const fieldTypography = StyleSheet.create<Record<'bodySmall' | 'bodyMedium' | 'bodyLarge' | 'labelSmall', TextStyle>>({
  bodySmall: {
    fontSize: TextStyleBodySmallFontSize,
    fontWeight: String(TextStyleBodySmallFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleBodySmallLineHeight,
    letterSpacing: TextStyleBodySmallLetterSpacing
  },
  bodyMedium: {
    fontSize: TextStyleBodyMediumFontSize,
    fontWeight: String(TextStyleBodyMediumFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleBodyMediumLineHeight,
    letterSpacing: TextStyleBodyMediumLetterSpacing
  },
  bodyLarge: {
    fontSize: TextStyleBodyLargeFontSize,
    fontWeight: String(TextStyleBodyLargeFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleBodyLargeLineHeight,
    letterSpacing: TextStyleBodyLargeLetterSpacing
  },
  labelSmall: {
    fontSize: TextStyleLabelSmallFontSize,
    fontWeight: String(TextStyleLabelSmallFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleLabelSmallLineHeight,
    letterSpacing: TextStyleLabelSmallLetterSpacing
  }
});
