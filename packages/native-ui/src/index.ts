// Componentes mobile (React Native) do VRUM Design System.

// Tema: um app só precisa montar o provider se quiser fugir da marca padrão
// (cliente). Os temas vêm de design-tokens e são reexportados aqui para o app
// não precisar depender do pacote de tokens só para trocar de marca.
export { VrumThemeProvider, useTheme } from './theme/ThemeProvider';
export type { VrumThemeProviderProps } from './theme/ThemeProvider';
export { defaultTheme, prestadorTheme, themes } from '@x-men-evolution/design-tokens/themes';
export type { VrumTheme, VrumThemeName } from '@x-men-evolution/design-tokens/themes';

export { EmergencyButton } from './components/EmergencyButton';
export type { EmergencyButtonProps } from './components/EmergencyButton';

export { Text, TEXT_VARIANTS } from './components/Text';
export type { TextProps, TextVariant } from './components/Text';

export { Button, BUTTON_VARIANTS, BUTTON_SIZES } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { TabBar, TAB_BAR_VARIANTS } from './components/TabBar';
export type {
  TabBarProps,
  TabBarVariant,
  DefaultTabKey,
  ProviderTabKey,
  LojistaTabKey,
  TabBarTabKey
} from './components/TabBar';

export { Input, INPUT_SIZES } from './components/Input';
export type { InputProps, InputSize } from './components/Input';

export { Textarea, TEXTAREA_SIZES } from './components/Textarea';
export type { TextareaProps, TextareaSize } from './components/Textarea';

export { SearchInput, SEARCH_INPUT_SIZES } from './components/SearchInput';
export type { SearchInputProps, SearchInputSize } from './components/SearchInput';

export { Select, SELECT_SIZES } from './components/Select';
export type { SelectProps, SelectSize, SelectOption } from './components/Select';

export { Tag, TAG_COLORS, TAG_SIZES, TAG_VARIANTS } from './components/Tag';
export type { TagProps, TagColor, TagSize, TagVariant } from './components/Tag';

export { VrumLogo, VRUM_LOGO_VARIANTS } from './components/VrumLogo';
export type { VrumLogoProps, VrumLogoVariant } from './components/VrumLogo';

export { FilterChip } from './components/FilterChip';
export type { FilterChipProps } from './components/FilterChip';

export { Toggle, TOGGLE_SIZES } from './components/Toggle';
export type { ToggleProps, ToggleSize } from './components/Toggle';

export { IconButton, ICON_BUTTON_SIZES, ICON_BUTTON_VARIANTS } from './components/IconButton';
export type { IconButtonProps, IconButtonSize, IconButtonVariant } from './components/IconButton';
export { HeaderButton, HEADER_BUTTON_TYPES } from './components/HeaderButton';
export type { HeaderButtonProps, HeaderButtonType } from './components/HeaderButton';

export { Divider } from './components/Divider';
export type { DividerProps } from './components/Divider';

export { Link } from './components/Link';
export type { LinkProps } from './components/Link';

export { Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';

export {
  Sheet,
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetFlatList
} from './components/Sheet';
export type { SheetProps, SheetRef } from './components/Sheet';

export { FullScreenModal, FULL_SCREEN_MODAL_VARIANTS } from './components/FullScreenModal';
export type { FullScreenModalProps, FullScreenModalVariant } from './components/FullScreenModal';

export { OptionButton } from './components/OptionButton';
export type { OptionButtonProps } from './components/OptionButton';

export { CarVersionListItem } from './components/CarVersionListItem';
export type { CarVersionListItemProps } from './components/CarVersionListItem';

export { ButtonLink } from './components/ButtonLink';
export type { ButtonLinkProps } from './components/ButtonLink';

