import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { ColorBranco, ColorChipSuccess, ColorSlate300, RadiusFull } from '@x-men-evolution/design-tokens/native';

export type SwitchProps = {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const TRACK_WIDTH = 44;
const TRACK_HEIGHT = 24;
const KNOB_SIZE = 20;
const KNOB_INSET = 2;

export function Switch({ value, onValueChange, disabled = false, style }: SwitchProps) {
  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: value ? 1 : 0,
      duration: 150,
      useNativeDriver: false
    }).start();
  }, [value, progress]);

  const trackColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [ColorSlate300, ColorChipSuccess]
  });

  const knobTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TRACK_WIDTH - KNOB_SIZE - KNOB_INSET * 2]
  });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ disabled, checked: value }}
      disabled={disabled}
      onPress={() => onValueChange?.(!value)}
      style={[{ opacity: disabled ? 0.4 : 1 }, style]}
    >
      <Animated.View style={[styles.track, { backgroundColor: trackColor }]}>
        <Animated.View style={[styles.knob, { transform: [{ translateX: knobTranslateX }] }]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: RadiusFull,
    padding: KNOB_INSET,
    justifyContent: 'center'
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: RadiusFull,
    backgroundColor: ColorBranco,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  }
});
