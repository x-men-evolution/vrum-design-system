import { forwardRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import type { NativeSyntheticEvent, StyleProp, TextInputFocusEventData, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import {
  ColorBorderDefault,
  ColorBorderError,
  ColorBorderFocus,
  ColorSecondary500,
  ColorTextDefault
} from '@x-men-evolution/design-tokens/native';
import { Field } from '../internal/Field';
import { fieldPaddings, fieldTextTypography } from '../internal/fieldMetrics';
import type { FieldSize } from '../internal/fieldMetrics';
import { useFocusState } from '../internal/useFocusState';

export const TEXTAREA_SIZES = ['sm', 'md', 'lg'] as const;
export type TextareaSize = FieldSize;

// Alturas próprias (não as de fieldHeights, pensadas para campo de uma linha):
// um textarea precisa de espaço vertical para várias linhas de texto.
const TEXTAREA_HEIGHTS: Record<TextareaSize, number> = { sm: 80, md: 112, lg: 144 };

export type TextareaProps = Omit<TextInputProps, 'style'> & {
  size?: TextareaSize;
  label?: string;
  error?: string;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
};

export const Textarea = forwardRef<TextInput, TextareaProps>(function Textarea(
  {
    size = 'md',
    label,
    error,
    disabled = false,
    containerStyle,
    style,
    numberOfLines = 4,
    onFocus,
    onBlur,
    ...props
  },
  ref
) {
  const { isFocused, handleFocus, handleBlur } =
    useFocusState<NativeSyntheticEvent<TextInputFocusEventData>>(onFocus, onBlur);

  const borderColor = error ? ColorBorderError : isFocused ? ColorBorderFocus : ColorBorderDefault;

  return (
    <Field
      size={size}
      label={label}
      error={error}
      disabled={disabled}
      borderColor={borderColor}
      height={TEXTAREA_HEIGHTS[size]}
      fieldStyle={[styles.field, { paddingVertical: fieldPaddings[size] }]}
      containerStyle={containerStyle}
    >
      <TextInput
        ref={ref}
        editable={!disabled}
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        placeholderTextColor={ColorSecondary500}
        style={[styles.text, fieldTextTypography[size], { color: ColorTextDefault }, style]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </Field>
  );
});

const styles = StyleSheet.create({
  field: {
    alignItems: 'flex-start'
  },
  text: {
    flex: 1,
    padding: 0
  }
});
