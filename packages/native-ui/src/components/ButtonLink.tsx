import { Pressable, Text as RNText, StyleSheet } from "react-native";
import type {
  GestureResponderEvent,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import type { LucideIcon } from "lucide-react-native";
import {
  ColorTextBrand,
  ColorTextDisabled,
  SpacingXs,
} from "@x-men-evolution/design-tokens/native";
import { textVariants } from "../internal/typography";

export type ButtonLinkProps = Omit<PressableProps, "style" | "children"> & {
  children: string;
  icon: LucideIcon;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

export function ButtonLink({
  children,
  icon: Icon,
  disabled = false,
  style,
  ...props
}: ButtonLinkProps) {
  const color = disabled ? ColorTextDisabled : ColorTextBrand;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      style={[styles.base, style]}
      {...props}
    >
      <Icon size={18} color={color} />
      <RNText style={[textVariants.labelLargeBold, { color }]}>
        {children}
      </RNText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    gap: SpacingXs,
  },
});
