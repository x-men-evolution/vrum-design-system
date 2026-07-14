import { Fragment } from 'react';
import { Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import type { GestureResponderEvent, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  ColorBorderBrand,
  ColorBorderDefault,
  ColorBorderStrong,
  ColorBorderSubtle,
  ColorBranco,
  ColorPrimary50,
  ColorPrimary500,
  ColorPrimary700,
  ColorSecondary300,
  ColorSecondary50,
  ColorSecondary500,
  ColorTextDefault,
  RadiusMd,
  SpacingMd,
  TextStyleLabelMediumBoldFontSize,
  TextStyleLabelMediumBoldFontWeight,
  TextStyleLabelMediumBoldLetterSpacing,
  TextStyleLabelMediumBoldLineHeight,
  TextStyleLabelMediumFontSize,
  TextStyleLabelMediumFontWeight,
  TextStyleLabelMediumLetterSpacing,
  TextStyleLabelMediumLineHeight
} from '@x-men-evolution/design-tokens/native';

export type CarVersionListItemProps = Omit<PressableProps, 'style' | 'children'> & {
  title: string;
  metadata: string[];
  selected?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

type ItemState = 'default' | 'selected' | 'disabled';

const containerStateStyles: Record<ItemState, ViewStyle> = {
  default: { backgroundColor: ColorBranco, borderWidth: 1, borderColor: ColorBorderDefault },
  selected: { backgroundColor: ColorPrimary50, borderWidth: 2, borderColor: ColorBorderBrand },
  disabled: { backgroundColor: ColorSecondary50, borderWidth: 1, borderColor: ColorBorderSubtle }
};

const radioStateStyles: Record<ItemState, ViewStyle> = {
  default: { borderWidth: 1, borderColor: ColorSecondary300 },
  selected: { borderWidth: 2, borderColor: ColorBorderBrand },
  disabled: { borderWidth: 1, borderColor: ColorSecondary300 }
};

const titleColors: Record<ItemState, string> = {
  default: ColorTextDefault,
  selected: ColorPrimary700,
  disabled: ColorBorderStrong
};

const metadataColors: Record<ItemState, string> = {
  default: ColorSecondary500,
  selected: ColorPrimary500,
  disabled: ColorBorderStrong
};

export function CarVersionListItem({
  title,
  metadata,
  selected = false,
  disabled = false,
  style,
  ...props
}: CarVersionListItemProps) {
  const state: ItemState = disabled ? 'disabled' : selected ? 'selected' : 'default';

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      style={[styles.base, containerStateStyles[state], style]}
      {...props}
    >
      <View style={[styles.radio, radioStateStyles[state]]} />
      <View style={styles.content}>
        <RNText
          style={[state === 'default' ? styles.title : styles.titleBold, { color: titleColors[state] }]}
          numberOfLines={1}
        >
          {title}
        </RNText>
        <View style={styles.metadataRow}>
          {metadata.map((item, index) => (
            <Fragment key={index}>
              {index > 0 && <View style={[styles.dot, { backgroundColor: metadataColors[state] }]} />}
              <RNText style={[styles.metadataText, { color: metadataColors[state] }]}>{item}</RNText>
            </Fragment>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create<{
  base: ViewStyle;
  radio: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  titleBold: TextStyle;
  metadataRow: ViewStyle;
  metadataText: TextStyle;
  dot: ViewStyle;
}>({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingMd,
    padding: SpacingMd,
    borderRadius: RadiusMd
  },
  radio: {
    width: 19,
    height: 19,
    borderRadius: 19 / 2,
    flexShrink: 0
  },
  content: {
    flex: 1,
    gap: 4,
    alignItems: 'flex-start'
  },
  title: {
    width: '100%',
    fontSize: TextStyleLabelMediumFontSize,
    fontWeight: String(TextStyleLabelMediumFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleLabelMediumLineHeight,
    letterSpacing: TextStyleLabelMediumLetterSpacing
  },
  titleBold: {
    width: '100%',
    fontSize: TextStyleLabelMediumBoldFontSize,
    fontWeight: String(TextStyleLabelMediumBoldFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleLabelMediumBoldLineHeight,
    letterSpacing: TextStyleLabelMediumBoldLetterSpacing
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingMd
  },
  metadataText: {
    fontSize: TextStyleLabelMediumFontSize,
    fontWeight: String(TextStyleLabelMediumFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleLabelMediumLineHeight,
    letterSpacing: TextStyleLabelMediumLetterSpacing
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5
  }
});
