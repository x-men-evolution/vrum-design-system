import type { TextStyle } from 'react-native';
import { SpacingSm, SpacingXs } from '@x-men-evolution/design-tokens/native';
import { textVariants } from './typography';

// Métricas compartilhadas pelos campos de formulário (Input, Select, Toggle).
// O SearchInput usa alturas próprias, intencionalmente maiores (ver lá).
export const FIELD_SIZES = ['sm', 'md', 'lg'] as const;
export type FieldSize = (typeof FIELD_SIZES)[number];

export const fieldHeights: Record<FieldSize, number> = { sm: 36, md: 44, lg: 52 };
export const fieldPaddings: Record<FieldSize, number> = { sm: 10, md: 12, lg: 16 };
export const labelGaps: Record<FieldSize, number> = { sm: SpacingXs, md: 6, lg: SpacingSm };

export const fieldTextTypography: Record<FieldSize, TextStyle> = {
  sm: textVariants.bodySmall,
  md: textVariants.bodyMedium,
  lg: textVariants.bodyMedium
};

export const fieldLabelTypography: Record<FieldSize, TextStyle> = {
  sm: textVariants.labelSmall,
  md: textVariants.bodySmall,
  lg: textVariants.bodySmall
};
