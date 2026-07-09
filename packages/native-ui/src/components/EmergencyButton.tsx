import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  ColorActionDefault,
  ColorActionDisabled,
  ColorActionHover,
  ColorBranco,
  ColorSlate200,
  ColorTextDisabled,
  RadiusLg,
  SpacingMd,
  SpacingSm,
  SpacingXs,
  TextStyleLabelMediumFontSize,
  TextStyleLabelMediumFontWeight,
  TextStyleLabelMediumLetterSpacing,
  TextStyleLabelMediumLineHeight,
  TextStyleTitleSmallFontSize,
  TextStyleTitleSmallFontWeight,
  TextStyleTitleSmallLetterSpacing,
  TextStyleTitleSmallLineHeight
} from '@x-men-evolution/design-tokens/native';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import { ShieldAlertIcon } from '../icons/ShieldAlertIcon';

export type EmergencyButtonProps = {
  title?: string;
  subtitle?: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function EmergencyButton({
  title = 'SOCORRO EMERGENCIAL',
  subtitle = 'Disponível 24h',
  disabled = false,
  onPress,
  style,
  testID
}: EmergencyButtonProps) {
  const badgeColor = disabled ? ColorSlate200 : ColorActionHover;
  const contentColor = disabled ? ColorTextDisabled : ColorBranco;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: disabled ? ColorActionDisabled : pressed ? ColorActionHover : ColorActionDefault },
        style
      ]}
    >
      <View style={[styles.badge, { backgroundColor: badgeColor }]}>
        <ShieldAlertIcon size={24} color={contentColor} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: contentColor }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: contentColor }]} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.chevrons}>
        <ChevronRightIcon size={16} color={contentColor} />
        <ChevronRightIcon size={16} color={contentColor} style={styles.chevronOverlap} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: RadiusLg,
    padding: SpacingXs
  },
  badge: {
    width: 56,
    borderRadius: RadiusLg,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: SpacingMd,
    gap: 2
  },
  title: {
    fontSize: TextStyleTitleSmallFontSize,
    fontWeight: String(TextStyleTitleSmallFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleTitleSmallLineHeight,
    letterSpacing: TextStyleTitleSmallLetterSpacing
  },
  subtitle: {
    fontSize: TextStyleLabelMediumFontSize,
    fontWeight: String(TextStyleLabelMediumFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleLabelMediumLineHeight,
    letterSpacing: TextStyleLabelMediumLetterSpacing
  },
  chevrons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SpacingSm
  },
  chevronOverlap: {
    marginLeft: -6
  }
});
