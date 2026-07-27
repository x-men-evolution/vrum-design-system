import { StyleSheet, Text as RNText, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  ColorBranco,
  ColorChipDanger,
  ColorChipDefault,
  ColorChipNeutral,
  ColorChipPrimary,
  ColorChipSuccess,
  ColorChipWarning,
  ColorTextInverse,
  RadiusSm
} from '@x-men-evolution/design-tokens/native';
import { textVariants } from '../internal/typography';

export const TAG_COLORS = ['default', 'primary', 'success', 'warning', 'danger', 'neutral'] as const;
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
  danger: ColorChipDanger,
  neutral: ColorChipNeutral
};

const colorText: Record<TagColor, string> = {
  default: ColorTextInverse,
  primary: ColorTextInverse,
  success: ColorTextInverse,
  warning: ColorTextInverse,
  danger: ColorTextInverse,
  neutral: ColorBranco
};

const sizeStyles: Record<TagSize, ViewStyle> = {
  sm: { paddingHorizontal: 8, paddingVertical: 1 },
  md: { paddingHorizontal: 10, paddingVertical: 2 },
  lg: { paddingHorizontal: 12, paddingVertical: 1 }
};

const textSizeStyles: Record<TagSize, TextStyle> = {
  sm: textVariants.labelMedium,
  md: textVariants.labelMedium,
  lg: textVariants.labelLarge
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
      <RNText
        style={[textSizeStyles[size], { color: colorText[color] }]}
        numberOfLines={1}
      >
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
  }
});
