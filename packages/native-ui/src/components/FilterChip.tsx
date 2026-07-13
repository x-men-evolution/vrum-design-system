import { useState } from 'react';
import { Pressable, StyleSheet, Text as RNText } from 'react-native';
import type { GestureResponderEvent, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
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
  RadiusFull,
  TextStyleLabelMediumFontSize,
  TextStyleLabelMediumFontWeight,
  TextStyleLabelMediumLetterSpacing,
  TextStyleLabelMediumLineHeight
} from '@x-men-evolution/design-tokens/native';

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
  const [focused, setFocused] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled, selected }}
      disabled={disabled}
      onFocus={(event) => {
        setFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setFocused(false);
        onBlur?.(event);
      }}
      style={({ pressed }) => [
        styles.base,
        disabled
          ? styles.disabled
          : selected
            ? { backgroundColor: pressed ? ColorActionHover : ColorActionDefault }
            : [
                styles.outlineBorder,
                {
                  borderColor: focused ? ColorBorderFocus : ColorBorderBrand,
                  borderWidth: focused ? 2 : 1,
                  backgroundColor: pressed ? ColorActionGhostHover : 'transparent'
                }
              ],
        style
      ]}
      {...props}
    >
      <RNText
        style={[
          styles.text,
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
  text: TextStyle;
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
  },
  text: {
    fontSize: TextStyleLabelMediumFontSize,
    fontWeight: String(TextStyleLabelMediumFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleLabelMediumLineHeight,
    letterSpacing: TextStyleLabelMediumLetterSpacing
  }
});
