import { useRef } from 'react';
import { ActionSheetIOS, Platform, Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ChevronDown } from 'lucide-react-native';
import {
  ColorBorderDefault,
  ColorBorderError,
  ColorBranco,
  ColorSecondary500,
  ColorSlate400,
  ColorTextDanger,
  ColorTextDefault,
  RadiusMd,
  SpacingSm,
  SpacingXs
} from '@x-men-evolution/design-tokens/native';
import { fieldTypography } from '../internal/fieldTypography';

export const SELECT_SIZES = ['sm', 'md', 'lg'] as const;
export type SelectSize = (typeof SELECT_SIZES)[number];

export type SelectOption = {
  value: string | number;
  label: string;
};

export type SelectProps = {
  options: SelectOption[];
  value?: string | number | null;
  onChange: (option: SelectOption) => void;
  size?: SelectSize;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const PLACEHOLDER_VALUE = '__placeholder__';

const fieldHeights: Record<SelectSize, number> = { sm: 36, md: 44, lg: 52 };
const labelGaps: Record<SelectSize, number> = { sm: SpacingXs, md: 6, lg: SpacingSm };
const textTypography: Record<SelectSize, TextStyle> = {
  sm: fieldTypography.bodySmall,
  md: fieldTypography.bodyMedium,
  lg: fieldTypography.bodyLarge
};
const labelTypography: Record<SelectSize, TextStyle> = {
  sm: fieldTypography.labelSmall,
  md: fieldTypography.bodySmall,
  lg: fieldTypography.bodySmall
};

export function Select({
  options,
  value = null,
  onChange,
  size = 'md',
  label,
  placeholder = 'Selecione',
  error,
  disabled = false,
  style
}: SelectProps) {
  const isShowingRef = useRef(false);
  const selected = options.find((option) => option.value === value) ?? null;

  const openIOSActionSheet = () => {
    if (disabled || isShowingRef.current) return;

    const optionLabels = options.map((option) => option.label);
    const cancelButtonIndex = optionLabels.length;

    isShowingRef.current = true;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: label,
        message: placeholder,
        options: [...optionLabels, 'Cancelar'],
        cancelButtonIndex
      },
      (buttonIndex) => {
        isShowingRef.current = false;
        if (buttonIndex === cancelButtonIndex) return;
        const option = options[buttonIndex];
        if (option) onChange(option);
      }
    );
  };

  const handleAndroidChange = (itemValue: string | number) => {
    if (itemValue === PLACEHOLDER_VALUE) return;
    const option = options.find((item) => item.value === itemValue);
    if (option) onChange(option);
  };

  const borderColor = error ? ColorBorderError : ColorBorderDefault;
  const textColor = selected ? ColorTextDefault : ColorSecondary500;

  return (
    <View style={style}>
      <View style={disabled && styles.disabled}>
        {label ? (
          <RNText style={[styles.label, labelTypography[size], { marginBottom: labelGaps[size] }]}>{label}</RNText>
        ) : null}

        <View style={[styles.field, { height: fieldHeights[size], borderColor }]}>
          {Platform.OS === 'ios' ? (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled }}
              disabled={disabled}
              onPress={openIOSActionSheet}
              style={styles.row}
            >
              <RNText style={[textTypography[size], { color: textColor, flex: 1 }]} numberOfLines={1}>
                {selected?.label ?? placeholder}
              </RNText>
              <ChevronDown size={16} color={ColorSlate400} />
            </Pressable>
          ) : (
            <View style={styles.row}>
              <Picker
                enabled={!disabled}
                selectedValue={selected?.value ?? PLACEHOLDER_VALUE}
                onValueChange={handleAndroidChange}
                style={styles.androidPicker}
                dropdownIconColor={ColorSlate400}
              >
                <Picker.Item label={placeholder} value={PLACEHOLDER_VALUE} color={ColorSecondary500} />
                {options.map((option) => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
          )}
        </View>
      </View>

      {error ? <RNText style={[styles.errorText, fieldTypography.bodySmall]}>{error}</RNText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.6
  },
  label: {
    color: ColorSlate400
  },
  field: {
    width: '100%',
    backgroundColor: ColorBranco,
    borderWidth: 1,
    borderRadius: RadiusMd,
    paddingHorizontal: SpacingSm + SpacingXs
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  androidPicker: {
    flex: 1,
    color: ColorTextDefault
  },
  errorText: {
    color: ColorTextDanger,
    marginTop: SpacingXs
  }
});
