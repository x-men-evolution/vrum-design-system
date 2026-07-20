import { Pressable, StyleSheet, Text as RNText } from 'react-native';
import type { GestureResponderEvent, PressableProps, StyleProp, ViewStyle } from 'react-native';
import {
  ColorActionDisabled,
  ColorActionGhostHover,
  ColorBorderDefault,
  ColorTextBrand,
  ColorTextDisabled,
  ColorTextSecondary,
  RadiusMd,
  SpacingSm
} from '@x-men-evolution/design-tokens/native';
import { FIELD_SIZES, fieldHeights, fieldPaddings } from '../internal/fieldMetrics';
import type { FieldSize } from '../internal/fieldMetrics';
import { textVariants } from '../internal/typography';

export const TOGGLE_SIZES = FIELD_SIZES;
export type ToggleSize = FieldSize;

export type ToggleProps = Omit<PressableProps, 'style' | 'children'> & {
  children: string;
  selected?: boolean;
  disabled?: boolean;
  size?: ToggleSize;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

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
          textVariants.labelLarge,
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
}>({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingVertical: SpacingSm,
    borderRadius: RadiusMd,
    // Borda sempre reservada (transparente por padrão) para o selected/disabled
    // não mudarem de tamanho em relação ao outline — evita o layout "pulando"
    // ao trocar de estado.
    borderWidth: 1,
    borderColor: 'transparent'
  },
  outlineBorder: {
    borderColor: ColorBorderDefault
  },
  selected: {
    backgroundColor: ColorActionGhostHover
  },
  disabled: {
    backgroundColor: ColorActionDisabled
  }
});
