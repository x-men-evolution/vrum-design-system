import type { ReactNode } from 'react';
import { StyleSheet, Text as RNText, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  ColorBranco,
  ColorTextDanger,
  ColorTextSecondary,
  RadiusMd,
  SpacingSm,
  SpacingXs
} from '@x-men-evolution/design-tokens/native';
import { fieldHeights, fieldLabelTypography, fieldPaddings, labelGaps } from './fieldMetrics';
import type { FieldSize } from './fieldMetrics';
import { textVariants } from './typography';

export type FieldProps = {
  size: FieldSize;
  label?: string;
  error?: string;
  disabled?: boolean;
  /** Sobrescreve a altura padrão de fieldHeights (o SearchInput usa alturas próprias). */
  height?: number;
  borderColor: string;
  /** Estilos extras do contêiner do campo (ex.: sombra do SearchInput). */
  fieldStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  /** Conteúdo da linha do campo: ícones + TextInput. */
  children: ReactNode;
};

// Casca visual comum dos campos de texto: label opcional acima, contêiner em
// linha com borda/raio/fundo e mensagem de erro abaixo.
export function Field({
  size,
  label,
  error,
  disabled = false,
  height,
  borderColor,
  fieldStyle,
  containerStyle,
  children
}: FieldProps) {
  return (
    <View style={containerStyle}>
      <View style={disabled && styles.disabled}>
        {label ? (
          <RNText style={[styles.label, fieldLabelTypography[size], { marginBottom: labelGaps[size] }]}>
            {label}
          </RNText>
        ) : null}

        <View
          style={[
            styles.field,
            { height: height ?? fieldHeights[size], paddingHorizontal: fieldPaddings[size], borderColor },
            fieldStyle
          ]}
        >
          {children}
        </View>
      </View>

      {error ? <RNText style={[styles.errorText, textVariants.bodySmall]}>{error}</RNText> : null}
    </View>
  );
}

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
  errorText: {
    color: ColorTextDanger,
    marginTop: SpacingXs
  }
});
