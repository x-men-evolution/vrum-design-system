import { Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { Car, ChartNoAxesColumn, House, MessageCircleMore, Search, User, Wrench } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import {
  ColorBorderDefault,
  ColorBranco,
  ColorPrimary700,
  ColorSlate400,
  RadiusFull,
  SpacingLg,
  SpacingMd
} from '@x-men-evolution/design-tokens/native';
import { EmergencyPhoneIcon } from '../icons/EmergencyPhoneIcon';
import { textVariants } from '../internal/typography';
import { useTheme } from '../theme/ThemeProvider';

export const TAB_BAR_VARIANTS = ['default', 'provider', 'lojista'] as const;
export type TabBarVariant = (typeof TAB_BAR_VARIANTS)[number];

export type DefaultTabKey = 'inicio' | 'servicos' | 'garagem' | 'perfil';
export type ProviderTabKey = 'inicio' | 'chamados' | 'chat' | 'relatorios' | 'perfil';
export type LojistaTabKey = 'inicio' | 'estoque' | 'chat' | 'consultas' | 'perfil';
export type TabBarTabKey = DefaultTabKey | ProviderTabKey | LojistaTabKey;

export type TabBarProps = {
  variant?: TabBarVariant;
  activeTab?: TabBarTabKey;
  onTabPress?: (tab: TabBarTabKey) => void;
  showEmergencyButton?: boolean;
  onEmergencyPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

type TabDef = { key: TabBarTabKey; label: string; Icon: LucideIcon };

const DEFAULT_TABS: TabDef[] = [
  { key: 'inicio', label: 'Início', Icon: House },
  { key: 'servicos', label: 'Serviços', Icon: Wrench },
  { key: 'garagem', label: 'Garagem', Icon: Car },
  { key: 'perfil', label: 'Perfil', Icon: User }
];

const PROVIDER_TABS: TabDef[] = [
  { key: 'inicio', label: 'Início', Icon: House },
  { key: 'chamados', label: 'Chamados', Icon: Wrench },
  { key: 'chat', label: 'Chat', Icon: MessageCircleMore },
  { key: 'relatorios', label: 'Relatórios', Icon: ChartNoAxesColumn },
  { key: 'perfil', label: 'Perfil', Icon: User }
];

const LOJISTA_TABS: TabDef[] = [
  { key: 'inicio', label: 'Início', Icon: House },
  { key: 'estoque', label: 'Estoque', Icon: Car },
  { key: 'chat', label: 'Chat', Icon: MessageCircleMore },
  { key: 'consultas', label: 'Consultas', Icon: Search },
  { key: 'perfil', label: 'Perfil', Icon: User }
];

function TabItem({
  tab,
  active,
  activeColor,
  onPress
}: {
  tab: TabDef;
  active: boolean;
  activeColor: string;
  onPress?: (tab: TabBarTabKey) => void;
}) {
  const color = active ? activeColor : ColorSlate400;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={tab.label}
      onPress={() => onPress?.(tab.key)}
      style={styles.tabItem}
    >
      <tab.Icon size={22} color={color} />
      <RNText style={[textVariants.labelLarge, { color }]}>{tab.label}</RNText>
    </Pressable>
  );
}

export function TabBar({
  variant = 'default',
  activeTab = 'inicio',
  onTabPress,
  showEmergencyButton = true,
  onEmergencyPress,
  style
}: TabBarProps) {
  const theme = useTheme();
  const isProvider = variant === 'provider';
  const isLojista = variant === 'lojista';
  const tabs = isLojista ? LOJISTA_TABS : isProvider ? PROVIDER_TABS : DEFAULT_TABS;
  // Item ativo do lojista é vermelho fixo (primary/700) — resgate proposital
  // da cor original da VRUM nesse elemento, independente do tema do app.
  const activeColor = isLojista ? ColorPrimary700 : theme.text.brand;
  const middleIndex = Math.ceil(tabs.length / 2);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        {tabs.slice(0, middleIndex).map((tab) => (
          <TabItem
            key={tab.key}
            tab={tab}
            active={activeTab === tab.key}
            activeColor={activeColor}
            onPress={onTabPress}
          />
        ))}

        {variant === 'default' && showEmergencyButton ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Socorro emergencial"
            onPress={onEmergencyPress}
            style={({ pressed }) => [
              styles.emergencyButton,
              { backgroundColor: pressed ? theme.action.hover : theme.action.default }
            ]}
          >
            <EmergencyPhoneIcon size={48} color={ColorBranco} />
          </Pressable>
        ) : null}

        {tabs.slice(middleIndex).map((tab) => (
          <TabItem
            key={tab.key}
            tab={tab}
            active={activeTab === tab.key}
            activeColor={activeColor}
            onPress={onTabPress}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: ColorBranco,
    borderTopWidth: 1,
    borderTopColor: ColorBorderDefault,
    paddingTop: SpacingMd,
    paddingBottom: SpacingMd,
    paddingHorizontal: SpacingMd,
    overflow: 'visible'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    overflow: 'visible'
  },
  tabItem: {
    alignItems: 'center',
    gap: 6
  },
  emergencyButton: {
    width: 75,
    height: 75,
    // Sobe acima da borda superior da barra (ver Figma: o botão central
    // "corta" a linha divisória em vez de ficar contido nela).
    marginTop: -SpacingLg,
    borderRadius: RadiusFull,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8
  }
});
