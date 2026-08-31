import { Pressable, StyleSheet, Text as RNText } from 'react-native';
import type { GestureResponderEvent, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { RadiusMd, SpacingSm } from '@x-men-evolution/design-tokens/native';
import { FIELD_SIZES, fieldHeights, fieldPaddings } from '../internal/fieldMetrics';
import type { FieldSize } from '../internal/fieldMetrics';
import { textVariants } from '../internal/typography';
import { useTheme } from '../theme/ThemeProvider';

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
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled, selected }}
      disabled={disabled}
      style={[
        styles.base,
        { height: fieldHeights[size], paddingHorizontal: fieldPaddings[size] },
        disabled
          ? { backgroundColor: theme.action.disabled }
          : selected
            ? { backgroundColor: theme.action.ghost.hover }
            : { borderColor: theme.border.default },
        style
      ]}
      {...props}
    >
      <RNText
        style={[
          textVariants.labelLarge,
          {
            color: disabled
              ? theme.text.disabled
              : selected
                ? theme.text.brand
                : theme.text.secondary
          }
        ]}
      >
        {children}
      </RNText>
    </Pressable>
  );
}

const styles = StyleSheet.create<{ base: ViewStyle }>({
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
  }
});
