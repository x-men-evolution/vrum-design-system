import { StyleSheet, Text as RNText, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  ColorChipDanger,
  ColorChipDefault,
  ColorChipPrimary,
  ColorChipSuccess,
  ColorChipWarning,
  ColorTextInverse,
  RadiusSm,
  TextStyleLabelLargeFontSize,
  TextStyleLabelLargeFontWeight,
  TextStyleLabelLargeLetterSpacing,
  TextStyleLabelLargeLineHeight,
  TextStyleLabelMediumFontSize,
  TextStyleLabelMediumFontWeight,
  TextStyleLabelMediumLetterSpacing,
  TextStyleLabelMediumLineHeight
} from '@x-men-evolution/design-tokens/native';

export const TAG_COLORS = ['default', 'primary', 'success', 'warning', 'danger'] as const;
export const TAG_SIZES = ['sm', 'md', 'lg'] as const;

export type TagColor = (typeof TAG_COLORS)[number];
export type TagSize = (typeof TAG_SIZES)[number];

export type TagProps = {
  children: string;
  color?: TagColor;
  size?: TagSize;
  style?: StyleProp<ViewStyle>;
};

const colorBackgrounds: Record<TagColor, string> = {
  default: ColorChipDefault,
  primary: ColorChipPrimary,
  success: ColorChipSuccess,
  warning: ColorChipWarning,
  danger: ColorChipDanger
};

const sizeStyles: Record<TagSize, ViewStyle> = {
  sm: { paddingHorizontal: 8, paddingVertical: 1 },
  md: { paddingHorizontal: 10, paddingVertical: 2 },
  lg: { paddingHorizontal: 12, paddingVertical: 1 }
};

const textSizeStyles: Record<TagSize, TextStyle> = {
  sm: {
    fontSize: TextStyleLabelMediumFontSize,
    fontWeight: String(TextStyleLabelMediumFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleLabelMediumLineHeight,
    letterSpacing: TextStyleLabelMediumLetterSpacing
  },
  md: {
    fontSize: TextStyleLabelMediumFontSize,
    fontWeight: String(TextStyleLabelMediumFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleLabelMediumLineHeight,
    letterSpacing: TextStyleLabelMediumLetterSpacing
  },
  lg: {
    fontSize: TextStyleLabelLargeFontSize,
    fontWeight: String(TextStyleLabelLargeFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleLabelLargeLineHeight,
    letterSpacing: TextStyleLabelLargeLetterSpacing
  }
};

export function Tag({ children, color = 'default', size = 'sm', style }: TagProps) {
  return (
    <View
      style={[
        styles.base,
        sizeStyles[size],
        { backgroundColor: colorBackgrounds[color] },
        style
      ]}
    >
      <RNText style={[textSizeStyles[size], styles.text]} numberOfLines={1}>
        {children}
      </RNText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: RadiusSm
  },
  text: {
    color: ColorTextInverse
  }
});
