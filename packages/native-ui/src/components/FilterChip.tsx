import { Pressable, StyleSheet, Text as RNText } from 'react-native';
import type { GestureResponderEvent, NativeSyntheticEvent, PressableProps, StyleProp, TargetedEvent, ViewStyle } from 'react-native';
import {
  ColorActionDefault,
  ColorActionDisabled,
  ColorActionGhostHover,
  ColorActionHover,
  ColorActionText,
  ColorBorderBrand,
  ColorBorderFocus,
  ColorTextBrand,
  ColorTextSecondary,
  RadiusFull
} from '@x-men-evolution/design-tokens/native';
import { textVariants } from '../internal/typography';
import { useFocusState } from '../internal/useFocusState';

export type FilterChipProps = Omit<PressableProps, 'style' | 'children'> & {
  children: string;
  selected?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

export function FilterChip({
  children,
  selected = false,
  disabled = false,
  style,
  onFocus,
  onBlur,
  ...props
}: FilterChipProps) {
  const { isFocused, handleFocus, handleBlur } =
    useFocusState<NativeSyntheticEvent<TargetedEvent>>(onFocus ?? undefined, onBlur ?? undefined);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled, selected }}
      disabled={disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={({ pressed }) => [
        styles.base,
        disabled
          ? styles.disabled
          : selected
            ? { backgroundColor: pressed ? ColorActionHover : ColorActionDefault }
            : [
                styles.outlineBorder,
                {
                  borderColor: isFocused ? ColorBorderFocus : ColorBorderBrand,
                  borderWidth: isFocused ? 2 : 1,
                  backgroundColor: pressed ? ColorActionGhostHover : 'transparent'
                }
              ],
        style
      ]}
      {...props}
    >
      <RNText
        style={[
          textVariants.labelMedium,
          { color: disabled ? ColorTextSecondary : selected ? ColorActionText : ColorTextBrand }
        ]}
      >
        {children}
      </RNText>
    </Pressable>
  );
}

const styles = StyleSheet.create<{
  base: ViewStyle;
  outlineBorder: ViewStyle;
  disabled: ViewStyle;
}>({
  base: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RadiusFull
  },
  outlineBorder: {
    borderWidth: 1
  },
  disabled: {
    backgroundColor: ColorActionDisabled
  }
});
