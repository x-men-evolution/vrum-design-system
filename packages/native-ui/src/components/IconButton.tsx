import { Pressable, StyleSheet, View } from 'react-native';
import type { GestureResponderEvent, PressableProps, StyleProp, ViewStyle } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import {
  ColorActionGhostPressed,
  ColorBorderDefault,
  ColorBranco,
  ColorBrandDefault,
  ColorSlate700,
  RadiusMd
} from '@x-men-evolution/design-tokens/native';

export const ICON_BUTTON_SIZES = ['sm', 'md', 'lg'] as const;
export type IconButtonSize = (typeof ICON_BUTTON_SIZES)[number];

export const ICON_BUTTON_VARIANTS = ['outline', 'ghost'] as const;
export type IconButtonVariant = (typeof ICON_BUTTON_VARIANTS)[number];

export type IconButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  icon: LucideIcon;
  badge?: boolean;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  iconSize?: number;
  color?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

const sizeStyles = StyleSheet.create({
  sm: { width: 36, height: 36 },
  md: { width: 44, height: 44 },
  lg: { width: 52, height: 52 }
});

export function IconButton({
  icon: Icon,
  badge = false,
  variant = 'outline',
  size = 'md',
  iconSize = 16,
  color = ColorSlate700,
  disabled = false,
  style,
  ...props
}: IconButtonProps) {
  const isOutlined = variant === 'outline';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        isOutlined && styles.outlineBorder,
        {
          backgroundColor: !isOutlined && pressed ? ColorActionGhostPressed : 'transparent',
          opacity: disabled ? 0.4 : 1
        },
        style
      ]}
      {...props}
    >
      <Icon size={iconSize} color={color} />
      {badge && <View style={styles.badge} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RadiusMd
  },
  outlineBorder: {
    borderWidth: 1,
    borderColor: ColorBorderDefault
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ColorBrandDefault,
    borderWidth: 2,
    borderColor: ColorBranco
  }
});
