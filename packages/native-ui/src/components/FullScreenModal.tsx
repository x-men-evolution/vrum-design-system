import { Modal, Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import {
  ColorBranco,
  ColorSlate100,
  ColorSlate900,
  ColorTextDefault,
  SpacingLg,
  SpacingMd
} from '@x-men-evolution/design-tokens/native';
import { textVariants } from '../internal/typography';

export const FULL_SCREEN_MODAL_VARIANTS = ['page', 'full'] as const;
export type FullScreenModalVariant = (typeof FULL_SCREEN_MODAL_VARIANTS)[number];

export type FullScreenModalProps = {
  visible: boolean;
  onClose: () => void;
  /** Título opcional no cabeçalho. Sem título, o cabeçalho só aparece se `showCloseButton` for `true`. */
  title?: string;
  /** `page` = pageSheet (iOS card empilhado). `full` = tela cheia. Padrão: `page`. */
  variant?: FullScreenModalVariant;
  /** Exibe o botão de fechar (X). Padrão: `true`. */
  showCloseButton?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export function FullScreenModal({
  visible,
  onClose,
  title,
  variant = 'page',
  showCloseButton = true,
  contentStyle,
  children
}: FullScreenModalProps) {
  const insets = useSafeAreaInsets();
  const showHeader = Boolean(title) || showCloseButton;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle={variant === 'full' ? 'fullScreen' : 'pageSheet'}
      onRequestClose={onClose}
    >
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        {showHeader && (
          <View style={styles.header}>
            {title ? <RNText style={[textVariants.titleLarge, styles.title]}>{title}</RNText> : <View style={styles.headerSpacer} />}
            {showCloseButton && (
              <Pressable onPress={onClose} hitSlop={10} accessibilityRole="button" accessibilityLabel="Fechar">
                <X size={24} color={ColorSlate900} />
              </Pressable>
            )}
          </View>
        )}
        <View style={[styles.content, contentStyle]}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create<{
  container: ViewStyle;
  header: ViewStyle;
  headerSpacer: ViewStyle;
  title: TextStyle;
  content: ViewStyle;
}>({
  container: {
    flex: 1,
    backgroundColor: ColorBranco
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SpacingLg,
    paddingVertical: SpacingMd,
    borderBottomWidth: 1,
    borderBottomColor: ColorSlate100
  },
  headerSpacer: {
    flex: 1
  },
  title: {
    flex: 1,
    color: ColorTextDefault
  },
  content: {
    flex: 1
  }
});
