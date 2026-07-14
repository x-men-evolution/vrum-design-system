import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import type { NativeSyntheticEvent, StyleProp, TextInputFocusEventData, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { Search } from 'lucide-react-native';
import {
  ColorBorderFocus,
  ColorSecondary500,
  ColorSlate400,
  ColorTextDefault
} from '@x-men-evolution/design-tokens/native';
import { Field } from '../internal/Field';
import { FIELD_SIZES, fieldTextTypography } from '../internal/fieldMetrics';
import type { FieldSize } from '../internal/fieldMetrics';
import { useFocusState } from '../internal/useFocusState';

export const SEARCH_INPUT_SIZES = FIELD_SIZES;
export type SearchInputSize = FieldSize;

export type SearchInputProps = Omit<TextInputProps, 'style'> & {
  size?: SearchInputSize;
  label?: string;
  rightIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
};

// Alturas próprias, intencionalmente maiores que fieldHeights (design do
// campo de busca no Figma).
const searchHeights: Record<SearchInputSize, number> = { sm: 36, md: 48, lg: 60 };

export const SearchInput = forwardRef<TextInput, SearchInputProps>(function SearchInput(
  { size = 'lg', label, rightIcon, containerStyle, style, placeholder = 'Pesquisar...', onFocus, onBlur, ...props },
  ref
) {
  const { isFocused, handleFocus, handleBlur } =
    useFocusState<NativeSyntheticEvent<TextInputFocusEventData>>(onFocus, onBlur);

  return (
    <Field
      size={size}
      label={label}
      height={searchHeights[size]}
      borderColor={isFocused ? ColorBorderFocus : 'transparent'}
      fieldStyle={styles.shadow}
      containerStyle={containerStyle}
    >
      <Search size={16} color={ColorSlate400} />
      <TextInput
        ref={ref}
        placeholder={placeholder}
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
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2
  },
  text: {
    flex: 1,
    padding: 0
  }
});
