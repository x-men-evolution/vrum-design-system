import { Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { Car, ChartNoAxesColumn, House, MessageCircleMore, User, Wrench } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import {
  ColorBorderDefault,
  ColorBranco,
  ColorSlate400,
  RadiusFull,
  SpacingLg,
  SpacingMd
} from '@x-men-evolution/design-tokens/native';
import { EmergencyPhoneIcon } from '../icons/EmergencyPhoneIcon';
import { textVariants } from '../internal/typography';
import { useTheme } from '../theme/ThemeProvider';

export const TAB_BAR_VARIANTS = ['default', 'provider'] as const;
export type TabBarVariant = (typeof TAB_BAR_VARIANTS)[number];

export type DefaultTabKey = 'inicio' | 'servicos' | 'garagem' | 'perfil';
export type ProviderTabKey = 'inicio' | 'chamados' | 'chat' | 'relatorios' | 'perfil';
export type TabBarTabKey = DefaultTabKey | ProviderTabKey;

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

function TabItem({
  tab,
  active,
  onPress
}: {
  tab: TabDef;
  active: boolean;
  onPress?: (tab: TabBarTabKey) => void;
}) {
  const theme = useTheme();
  const color = active ? theme.text.brand : ColorSlate400;
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
  const tabs = isProvider ? PROVIDER_TABS : DEFAULT_TABS;
  const middleIndex = Math.ceil(tabs.length / 2);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        {tabs.slice(0, middleIndex).map((tab) => (
          <TabItem key={tab.key} tab={tab} active={activeTab === tab.key} onPress={onTabPress} />
        ))}

        {!isProvider && showEmergencyButton ? (
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
          <TabItem key={tab.key} tab={tab} active={activeTab === tab.key} onPress={onTabPress} />
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
