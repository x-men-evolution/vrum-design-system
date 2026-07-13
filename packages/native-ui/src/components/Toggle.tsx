import { Pressable, StyleSheet, Text as RNText } from 'react-native';
import type { GestureResponderEvent, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  ColorActionDisabled,
  ColorActionGhostHover,
  ColorBorderDefault,
  ColorTextBrand,
  ColorTextDisabled,
  ColorTextSecondary,
  RadiusMd,
  SpacingSm,
  TextStyleLabelLargeFontSize,
  TextStyleLabelLargeFontWeight,
  TextStyleLabelLargeLetterSpacing,
  TextStyleLabelLargeLineHeight
} from '@x-men-evolution/design-tokens/native';

export const TOGGLE_SIZES = ['sm', 'md', 'lg'] as const;
export type ToggleSize = (typeof TOGGLE_SIZES)[number];

export type ToggleProps = Omit<PressableProps, 'style' | 'children'> & {
  children: string;
  selected?: boolean;
  disabled?: boolean;
  size?: ToggleSize;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

const fieldHeights: Record<ToggleSize, number> = { sm: 36, md: 44, lg: 52 };
const fieldPaddings: Record<ToggleSize, number> = { sm: 10, md: 12, lg: 16 };

export function Toggle({
  children,
  selected = false,
  disabled = false,
  size = 'md',
  style,
  ...props
}: ToggleProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled, selected }}
      disabled={disabled}
      style={[
        styles.base,
        { height: fieldHeights[size], paddingHorizontal: fieldPaddings[size] },
        disabled
          ? styles.disabled
          : selected
            ? styles.selected
            : styles.outlineBorder,
        style
      ]}
      {...props}
    >
      <RNText
        style={[
          styles.text,
          { color: disabled ? ColorTextDisabled : selected ? ColorTextBrand : ColorTextSecondary }
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
  selected: ViewStyle;
  disabled: ViewStyle;
  text: TextStyle;
}>({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingVertical: SpacingSm,
    borderRadius: RadiusMd
  },
  outlineBorder: {
    borderWidth: 1,
    borderColor: ColorBorderDefault
  },
  selected: {
    backgroundColor: ColorActionGhostHover
  },
  disabled: {
    backgroundColor: ColorActionDisabled
  },
  text: {
    fontSize: TextStyleLabelLargeFontSize,
    fontWeight: String(TextStyleLabelLargeFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleLabelLargeLineHeight,
    letterSpacing: TextStyleLabelLargeLetterSpacing
  }
});
