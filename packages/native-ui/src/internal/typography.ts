import { StyleSheet } from 'react-native';
import type { TextStyle } from 'react-native';
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
  TextStyleLabelSmallBoldLetterSpacing
} from '@x-men-evolution/design-tokens/native';

export const TEXT_VARIANTS = [
  'displayLarge',
  'displayMedium',
  'displaySmall',
  'headlineLarge',
  'headlineMedium',
  'headlineSmall',
  'titleLarge',
  'titleMedium',
  'titleSmall',
  'titlePage',
  'titleSection',
  'titleDescription',
  'bodyLarge',
  'bodyMedium',
  'bodySmall',
  'bodyLargeBold',
  'bodyMediumBold',
  'bodySmallBold',
  'labelLarge',
  'labelMedium',
  'labelSmall',
  'labelLargeBold',
  'labelMediumBold',
  'labelSmallBold'
] as const;

export type TextVariant = (typeof TEXT_VARIANTS)[number];

// Mapeia o peso numérico de cada variante (font.weight.* em typography.json)
// para o arquivo de fonte Inter correspondente. React Native NÃO sintetiza
// bold/semibold em fontes customizadas: setar apenas fontWeight não muda o
// traço — cada peso precisa apontar para o arquivo carregado com esse peso.
// Os nomes seguem a convenção do @expo-google-fonts/inter, então o app
// consumidor deve carregar o Inter por lá (ou registrar esses mesmos nomes de
// família). Quem precisar de outra fonte pode sobrescrever via
// style={{ fontFamily }}, já que o style é mesclado por último.
const FONT_WEIGHT_TO_FAMILY: Record<string, string> = {
  '400': 'Inter_400Regular',
  '500': 'Inter_500Medium',
  '600': 'Inter_600SemiBold',
  '700': 'Inter_700Bold'
};

export function fontFamilyForWeight(weight: number): string {
  return FONT_WEIGHT_TO_FAMILY[String(weight)] ?? 'Inter_400Regular';
}

// fontWeight é convertido para string porque os tokens de peso são numéricos,
// mas TextStyle['fontWeight'] espera string ('400' | '500' | ...).
function variant(fontSize: number, fontWeight: number, lineHeight: number, letterSpacing: number): TextStyle {
  return {
    fontFamily: fontFamilyForWeight(fontWeight),
    fontSize,
    fontWeight: String(fontWeight) as TextStyle['fontWeight'],
    lineHeight,
    letterSpacing
  };
}

// Cada variante espelha um estilo de texto do Figma (ver text-styles.json em
// packages/design-tokens/tokens). Fonte única de tipografia para <Text> e para
// os textos internos dos demais componentes.
export const textVariants = StyleSheet.create<Record<TextVariant, TextStyle>>({
  displayLarge: variant(TextStyleDisplayLargeFontSize, TextStyleDisplayLargeFontWeight, TextStyleDisplayLargeLineHeight, TextStyleDisplayLargeLetterSpacing),
  displayMedium: variant(TextStyleDisplayMediumFontSize, TextStyleDisplayMediumFontWeight, TextStyleDisplayMediumLineHeight, TextStyleDisplayMediumLetterSpacing),
  displaySmall: variant(TextStyleDisplaySmallFontSize, TextStyleDisplaySmallFontWeight, TextStyleDisplaySmallLineHeight, TextStyleDisplaySmallLetterSpacing),
  headlineLarge: variant(TextStyleHeadlineLargeFontSize, TextStyleHeadlineLargeFontWeight, TextStyleHeadlineLargeLineHeight, TextStyleHeadlineLargeLetterSpacing),
  headlineMedium: variant(TextStyleHeadlineMediumFontSize, TextStyleHeadlineMediumFontWeight, TextStyleHeadlineMediumLineHeight, TextStyleHeadlineMediumLetterSpacing),
  headlineSmall: variant(TextStyleHeadlineSmallFontSize, TextStyleHeadlineSmallFontWeight, TextStyleHeadlineSmallLineHeight, TextStyleHeadlineSmallLetterSpacing),
  titleLarge: variant(TextStyleTitleLargeFontSize, TextStyleTitleLargeFontWeight, TextStyleTitleLargeLineHeight, TextStyleTitleLargeLetterSpacing),
  titleMedium: variant(TextStyleTitleMediumFontSize, TextStyleTitleMediumFontWeight, TextStyleTitleMediumLineHeight, TextStyleTitleMediumLetterSpacing),
  titleSmall: variant(TextStyleTitleSmallFontSize, TextStyleTitleSmallFontWeight, TextStyleTitleSmallLineHeight, TextStyleTitleSmallLetterSpacing),
  titlePage: variant(TextStyleTitlePageFontSize, TextStyleTitlePageFontWeight, TextStyleTitlePageLineHeight, TextStyleTitlePageLetterSpacing),
  titleSection: variant(TextStyleTitleSectionFontSize, TextStyleTitleSectionFontWeight, TextStyleTitleSectionLineHeight, TextStyleTitleSectionLetterSpacing),
  titleDescription: variant(TextStyleTitleDescriptionFontSize, TextStyleTitleDescriptionFontWeight, TextStyleTitleDescriptionLineHeight, TextStyleTitleDescriptionLetterSpacing),
  bodyLarge: variant(TextStyleBodyLargeFontSize, TextStyleBodyLargeFontWeight, TextStyleBodyLargeLineHeight, TextStyleBodyLargeLetterSpacing),
  bodyMedium: variant(TextStyleBodyMediumFontSize, TextStyleBodyMediumFontWeight, TextStyleBodyMediumLineHeight, TextStyleBodyMediumLetterSpacing),
  bodySmall: variant(TextStyleBodySmallFontSize, TextStyleBodySmallFontWeight, TextStyleBodySmallLineHeight, TextStyleBodySmallLetterSpacing),
  bodyLargeBold: variant(TextStyleBodyLargeBoldFontSize, TextStyleBodyLargeBoldFontWeight, TextStyleBodyLargeBoldLineHeight, TextStyleBodyLargeBoldLetterSpacing),
  bodyMediumBold: variant(TextStyleBodyMediumBoldFontSize, TextStyleBodyMediumBoldFontWeight, TextStyleBodyMediumBoldLineHeight, TextStyleBodyMediumBoldLetterSpacing),
  bodySmallBold: variant(TextStyleBodySmallBoldFontSize, TextStyleBodySmallBoldFontWeight, TextStyleBodySmallBoldLineHeight, TextStyleBodySmallBoldLetterSpacing),
  labelLarge: variant(TextStyleLabelLargeFontSize, TextStyleLabelLargeFontWeight, TextStyleLabelLargeLineHeight, TextStyleLabelLargeLetterSpacing),
  labelMedium: variant(TextStyleLabelMediumFontSize, TextStyleLabelMediumFontWeight, TextStyleLabelMediumLineHeight, TextStyleLabelMediumLetterSpacing),
  labelSmall: variant(TextStyleLabelSmallFontSize, TextStyleLabelSmallFontWeight, TextStyleLabelSmallLineHeight, TextStyleLabelSmallLetterSpacing),
  labelLargeBold: variant(TextStyleLabelLargeBoldFontSize, TextStyleLabelLargeBoldFontWeight, TextStyleLabelLargeBoldLineHeight, TextStyleLabelLargeBoldLetterSpacing),
  labelMediumBold: variant(TextStyleLabelMediumBoldFontSize, TextStyleLabelMediumBoldFontWeight, TextStyleLabelMediumBoldLineHeight, TextStyleLabelMediumBoldLetterSpacing),
  labelSmallBold: variant(TextStyleLabelSmallBoldFontSize, TextStyleLabelSmallBoldFontWeight, TextStyleLabelSmallBoldLineHeight, TextStyleLabelSmallBoldLetterSpacing)
});
