import { forwardRef, useState } from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, Text as RNText, TextInput, View } from 'react-native';
import type { NativeSyntheticEvent, StyleProp, TextInputFocusEventData, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import {
  ColorBorderDefault,
  ColorBorderError,
  ColorBorderFocus,
  ColorBranco,
  ColorSecondary500,
  ColorTextDanger,
  ColorTextDefault,
  ColorTextSecondary,
  RadiusMd,
  SpacingSm,
  SpacingXs
} from '@x-men-evolution/design-tokens/native';
import { fieldTypography } from '../internal/fieldTypography';

export const INPUT_SIZES = ['sm', 'md', 'lg'] as const;
export type InputSize = (typeof INPUT_SIZES)[number];

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

const fieldHeights: Record<InputSize, number> = { sm: 36, md: 44, lg: 52 };
const fieldPaddings: Record<InputSize, number> = { sm: 10, md: 12, lg: 16 };
const labelGaps: Record<InputSize, number> = { sm: SpacingXs, md: 6, lg: SpacingSm };
const textTypography: Record<InputSize, TextStyle> = {
  sm: fieldTypography.bodySmall,
  md: fieldTypography.bodyMedium,
  lg: fieldTypography.bodyMedium
};
const labelTypography: Record<InputSize, TextStyle> = {
  sm: fieldTypography.labelSmall,
  md: fieldTypography.bodySmall,
  lg: fieldTypography.bodySmall
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
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const borderColor = error ? ColorBorderError : isFocused ? ColorBorderFocus : ColorBorderDefault;

  return (
    <View style={containerStyle}>
      <View style={disabled && styles.disabled}>
        {label ? (
          <RNText style={[styles.label, labelTypography[size], { marginBottom: labelGaps[size] }]}>{label}</RNText>
        ) : null}

        <View
          style={[
            styles.field,
            { height: fieldHeights[size], paddingHorizontal: fieldPaddings[size], borderColor }
          ]}
        >
          {leftIcon}
          <TextInput
            ref={ref}
            editable={!disabled}
            placeholderTextColor={ColorSecondary500}
            style={[styles.text, textTypography[size], { color: ColorTextDefault }, style]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {rightIcon}
        </View>
      </View>

      {error ? <RNText style={[styles.errorText, fieldTypography.bodySmall]}>{error}</RNText> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.6
  },
  label: {
    color: ColorTextSecondary
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingSm,
    width: '100%',
    backgroundColor: ColorBranco,
    borderWidth: 1,
    borderRadius: RadiusMd
  },
  text: {
    flex: 1,
    padding: 0
  },
  errorText: {
    color: ColorTextDanger,
    marginTop: SpacingXs
  }
});
