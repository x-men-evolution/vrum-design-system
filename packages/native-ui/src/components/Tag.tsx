import { StyleSheet, Text as RNText, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  ColorBranco,
  ColorChipDanger,
  ColorChipDefault,
  ColorChipInfo,
  ColorChipLightDangerBackground,
  ColorChipLightDangerText,
  ColorChipLightDefaultBackground,
  ColorChipLightDefaultText,
  ColorChipLightInfoBackground,
  ColorChipLightInfoText,
  ColorChipLightNeutralBackground,
  ColorChipLightNeutralText,
  ColorChipLightPrimaryBackground,
  ColorChipLightPrimaryText,
  ColorChipLightSuccessBackground,
  ColorChipLightSuccessText,
  ColorChipLightWarningBackground,
  ColorChipLightWarningText,
  ColorChipNeutral,
  ColorChipPrimary,
  ColorChipSuccess,
  ColorChipWarning,
  ColorTextInverse,
  RadiusSm
} from '@x-men-evolution/design-tokens/native';
import { textVariants } from '../internal/typography';

export const TAG_COLORS = ['default', 'primary', 'success', 'warning', 'danger', 'neutral', 'info'] as const;
export const TAG_SIZES = ['sm', 'md', 'lg'] as const;
export const TAG_VARIANTS = ['solid', 'light'] as const;

export type TagColor = (typeof TAG_COLORS)[number];
export type TagSize = (typeof TAG_SIZES)[number];
export type TagVariant = (typeof TAG_VARIANTS)[number];

export type TagProps = {
  children: string;
  color?: TagColor;
  size?: TagSize;
  variant?: TagVariant;
  style?: StyleProp<ViewStyle>;
};

const solidBackgrounds: Record<TagColor, string> = {
  default: ColorChipDefault,
  primary: ColorChipPrimary,
  success: ColorChipSuccess,
  warning: ColorChipWarning,
  danger: ColorChipDanger,
  neutral: ColorChipNeutral,
  info: ColorChipInfo
};

const solidText: Record<TagColor, string> = {
  default: ColorTextInverse,
  primary: ColorTextInverse,
  success: ColorTextInverse,
  warning: ColorTextInverse,
  danger: ColorTextInverse,
  neutral: ColorBranco,
  info: ColorTextInverse
};

const lightBackgrounds: Record<TagColor, string> = {
  default: ColorChipLightDefaultBackground,
  primary: ColorChipLightPrimaryBackground,
  success: ColorChipLightSuccessBackground,
  warning: ColorChipLightWarningBackground,
  danger: ColorChipLightDangerBackground,
  neutral: ColorChipLightNeutralBackground,
  info: ColorChipLightInfoBackground
};

const lightText: Record<TagColor, string> = {
  default: ColorChipLightDefaultText,
  primary: ColorChipLightPrimaryText,
  success: ColorChipLightSuccessText,
  warning: ColorChipLightWarningText,
  danger: ColorChipLightDangerText,
  neutral: ColorChipLightNeutralText,
  info: ColorChipLightInfoText
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

export function Tag({ children, color = 'default', size = 'sm', variant = 'solid', style }: TagProps) {
  const backgroundColor = variant === 'light' ? lightBackgrounds[color] : solidBackgrounds[color];
  const textColor = variant === 'light' ? lightText[color] : solidText[color];

  return (
    <View
      style={[
        styles.base,
        sizeStyles[size],
        { backgroundColor },
        style
      ]}
    >
      <RNText
        style={[textSizeStyles[size], { color: textColor }]}
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
