import { Pressable, StyleSheet, Text as RNText } from 'react-native';
import type { GestureResponderEvent, NativeSyntheticEvent, PressableProps, StyleProp, TargetedEvent, ViewStyle } from 'react-native';
import { RadiusFull } from '@x-men-evolution/design-tokens/native';
import { textVariants } from '../internal/typography';
import { useFocusState } from '../internal/useFocusState';
import { useTheme } from '../theme/ThemeProvider';

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
  const theme = useTheme();
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
          ? { backgroundColor: theme.action.disabled }
          : selected
            ? { backgroundColor: pressed ? theme.action.hover : theme.action.default }
            : [
                styles.outlineBorder,
                {
                  borderColor: isFocused ? theme.border.focus : theme.border.brand,
                  borderWidth: isFocused ? 2 : 1,
                  backgroundColor: pressed ? theme.action.ghost.hover : 'transparent'
                }
              ],
        style
      ]}
      {...props}
    >
      <RNText
        style={[
          textVariants.labelMedium,
          {
            color: disabled
              ? theme.text.secondary
              : selected
                ? theme.action.text
                : theme.text.brand
          }
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
  }
});
