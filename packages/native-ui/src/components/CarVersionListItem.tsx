import { Fragment, useMemo } from 'react';
import { Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import type { GestureResponderEvent, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  ColorBranco,
  ColorSecondary300,
  ColorSecondary50,
  ColorSecondary500,
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
import type { VrumTheme } from '@x-men-evolution/design-tokens/themes';
import { useTheme } from '../theme/ThemeProvider';

export type CarVersionListItemProps = Omit<PressableProps, 'style' | 'children'> & {
  title: string;
  metadata: string[];
  selected?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

type ItemState = 'default' | 'selected' | 'disabled';

type ItemPalette = {
  container: Record<ItemState, ViewStyle>;
  radio: Record<ItemState, ViewStyle>;
  title: Record<ItemState, string>;
  metadata: Record<ItemState, string>;
};

function buildPalette(theme: VrumTheme): ItemPalette {
  return {
    container: {
      default: { backgroundColor: ColorBranco, borderWidth: 1, borderColor: theme.border.default },
      selected: {
        backgroundColor: theme.action.ghost.hover,
        borderWidth: 2,
        borderColor: theme.border.brand
      },
      disabled: { backgroundColor: ColorSecondary50, borderWidth: 1, borderColor: theme.border.subtle }
    },
    radio: {
      default: { borderWidth: 1, borderColor: ColorSecondary300 },
      selected: { borderWidth: 2, borderColor: theme.border.brand },
      disabled: { borderWidth: 1, borderColor: ColorSecondary300 }
    },
    title: {
      default: theme.text.default,
      selected: theme.text.brand,
      disabled: theme.border.strong
    },
    metadata: {
      default: ColorSecondary500,
      selected: theme.brand['500'],
      disabled: theme.border.strong
    }
  };
}

export function CarVersionListItem({
  title,
  metadata,
  selected = false,
  disabled = false,
  style,
  ...props
}: CarVersionListItemProps) {
  const theme = useTheme();
  const palette = useMemo(() => buildPalette(theme), [theme]);
  const state: ItemState = disabled ? 'disabled' : selected ? 'selected' : 'default';

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      style={[styles.base, palette.container[state], style]}
      {...props}
    >
      <View style={[styles.radio, palette.radio[state]]} />
      <View style={styles.content}>
        <RNText
          style={[state === 'default' ? styles.title : styles.titleBold, { color: palette.title[state] }]}
          numberOfLines={1}
        >
          {title}
        </RNText>
        <View style={styles.metadataRow}>
          {metadata.map((item, index) => (
            <Fragment key={`${item}-${index}`}>
              {index > 0 && <View style={[styles.dot, { backgroundColor: palette.metadata[state] }]} />}
              <RNText style={[styles.metadataText, { color: palette.metadata[state] }]}>{item}</RNText>
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
