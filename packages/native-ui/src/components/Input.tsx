import { forwardRef } from 'react';
import type { ReactNode } from 'react';
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
import { FIELD_SIZES, fieldTextTypography } from '../internal/fieldMetrics';
import type { FieldSize } from '../internal/fieldMetrics';
import { useFocusState } from '../internal/useFocusState';

export const INPUT_SIZES = FIELD_SIZES;
export type InputSize = FieldSize;

export type InputProps = Omit<TextInputProps, 'style'> & {
  size?: InputSize;
  label?: string;
  error?: string;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
};

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    size = 'md',
    label,
    error,
    disabled = false,
    leftIcon,
    rightIcon,
    containerStyle,
    style,
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
      containerStyle={containerStyle}
    >
      {leftIcon}
      <TextInput
        ref={ref}
        editable={!disabled}
        placeholderTextColor={ColorSecondary500}
        style={[styles.text, fieldTextTypography[size], { color: ColorTextDefault }, style]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {rightIcon}
    </Field>
  );
});

const styles = StyleSheet.create({
  text: {
    flex: 1,
    padding: 0
  }
});
