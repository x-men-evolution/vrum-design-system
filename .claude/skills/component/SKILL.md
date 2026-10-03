---
name: component
description: Criar ou alterar um componente em packages/native-ui do vrum-design-system — componente novo a partir do Figma, prop ou variante nova, ou dependência de runtime nova. Use antes de mexer em packages/native-ui/src/components.
---

# Componente do native-ui

`packages/native-ui/src/components/` tem um `.tsx` por componente. Não há gerador: tudo abaixo é manual. Modelos: `FilterChip.tsx`, `Text.tsx`, `SearchInput.tsx`, `Sheet.tsx`.

## 1. Arquivo do componente
- Cores, raios, espaçamentos e tipografia sempre de `@x-men-evolution/design-tokens/native`. Nunca hex ou número mágico.
- Antes de criar helper, procurar em `src/internal/` (`typography.ts`, `useFocusState.ts`, `fieldMetrics.ts`).
- Props: `type XProps = Omit<PressableProps, 'style' | 'children'> & {...}` (ou a primitiva RN envolvida). `StyleSheet.create` para o estático, estilo dinâmico no array e o `style` do consumidor por último.
- Acessibilidade obrigatória: `accessibilityRole` e `accessibilityState` (disabled, selected…).
- Variante tipográfica só define fonte, tamanho, peso, altura de linha e espaçamento; nunca cor.

## 2. Export no barrel (o passo mais esquecido)
Sem export manual em `packages/native-ui/src/index.ts`, o consumidor não vê o componente. As duas linhas são obrigatórias:
```ts
export { MyComponent } from './components/MyComponent';
export type { MyComponentProps } from './components/MyComponent';
```

## 3. Dependência de runtime nova
- Vai em `peerDependencies` e, igual, em `devDependencies` (para build e typecheck).
- `optional: true` em `peerDependenciesMeta` **só** se nada alcançável pelo barrel a importa no escopo do módulo. Se um componente sempre importado a puxa (como o `Text` puxa o `nativewind`), o peer é obrigatório.
- Incluir em `external` no `tsup.config.ts` e, se não for CJS, em `transformIgnorePatterns` do jest.
- Conflito de peer deps ao instalar (reanimated × react-native): `npm install --legacy-peer-deps`.

## 4. Testes
Lógica nova, variante ou caso de borda ganham teste em `src/components/__tests__/`. Ajuste puramente visual ou de token não precisa. A suíte roda no CI.

## 5. Ao terminar
`npm run typecheck --workspace=@x-men-evolution/native-ui`, conferência contra o Figma e parar. Lint, testes e build rodam no CI. Para publicar, skill `release`.
