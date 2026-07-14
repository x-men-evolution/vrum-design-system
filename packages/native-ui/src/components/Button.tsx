import { ActivityIndicator, Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import type { GestureResponderEvent, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  ColorActionDefault,
  ColorActionDestructiveDefault,
  ColorActionDestructivePressed,
  ColorActionDisabled,
  ColorActionGhostPressed,
  ColorActionPressed,
  ColorBgSurface,
  ColorBorderBrand,
  ColorSecondary300,
  ColorSecondary800,
  ColorTextBrand,
  ColorTextDisabled,
  ColorTextInverse,
  RadiusMd,
  SpacingMd,
  SpacingSm,
  SpacingXl
} from '@x-men-evolution/design-tokens/native';
import { textVariants } from '../internal/typography';

export const BUTTON_VARIANTS = ['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const;
export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

type VariantColors = {
  background: string;
  backgroundPressed: string;
  text: string;
  border?: string;
};

const variantColors: Record<ButtonVariant, VariantColors> = {
  primary: {
    background: ColorActionDefault,
    backgroundPressed: ColorActionPressed,
    text: ColorTextInverse
  },
  secondary: {
    background: ColorBgSurface,
    backgroundPressed: ColorSecondary300,
    text: ColorSecondary800
  },
  outline: {
    background: 'transparent',
    backgroundPressed: ColorActionGhostPressed,
    text: ColorTextBrand,
    border: ColorBorderBrand
  },
  ghost: {
    background: 'transparent',
    backgroundPressed: ColorActionGhostPressed,
    text: ColorTextBrand
  },
  destructive: {
    background: ColorActionDestructiveDefault,
    backgroundPressed: ColorActionDestructivePressed,
    text: ColorTextInverse
  }
};

const sizeStyles = StyleSheet.create({
  lg: { height: 56, paddingHorizontal: SpacingXl },
  md: { height: 44, paddingHorizontal: 20 },
  sm: { height: 32, paddingHorizontal: SpacingMd }
});

const textSizeStyles: Record<ButtonSize, TextStyle> = {
  lg: textVariants.titleMedium,
  md: textVariants.labelLarge,
  sm: textVariants.labelMedium
};

export function Button({
  children,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  style,
  ...props
}: ButtonProps) {
  const colors = variantColors[variant];
  const isOutlined = variant === 'outline';
  const isDisabled = disabled || loading;

  const textColor = isDisabled ? (isOutlined || variant === 'ghost' ? colors.text : ColorTextDisabled) : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        isOutlined && styles.outlineBorder,
        {
          backgroundColor: isDisabled
            ? isOutlined || variant === 'ghost'
              ? 'transparent'
              : ColorActionDisabled
            : pressed
              ? colors.backgroundPressed
              : colors.background,
          borderColor: colors.border
        },
        (isDisabled && (isOutlined || variant === 'ghost')) && styles.disabledOpacity,
        style
      ]}
      {...props}
    >
      <View style={styles.content}>
        {loading ? <ActivityIndicator size="small" color={textColor} /> : null}
        <RNText style={[textSizeStyles[size], { color: textColor }]}>{children}</RNText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RadiusMd
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SpacingSm
  },
  outlineBorder: {
    borderWidth: 1.5
  },
  disabledOpacity: {
    opacity: 0.4
  }
});
