import { Pressable, StyleSheet, View } from 'react-native';
import type { GestureResponderEvent, PressableProps, StyleProp, ViewStyle } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { ColorBorderDefault, ColorBranco, ColorBrandDefault, ColorSlate700, RadiusMd } from '@x-men-evolution/design-tokens/native';

export type IconButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  icon: LucideIcon;
  badge?: boolean;
  size?: number;
  iconSize?: number;
  color?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

export function IconButton({
  icon: Icon,
  badge = false,
  size = 40,
  iconSize = 24,
  color = ColorSlate700,
  disabled = false,
  style,
  ...props
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      style={[styles.base, { width: size, height: size, opacity: disabled ? 0.4 : 1 }, style]}
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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: ColorBorderDefault,
    borderRadius: RadiusMd
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
