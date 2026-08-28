import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { defaultTheme } from '@x-men-evolution/design-tokens/themes';
import type { VrumTheme } from '@x-men-evolution/design-tokens/themes';

// O default do contexto é o tema `default` (cliente): um app que nunca montar
// o provider — o vrum-mobile — se comporta exatamente como antes do tema
// existir. Trocar de marca é opt-in, nunca uma quebra silenciosa.
const ThemeContext = createContext<VrumTheme>(defaultTheme);

export type VrumThemeProviderProps = {
  theme?: VrumTheme;
  children: ReactNode;
};

export function VrumThemeProvider({ theme = defaultTheme, children }: VrumThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): VrumTheme {
  return useContext(ThemeContext);
}
