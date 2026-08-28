import { StyleSheet, Text as RNText, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { useMemo } from 'react';
import { ColorBranco, RadiusSm } from '@x-men-evolution/design-tokens/native';
import type { VrumTheme } from '@x-men-evolution/design-tokens/themes';
import { textVariants } from '../internal/typography';
import { useTheme } from '../theme/ThemeProvider';

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

type TagPalette = { background: Record<TagColor, string>; text: Record<TagColor, string> };

function buildPalette(theme: VrumTheme, variant: TagVariant): TagPalette {
  if (variant === 'light') {
    const light = theme.chip.light;
    return {
      background: {
        default: light.default.background,
        primary: light.primary.background,
        success: light.success.background,
        warning: light.warning.background,
        danger: light.danger.background,
        neutral: light.neutral.background,
        info: light.info.background
      },
      text: {
        default: light.default.text,
        primary: light.primary.text,
        success: light.success.text,
        warning: light.warning.text,
        danger: light.danger.text,
        neutral: light.neutral.text,
        info: light.info.text
      }
    };
  }

  // No sólido só `neutral` foge do texto invertido: o cinza do chip não tem
  // contraste suficiente com o off-white de `text/inverse`.
  const inverse = theme.text.inverse;
  return {
    background: {
      default: theme.chip.default,
      primary: theme.chip.primary,
      success: theme.chip.success,
      warning: theme.chip.warning,
      danger: theme.chip.danger,
      neutral: theme.chip.neutral,
      info: theme.chip.info
    },
    text: {
      default: inverse,
      primary: inverse,
      success: inverse,
      warning: inverse,
      danger: inverse,
      neutral: ColorBranco,
      info: inverse
    }
  };
}

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
  const theme = useTheme();
  const palette = useMemo(() => buildPalette(theme, variant), [theme, variant]);
  const backgroundColor = palette.background[color];
  const textColor = palette.text[color];

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
