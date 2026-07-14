import { Car } from 'lucide-react-native';
import { Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import type { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  ColorBranco,
  ColorPrimary700,
  ColorSlate400,
  ColorSlate900,
  ColorTextBrand,
  RadiusMd,
  SpacingMd,
  SpacingSm,
  SpacingXs,
  TextStyleLabelMediumFontSize,
  TextStyleLabelMediumFontWeight,
  TextStyleLabelMediumLetterSpacing,
  TextStyleLabelMediumLineHeight,
  TextStyleTitleMediumFontSize,
  TextStyleTitleMediumFontWeight,
  TextStyleTitleMediumLetterSpacing,
  TextStyleTitleMediumLineHeight
} from '@x-men-evolution/design-tokens/native';

export type VehicleSelectorProps = {
  title: string;
  subtitle: string;
  onChangePress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

export function VehicleSelector({ title, subtitle, onChangePress, style }: VehicleSelectorProps) {
  return (
    <View style={[styles.base, style]}>
      <View style={styles.avatar}>
        <Car size={28} color={ColorBranco} />
      </View>
      <View style={styles.content}>
        <RNText style={styles.title} numberOfLines={1}>
          {title}
        </RNText>
        <RNText style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </RNText>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Alterar veículo, atual: ${title}`}
        onPress={onChangePress}
        hitSlop={10}
        style={styles.changeButton}
      >
        <RNText style={styles.changeButtonText}>Alterar</RNText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create<{
  base: ViewStyle;
  avatar: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  changeButton: ViewStyle;
  changeButtonText: TextStyle;
}>({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingSm,
    paddingVertical: SpacingMd
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPrimary700
  },
  content: {
    flex: 1,
    gap: SpacingXs,
    alignItems: 'flex-start'
  },
  title: {
    width: '100%',
    color: ColorSlate900,
    fontSize: TextStyleTitleMediumFontSize,
    fontWeight: String(TextStyleTitleMediumFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleTitleMediumLineHeight,
    letterSpacing: TextStyleTitleMediumLetterSpacing
  },
  subtitle: {
    width: '100%',
    color: ColorSlate400,
    fontSize: TextStyleLabelMediumFontSize,
    fontWeight: String(TextStyleLabelMediumFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleLabelMediumLineHeight,
    letterSpacing: TextStyleLabelMediumLetterSpacing
  },
  changeButton: {
    paddingHorizontal: 12,
    borderRadius: RadiusMd,
    alignItems: 'center',
    justifyContent: 'center'
  },
  changeButtonText: {
    color: ColorTextBrand,
    fontSize: TextStyleLabelMediumFontSize,
    fontWeight: String(TextStyleLabelMediumFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleLabelMediumLineHeight,
    letterSpacing: TextStyleLabelMediumLetterSpacing
  }
});
