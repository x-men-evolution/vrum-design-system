import { Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import type { GestureResponderEvent, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import {
  ColorActionDisabled,
  ColorActionGhostHover,
  ColorBranco,
  ColorSecondary500,
  ColorSlate700,
  ColorTextDisabled,
  RadiusXl,
  SpacingMd,
  TextStyleBodyMediumBoldFontSize,
  TextStyleBodyMediumBoldFontWeight,
  TextStyleBodyMediumBoldLetterSpacing,
  TextStyleBodyMediumBoldLineHeight,
  TextStyleLabelSmallFontSize,
  TextStyleLabelSmallFontWeight,
  TextStyleLabelSmallLetterSpacing,
  TextStyleLabelSmallLineHeight
} from '@x-men-evolution/design-tokens/native';

export type OptionButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  icon: LucideIcon;
  title: string;
  description: string;
  disabled?: boolean;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

export function OptionButton({
  icon: Icon,
  title,
  description,
  disabled = false,
  iconSize = 36,
  style,
  ...props
}: OptionButtonProps) {
  const contentColor = disabled ? ColorTextDisabled : ColorSlate700;
  const descriptionColor = disabled ? ColorTextDisabled : ColorSecondary500;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: disabled ? ColorActionDisabled : pressed ? ColorActionGhostHover : ColorBranco
        },
        style
      ]}
      {...props}
    >
      <Icon size={iconSize} color={contentColor} />
      <View style={styles.textContainer}>
        <RNText style={[styles.title, { color: contentColor }]} numberOfLines={1}>
          {title}
        </RNText>
        <RNText style={[styles.description, { color: descriptionColor }]}>{description}</RNText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create<{
  base: ViewStyle;
  textContainer: ViewStyle;
  title: TextStyle;
  description: TextStyle;
}>({
  base: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    aspectRatio: 1,
    paddingHorizontal: SpacingMd,
    paddingVertical: 20,
    borderRadius: RadiusXl
  },
  textContainer: {
    gap: 4,
    alignItems: 'flex-start',
    width: '100%'
  },
  title: {
    fontSize: TextStyleBodyMediumBoldFontSize,
    fontWeight: String(TextStyleBodyMediumBoldFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleBodyMediumBoldLineHeight,
    letterSpacing: TextStyleBodyMediumBoldLetterSpacing
  },
  description: {
    fontSize: TextStyleLabelSmallFontSize,
    fontWeight: String(TextStyleLabelSmallFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleLabelSmallLineHeight,
    letterSpacing: TextStyleLabelSmallLetterSpacing
  }
});
