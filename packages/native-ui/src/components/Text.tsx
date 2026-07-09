import { StyleSheet, Text as RNText } from 'react-native';
import type { TextProps as RNTextProps, TextStyle as RNTextStyle } from 'react-native';
import {
  TextStyleDisplayLargeFontSize,
  TextStyleDisplayLargeFontWeight,
  TextStyleDisplayLargeLineHeight,
  TextStyleDisplayLargeLetterSpacing,
  TextStyleDisplayMediumFontSize,
  TextStyleDisplayMediumFontWeight,
  TextStyleDisplayMediumLineHeight,
  TextStyleDisplayMediumLetterSpacing,
  TextStyleDisplaySmallFontSize,
  TextStyleDisplaySmallFontWeight,
  TextStyleDisplaySmallLineHeight,
  TextStyleDisplaySmallLetterSpacing,
  TextStyleHeadlineLargeFontSize,
  TextStyleHeadlineLargeFontWeight,
  TextStyleHeadlineLargeLineHeight,
  TextStyleHeadlineLargeLetterSpacing,
  TextStyleHeadlineMediumFontSize,
  TextStyleHeadlineMediumFontWeight,
  TextStyleHeadlineMediumLineHeight,
  TextStyleHeadlineMediumLetterSpacing,
  TextStyleHeadlineSmallFontSize,
  TextStyleHeadlineSmallFontWeight,
  TextStyleHeadlineSmallLineHeight,
  TextStyleHeadlineSmallLetterSpacing,
  TextStyleTitleLargeFontSize,
  TextStyleTitleLargeFontWeight,
  TextStyleTitleLargeLineHeight,
  TextStyleTitleLargeLetterSpacing,
  TextStyleTitleMediumFontSize,
  TextStyleTitleMediumFontWeight,
  TextStyleTitleMediumLineHeight,
  TextStyleTitleMediumLetterSpacing,
  TextStyleTitleSmallFontSize,
  TextStyleTitleSmallFontWeight,
  TextStyleTitleSmallLineHeight,
  TextStyleTitleSmallLetterSpacing,
  TextStyleTitlePageFontSize,
  TextStyleTitlePageFontWeight,
  TextStyleTitlePageLineHeight,
  TextStyleTitlePageLetterSpacing,
  TextStyleTitleSectionFontSize,
  TextStyleTitleSectionFontWeight,
  TextStyleTitleSectionLineHeight,
  TextStyleTitleSectionLetterSpacing,
  TextStyleTitleDescriptionFontSize,
  TextStyleTitleDescriptionFontWeight,
  TextStyleTitleDescriptionLineHeight,
  TextStyleTitleDescriptionLetterSpacing,
  TextStyleBodyLargeFontSize,
  TextStyleBodyLargeFontWeight,
  TextStyleBodyLargeLineHeight,
  TextStyleBodyLargeLetterSpacing,
  TextStyleBodyMediumFontSize,
  TextStyleBodyMediumFontWeight,
  TextStyleBodyMediumLineHeight,
  TextStyleBodyMediumLetterSpacing,
  TextStyleBodySmallFontSize,
  TextStyleBodySmallFontWeight,
  TextStyleBodySmallLineHeight,
  TextStyleBodySmallLetterSpacing,
  TextStyleBodyLargeBoldFontSize,
  TextStyleBodyLargeBoldFontWeight,
  TextStyleBodyLargeBoldLineHeight,
  TextStyleBodyLargeBoldLetterSpacing,
  TextStyleBodyMediumBoldFontSize,
  TextStyleBodyMediumBoldFontWeight,
  TextStyleBodyMediumBoldLineHeight,
  TextStyleBodyMediumBoldLetterSpacing,
  TextStyleBodySmallBoldFontSize,
  TextStyleBodySmallBoldFontWeight,
  TextStyleBodySmallBoldLineHeight,
  TextStyleBodySmallBoldLetterSpacing,
  TextStyleLabelLargeFontSize,
  TextStyleLabelLargeFontWeight,
  TextStyleLabelLargeLineHeight,
  TextStyleLabelLargeLetterSpacing,
  TextStyleLabelMediumFontSize,
  TextStyleLabelMediumFontWeight,
  TextStyleLabelMediumLineHeight,
  TextStyleLabelMediumLetterSpacing,
  TextStyleLabelSmallFontSize,
  TextStyleLabelSmallFontWeight,
  TextStyleLabelSmallLineHeight,
  TextStyleLabelSmallLetterSpacing,
  TextStyleLabelLargeBoldFontSize,
  TextStyleLabelLargeBoldFontWeight,
  TextStyleLabelLargeBoldLineHeight,
  TextStyleLabelLargeBoldLetterSpacing,
  TextStyleLabelMediumBoldFontSize,
  TextStyleLabelMediumBoldFontWeight,
  TextStyleLabelMediumBoldLineHeight,
  TextStyleLabelMediumBoldLetterSpacing,
  TextStyleLabelSmallBoldFontSize,
  TextStyleLabelSmallBoldFontWeight,
  TextStyleLabelSmallBoldLineHeight,
  TextStyleLabelSmallBoldLetterSpacing,
} from '@x-men-evolution/design-tokens/native';

export const TEXT_VARIANTS = [
  "displayLarge",
  "displayMedium",
  "displaySmall",
  "headlineLarge",
  "headlineMedium",
  "headlineSmall",
  "titleLarge",
  "titleMedium",
  "titleSmall",
  "titlePage",
  "titleSection",
  "titleDescription",
  "bodyLarge",
  "bodyMedium",
  "bodySmall",
  "bodyLargeBold",
  "bodyMediumBold",
  "bodySmallBold",
  "labelLarge",
  "labelMedium",
  "labelSmall",
  "labelLargeBold",
  "labelMediumBold",
  "labelSmallBold"
] as const;

export type TextVariant = (typeof TEXT_VARIANTS)[number];

export type TextProps = RNTextProps & {
  variant?: TextVariant;
};

// Cada variante espelha um estilo de texto do Figma (ver text-styles.json em
// packages/design-tokens/tokens). fontWeight é convertido para string porque
// os tokens de peso são numéricos, mas RNTextStyle['fontWeight'] espera
// string ('400' | '500' | ...).
const styles = StyleSheet.create<Record<TextVariant, RNTextStyle>>({
  displayLarge: {
    fontSize: TextStyleDisplayLargeFontSize,
    fontWeight: String(TextStyleDisplayLargeFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleDisplayLargeLineHeight,
    letterSpacing: TextStyleDisplayLargeLetterSpacing
  },
  displayMedium: {
    fontSize: TextStyleDisplayMediumFontSize,
    fontWeight: String(TextStyleDisplayMediumFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleDisplayMediumLineHeight,
    letterSpacing: TextStyleDisplayMediumLetterSpacing
  },
  displaySmall: {
    fontSize: TextStyleDisplaySmallFontSize,
    fontWeight: String(TextStyleDisplaySmallFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleDisplaySmallLineHeight,
    letterSpacing: TextStyleDisplaySmallLetterSpacing
  },
  headlineLarge: {
    fontSize: TextStyleHeadlineLargeFontSize,
    fontWeight: String(TextStyleHeadlineLargeFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleHeadlineLargeLineHeight,
    letterSpacing: TextStyleHeadlineLargeLetterSpacing
  },
  headlineMedium: {
    fontSize: TextStyleHeadlineMediumFontSize,
    fontWeight: String(TextStyleHeadlineMediumFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleHeadlineMediumLineHeight,
    letterSpacing: TextStyleHeadlineMediumLetterSpacing
  },
  headlineSmall: {
    fontSize: TextStyleHeadlineSmallFontSize,
    fontWeight: String(TextStyleHeadlineSmallFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleHeadlineSmallLineHeight,
    letterSpacing: TextStyleHeadlineSmallLetterSpacing
  },
  titleLarge: {
    fontSize: TextStyleTitleLargeFontSize,
    fontWeight: String(TextStyleTitleLargeFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleTitleLargeLineHeight,
    letterSpacing: TextStyleTitleLargeLetterSpacing
  },
  titleMedium: {
    fontSize: TextStyleTitleMediumFontSize,
    fontWeight: String(TextStyleTitleMediumFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleTitleMediumLineHeight,
    letterSpacing: TextStyleTitleMediumLetterSpacing
  },
  titleSmall: {
    fontSize: TextStyleTitleSmallFontSize,
    fontWeight: String(TextStyleTitleSmallFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleTitleSmallLineHeight,
    letterSpacing: TextStyleTitleSmallLetterSpacing
  },
  titlePage: {
    fontSize: TextStyleTitlePageFontSize,
    fontWeight: String(TextStyleTitlePageFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleTitlePageLineHeight,
    letterSpacing: TextStyleTitlePageLetterSpacing
  },
  titleSection: {
    fontSize: TextStyleTitleSectionFontSize,
    fontWeight: String(TextStyleTitleSectionFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleTitleSectionLineHeight,
    letterSpacing: TextStyleTitleSectionLetterSpacing
  },
  titleDescription: {
    fontSize: TextStyleTitleDescriptionFontSize,
    fontWeight: String(TextStyleTitleDescriptionFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleTitleDescriptionLineHeight,
    letterSpacing: TextStyleTitleDescriptionLetterSpacing
  },
  bodyLarge: {
    fontSize: TextStyleBodyLargeFontSize,
    fontWeight: String(TextStyleBodyLargeFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleBodyLargeLineHeight,
    letterSpacing: TextStyleBodyLargeLetterSpacing
  },
  bodyMedium: {
    fontSize: TextStyleBodyMediumFontSize,
    fontWeight: String(TextStyleBodyMediumFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleBodyMediumLineHeight,
    letterSpacing: TextStyleBodyMediumLetterSpacing
  },
  bodySmall: {
    fontSize: TextStyleBodySmallFontSize,
    fontWeight: String(TextStyleBodySmallFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleBodySmallLineHeight,
    letterSpacing: TextStyleBodySmallLetterSpacing
  },
  bodyLargeBold: {
    fontSize: TextStyleBodyLargeBoldFontSize,
    fontWeight: String(TextStyleBodyLargeBoldFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleBodyLargeBoldLineHeight,
    letterSpacing: TextStyleBodyLargeBoldLetterSpacing
  },
  bodyMediumBold: {
    fontSize: TextStyleBodyMediumBoldFontSize,
    fontWeight: String(TextStyleBodyMediumBoldFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleBodyMediumBoldLineHeight,
    letterSpacing: TextStyleBodyMediumBoldLetterSpacing
  },
  bodySmallBold: {
    fontSize: TextStyleBodySmallBoldFontSize,
    fontWeight: String(TextStyleBodySmallBoldFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleBodySmallBoldLineHeight,
    letterSpacing: TextStyleBodySmallBoldLetterSpacing
  },
  labelLarge: {
    fontSize: TextStyleLabelLargeFontSize,
    fontWeight: String(TextStyleLabelLargeFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleLabelLargeLineHeight,
    letterSpacing: TextStyleLabelLargeLetterSpacing
  },
  labelMedium: {
    fontSize: TextStyleLabelMediumFontSize,
    fontWeight: String(TextStyleLabelMediumFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleLabelMediumLineHeight,
    letterSpacing: TextStyleLabelMediumLetterSpacing
  },
  labelSmall: {
    fontSize: TextStyleLabelSmallFontSize,
    fontWeight: String(TextStyleLabelSmallFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleLabelSmallLineHeight,
    letterSpacing: TextStyleLabelSmallLetterSpacing
  },
  labelLargeBold: {
    fontSize: TextStyleLabelLargeBoldFontSize,
    fontWeight: String(TextStyleLabelLargeBoldFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleLabelLargeBoldLineHeight,
    letterSpacing: TextStyleLabelLargeBoldLetterSpacing
  },
  labelMediumBold: {
    fontSize: TextStyleLabelMediumBoldFontSize,
    fontWeight: String(TextStyleLabelMediumBoldFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleLabelMediumBoldLineHeight,
    letterSpacing: TextStyleLabelMediumBoldLetterSpacing
  },
  labelSmallBold: {
    fontSize: TextStyleLabelSmallBoldFontSize,
    fontWeight: String(TextStyleLabelSmallBoldFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleLabelSmallBoldLineHeight,
    letterSpacing: TextStyleLabelSmallBoldLetterSpacing
  },
});

export function Text({ variant = 'bodyMedium', style, ...props }: TextProps) {
  return <RNText style={[styles[variant], style]} {...props} />;
}
