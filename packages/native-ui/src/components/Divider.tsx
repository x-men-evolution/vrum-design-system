import { StyleSheet, Text as RNText, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ColorBorderDefault, ColorSlate500 } from '@x-men-evolution/design-tokens/native';
import { textVariants } from '../internal/typography';

export type DividerProps = {
  children?: string;
  style?: StyleProp<ViewStyle>;
};

export function Divider({ children, style }: DividerProps) {
  if (!children) {
    return <View style={[styles.line, style]} />;
  }

  return (
    <View style={[styles.row, style]}>
      <View style={styles.line} />
      <RNText style={[textVariants.bodyMedium, styles.label]}>{children}</RNText>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create<{
  row: ViewStyle;
  line: ViewStyle;
  label: TextStyle;
}>({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: ColorBorderDefault
  },
  label: {
    color: ColorSlate500,
    textAlign: 'center'
  }
});
