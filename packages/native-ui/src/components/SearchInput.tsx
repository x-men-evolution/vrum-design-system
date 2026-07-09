import { forwardRef, useState } from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, Text as RNText, TextInput, View } from 'react-native';
import type { NativeSyntheticEvent, StyleProp, TextInputFocusEventData, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { Search } from 'lucide-react-native';
import {
  ColorBorderFocus,
  ColorBranco,
  ColorSecondary500,
  ColorSlate400,
  ColorTextDefault,
  ColorTextSecondary,
  RadiusMd,
  SpacingSm,
  SpacingXs
} from '@x-men-evolution/design-tokens/native';
import { fieldTypography } from '../internal/fieldTypography';

export const SEARCH_INPUT_SIZES = ['sm', 'md', 'lg'] as const;
export type SearchInputSize = (typeof SEARCH_INPUT_SIZES)[number];

export type SearchInputProps = Omit<TextInputProps, 'style'> & {
  size?: SearchInputSize;
  label?: string;
  rightIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
};

const fieldHeights: Record<SearchInputSize, number> = { sm: 36, md: 48, lg: 60 };
const fieldPaddings: Record<SearchInputSize, number> = { sm: 10, md: 12, lg: 16 };
const labelGaps: Record<SearchInputSize, number> = { sm: SpacingXs, md: 6, lg: SpacingSm };
const textTypography: Record<SearchInputSize, TextStyle> = {
  sm: fieldTypography.bodySmall,
  md: fieldTypography.bodyMedium,
  lg: fieldTypography.bodyMedium
};
const labelTypography: Record<SearchInputSize, TextStyle> = {
  sm: fieldTypography.labelSmall,
  md: fieldTypography.bodySmall,
  lg: fieldTypography.bodySmall
};

export const SearchInput = forwardRef<TextInput, SearchInputProps>(function SearchInput(
  { size = 'lg', label, rightIcon, containerStyle, style, placeholder = 'Pesquisar...', onFocus, onBlur, ...props },
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

  return (
    <View style={containerStyle}>
      {label ? (
        <RNText style={[styles.label, labelTypography[size], { marginBottom: labelGaps[size] }]}>{label}</RNText>
      ) : null}

      <View
        style={[
          styles.field,
          {
            height: fieldHeights[size],
            paddingHorizontal: fieldPaddings[size],
            borderColor: isFocused ? ColorBorderFocus : 'transparent'
          }
        ]}
      >
        <Search size={16} color={ColorSlate400} />
        <TextInput
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor={ColorSecondary500}
          style={[styles.text, textTypography[size], { color: ColorTextDefault }, style]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightIcon}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
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
    borderRadius: RadiusMd,
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
