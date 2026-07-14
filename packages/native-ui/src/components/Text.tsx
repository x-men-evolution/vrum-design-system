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

// Mapeia o peso numérico de cada variante (font.weight.* em typography.json)
// para o arquivo de fonte Inter correspondente. React Native NÃO sintetiza
// bold/semibold em fontes customizadas: setar apenas fontWeight não muda o
// traço — cada peso precisa apontar para o arquivo carregado com esse peso.
// Os nomes seguem a convenção do @expo-google-fonts/inter, então o app
// consumidor deve carregar o Inter por lá (ou registrar esses mesmos nomes de
// família). Quem precisar de outra fonte pode sobrescrever via
// style={{ fontFamily }}, já que o style é mesclado por último em <Text>.
const FONT_WEIGHT_TO_FAMILY: Record<string, string> = {
  '400': 'Inter_400Regular',
  '500': 'Inter_500Medium',
  '600': 'Inter_600SemiBold',
  '700': 'Inter_700Bold',
};

function fontFamilyForWeight(weight: number): string {
  return FONT_WEIGHT_TO_FAMILY[String(weight)] ?? 'Inter_400Regular';
}

// Cada variante espelha um estilo de texto do Figma (ver text-styles.json em
// packages/design-tokens/tokens). fontWeight é convertido para string porque
// os tokens de peso são numéricos, mas RNTextStyle['fontWeight'] espera
// string ('400' | '500' | ...). fontFamily é derivado desse mesmo peso (ver
// FONT_WEIGHT_TO_FAMILY acima).
const styles = StyleSheet.create<Record<TextVariant, RNTextStyle>>({
  displayLarge: {
    fontFamily: fontFamilyForWeight(TextStyleDisplayLargeFontWeight),
    fontSize: TextStyleDisplayLargeFontSize,
    fontWeight: String(TextStyleDisplayLargeFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleDisplayLargeLineHeight,
    letterSpacing: TextStyleDisplayLargeLetterSpacing
  },
  displayMedium: {
    fontFamily: fontFamilyForWeight(TextStyleDisplayMediumFontWeight),
    fontSize: TextStyleDisplayMediumFontSize,
    fontWeight: String(TextStyleDisplayMediumFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleDisplayMediumLineHeight,
    letterSpacing: TextStyleDisplayMediumLetterSpacing
  },
  displaySmall: {
    fontFamily: fontFamilyForWeight(TextStyleDisplaySmallFontWeight),
    fontSize: TextStyleDisplaySmallFontSize,
    fontWeight: String(TextStyleDisplaySmallFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleDisplaySmallLineHeight,
    letterSpacing: TextStyleDisplaySmallLetterSpacing
  },
  headlineLarge: {
    fontFamily: fontFamilyForWeight(TextStyleHeadlineLargeFontWeight),
    fontSize: TextStyleHeadlineLargeFontSize,
    fontWeight: String(TextStyleHeadlineLargeFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleHeadlineLargeLineHeight,
    letterSpacing: TextStyleHeadlineLargeLetterSpacing
  },
  headlineMedium: {
    fontFamily: fontFamilyForWeight(TextStyleHeadlineMediumFontWeight),
    fontSize: TextStyleHeadlineMediumFontSize,
    fontWeight: String(TextStyleHeadlineMediumFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleHeadlineMediumLineHeight,
    letterSpacing: TextStyleHeadlineMediumLetterSpacing
  },
  headlineSmall: {
    fontFamily: fontFamilyForWeight(TextStyleHeadlineSmallFontWeight),
    fontSize: TextStyleHeadlineSmallFontSize,
    fontWeight: String(TextStyleHeadlineSmallFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleHeadlineSmallLineHeight,
    letterSpacing: TextStyleHeadlineSmallLetterSpacing
  },
  titleLarge: {
    fontFamily: fontFamilyForWeight(TextStyleTitleLargeFontWeight),
    fontSize: TextStyleTitleLargeFontSize,
    fontWeight: String(TextStyleTitleLargeFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleTitleLargeLineHeight,
    letterSpacing: TextStyleTitleLargeLetterSpacing
  },
  titleMedium: {
    fontFamily: fontFamilyForWeight(TextStyleTitleMediumFontWeight),
    fontSize: TextStyleTitleMediumFontSize,
    fontWeight: String(TextStyleTitleMediumFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleTitleMediumLineHeight,
    letterSpacing: TextStyleTitleMediumLetterSpacing
  },
  titleSmall: {
    fontFamily: fontFamilyForWeight(TextStyleTitleSmallFontWeight),
    fontSize: TextStyleTitleSmallFontSize,
    fontWeight: String(TextStyleTitleSmallFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleTitleSmallLineHeight,
    letterSpacing: TextStyleTitleSmallLetterSpacing
  },
  titlePage: {
    fontFamily: fontFamilyForWeight(TextStyleTitlePageFontWeight),
    fontSize: TextStyleTitlePageFontSize,
    fontWeight: String(TextStyleTitlePageFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleTitlePageLineHeight,
    letterSpacing: TextStyleTitlePageLetterSpacing
  },
  titleSection: {
    fontFamily: fontFamilyForWeight(TextStyleTitleSectionFontWeight),
    fontSize: TextStyleTitleSectionFontSize,
    fontWeight: String(TextStyleTitleSectionFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleTitleSectionLineHeight,
    letterSpacing: TextStyleTitleSectionLetterSpacing
  },
  titleDescription: {
    fontFamily: fontFamilyForWeight(TextStyleTitleDescriptionFontWeight),
    fontSize: TextStyleTitleDescriptionFontSize,
    fontWeight: String(TextStyleTitleDescriptionFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleTitleDescriptionLineHeight,
    letterSpacing: TextStyleTitleDescriptionLetterSpacing
  },
  bodyLarge: {
    fontFamily: fontFamilyForWeight(TextStyleBodyLargeFontWeight),
    fontSize: TextStyleBodyLargeFontSize,
    fontWeight: String(TextStyleBodyLargeFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleBodyLargeLineHeight,
    letterSpacing: TextStyleBodyLargeLetterSpacing
  },
  bodyMedium: {
    fontFamily: fontFamilyForWeight(TextStyleBodyMediumFontWeight),
    fontSize: TextStyleBodyMediumFontSize,
    fontWeight: String(TextStyleBodyMediumFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleBodyMediumLineHeight,
    letterSpacing: TextStyleBodyMediumLetterSpacing
  },
  bodySmall: {
    fontFamily: fontFamilyForWeight(TextStyleBodySmallFontWeight),
    fontSize: TextStyleBodySmallFontSize,
    fontWeight: String(TextStyleBodySmallFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleBodySmallLineHeight,
    letterSpacing: TextStyleBodySmallLetterSpacing
  },
  bodyLargeBold: {
    fontFamily: fontFamilyForWeight(TextStyleBodyLargeBoldFontWeight),
    fontSize: TextStyleBodyLargeBoldFontSize,
    fontWeight: String(TextStyleBodyLargeBoldFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleBodyLargeBoldLineHeight,
    letterSpacing: TextStyleBodyLargeBoldLetterSpacing
  },
  bodyMediumBold: {
    fontFamily: fontFamilyForWeight(TextStyleBodyMediumBoldFontWeight),
    fontSize: TextStyleBodyMediumBoldFontSize,
    fontWeight: String(TextStyleBodyMediumBoldFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleBodyMediumBoldLineHeight,
    letterSpacing: TextStyleBodyMediumBoldLetterSpacing
  },
  bodySmallBold: {
    fontFamily: fontFamilyForWeight(TextStyleBodySmallBoldFontWeight),
    fontSize: TextStyleBodySmallBoldFontSize,
    fontWeight: String(TextStyleBodySmallBoldFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleBodySmallBoldLineHeight,
    letterSpacing: TextStyleBodySmallBoldLetterSpacing
  },
  labelLarge: {
    fontFamily: fontFamilyForWeight(TextStyleLabelLargeFontWeight),
    fontSize: TextStyleLabelLargeFontSize,
    fontWeight: String(TextStyleLabelLargeFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleLabelLargeLineHeight,
    letterSpacing: TextStyleLabelLargeLetterSpacing
  },
  labelMedium: {
    fontFamily: fontFamilyForWeight(TextStyleLabelMediumFontWeight),
    fontSize: TextStyleLabelMediumFontSize,
    fontWeight: String(TextStyleLabelMediumFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleLabelMediumLineHeight,
    letterSpacing: TextStyleLabelMediumLetterSpacing
  },
  labelSmall: {
    fontFamily: fontFamilyForWeight(TextStyleLabelSmallFontWeight),
    fontSize: TextStyleLabelSmallFontSize,
    fontWeight: String(TextStyleLabelSmallFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleLabelSmallLineHeight,
    letterSpacing: TextStyleLabelSmallLetterSpacing
  },
  labelLargeBold: {
    fontFamily: fontFamilyForWeight(TextStyleLabelLargeBoldFontWeight),
    fontSize: TextStyleLabelLargeBoldFontSize,
    fontWeight: String(TextStyleLabelLargeBoldFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleLabelLargeBoldLineHeight,
    letterSpacing: TextStyleLabelLargeBoldLetterSpacing
  },
  labelMediumBold: {
    fontFamily: fontFamilyForWeight(TextStyleLabelMediumBoldFontWeight),
    fontSize: TextStyleLabelMediumBoldFontSize,
    fontWeight: String(TextStyleLabelMediumBoldFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleLabelMediumBoldLineHeight,
    letterSpacing: TextStyleLabelMediumBoldLetterSpacing
  },
  labelSmallBold: {
    fontFamily: fontFamilyForWeight(TextStyleLabelSmallBoldFontWeight),
    fontSize: TextStyleLabelSmallBoldFontSize,
    fontWeight: String(TextStyleLabelSmallBoldFontWeight) as RNTextStyle['fontWeight'],
    lineHeight: TextStyleLabelSmallBoldLineHeight,
    letterSpacing: TextStyleLabelSmallBoldLetterSpacing
  },
});

export function Text({ variant = 'bodyMedium', style, ...props }: TextProps) {
  return <RNText style={[styles[variant], style]} {...props} />;
}
