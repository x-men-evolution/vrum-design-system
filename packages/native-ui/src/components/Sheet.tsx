import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { X } from 'lucide-react-native';
import {
  ColorBranco,
  ColorSlate300,
  ColorSlate700,
  ColorTextDefault,
  Radius2xl,
  SpacingLg,
  SpacingMd,
  SpacingXl,
  TextStyleTitleMediumFontSize,
  TextStyleTitleMediumFontWeight,
  TextStyleTitleMediumLetterSpacing,
  TextStyleTitleMediumLineHeight
} from '@x-men-evolution/design-tokens/native';

export type SheetRef = {
  present: () => void;
  dismiss: () => void;
};

export type SheetProps = {
  /** Título opcional exibido no cabeçalho. */
  title?: string;
  /** Se `false`, remove o botão de fechar e o arrasto/toque no backdrop para fechar. Padrão: `true`. */
  dismissible?: boolean;
  /** Exibe a barra de arraste (handle) no topo. Padrão: `true`. */
  showHandle?: boolean;
  /** Exibe o botão de fechar no cabeçalho (quando há `title`). Padrão: acompanha `dismissible`. */
  showCloseButton?: boolean;
  /** Pontos de ancoragem fixos. Se omitido, o Sheet dimensiona pelo conteúdo. */
  snapPoints?: (string | number)[];
  /** Opacidade do backdrop escuro. Padrão: `0.2`. */
  backdropOpacity?: number;
  /** Callback ao fechar. */
  onDismiss?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export const Sheet = forwardRef<SheetRef, SheetProps>(function Sheet(
  {
    title,
    dismissible = true,
    showHandle = true,
    showCloseButton,
    snapPoints,
    backdropOpacity = 0.2,
    onDismiss,
    contentStyle,
    children
  },
  ref
) {
  const modalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    present: () => modalRef.current?.present(),
    dismiss: () => modalRef.current?.dismiss()
  }));

  const resolvedShowClose = showCloseButton ?? dismissible;

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={backdropOpacity}
        pressBehavior={dismissible ? 'close' : 'none'}
      />
    ),
    [backdropOpacity, dismissible]
  );

  const dynamicSizing = snapPoints == null;
  const memoSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={memoSnapPoints}
      enableDynamicSizing={dynamicSizing}
      enablePanDownToClose={dismissible}
      onDismiss={onDismiss}
      backdropComponent={renderBackdrop}
      handleComponent={showHandle ? undefined : null}
      handleIndicatorStyle={styles.handleBar}
      backgroundStyle={styles.background}
    >
      <BottomSheetView style={[styles.content, contentStyle]}>
        {(title || resolvedShowClose) && (
          <View style={styles.header}>
            {title ? <RNText style={styles.title}>{title}</RNText> : <View style={styles.headerSpacer} />}
            {resolvedShowClose && (
              <Pressable onPress={() => modalRef.current?.dismiss()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Fechar">
                <X size={24} color={ColorSlate700} />
              </Pressable>
            )}
          </View>
        )}
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  background: {
    backgroundColor: ColorBranco,
    borderTopLeftRadius: Radius2xl,
    borderTopRightRadius: Radius2xl
  },
  handleBar: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: ColorSlate300
  },
  content: {
    paddingHorizontal: SpacingLg,
    paddingBottom: SpacingXl
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SpacingMd
  },
  headerSpacer: {
    flex: 1
  },
  title: {
    flex: 1,
    fontSize: TextStyleTitleMediumFontSize,
    fontWeight: String(TextStyleTitleMediumFontWeight) as TextStyle['fontWeight'],
    lineHeight: TextStyleTitleMediumLineHeight,
    letterSpacing: TextStyleTitleMediumLetterSpacing,
    color: ColorTextDefault
  }
});

export { BottomSheetView, BottomSheetScrollView, BottomSheetFlatList } from '@gorhom/bottom-sheet';
