import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import {
  ColorActionDefault,
  ColorActionDisabled,
  ColorActionHover,
  ColorBranco,
  ColorSlate200,
  ColorTextDisabled,
  RadiusLg,
  SpacingLg,
  SpacingSm
} from '@x-men-evolution/design-tokens/native';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import { ShieldAlertIcon } from '../icons/ShieldAlertIcon';
import { textVariants } from '../internal/typography';

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
        <ShieldAlertIcon size={32} color={contentColor} />
      </View>

      <View style={styles.content}>
        <Text style={[textVariants.titleSmall, { color: contentColor }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[textVariants.labelMedium, { color: contentColor }]} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.chevrons}>
        <ChevronRightIcon size={24} color={contentColor} />
        <ChevronRightIcon size={24} color={contentColor} style={styles.chevronOverlap} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: RadiusLg,
    padding: 6
  },
  badge: {
    width: 68,
    height: 70,
    borderRadius: RadiusLg,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: SpacingLg,
    gap: 2
  },
  chevrons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SpacingSm
  },
  chevronOverlap: {
    marginLeft: -14
  }
});
