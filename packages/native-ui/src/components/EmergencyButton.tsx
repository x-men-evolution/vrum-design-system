import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import {
  ColorBranco,
  ColorSlate200,
  RadiusLg,
  SpacingLg,
  SpacingSm
} from '@x-men-evolution/design-tokens/native';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import { ShieldAlertIcon } from '../icons/ShieldAlertIcon';
import { textVariants } from '../internal/typography';
import { useTheme } from '../theme/ThemeProvider';

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
  const theme = useTheme();
  const badgeColor = disabled ? ColorSlate200 : theme.action.hover;
  const contentColor = disabled ? theme.text.disabled : ColorBranco;

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
        {
          backgroundColor: disabled
            ? theme.action.disabled
            : pressed
              ? theme.action.hover
              : theme.action.default
        },
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
