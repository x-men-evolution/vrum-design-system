# VRUM Design System — Guia para agentes de IA

Este guia é o caminho-base obrigatório para qualquer modelo de IA que modifique este repositório. Siga-o mesmo que seu comportamento padrão sugira outra coisa. Dois princípios motivam as regras: **entregar funcionalidade com qualidade** e **evitar consumo desnecessário de tokens** (execuções, leituras e verificações repetitivas ficam a cargo do usuário).

## Definição de pronto (o que fazer — e onde parar)

Uma tarefa de código está concluída quando:

1. A implementação está completa e fiel à especificação (Figma, quando houver).
2. `typecheck` passou **no workspace tocado** (ex.: `npm run typecheck --workspace=@x-men-evolution/native-ui`) — nunca na raiz do monorepo inteiro sem necessidade.
3. Testes foram **escritos** quando a mudança justifica (lógica nova, variantes, edge cases).

O que **não** fazer ao concluir:

- **Não execute testes** (`jest`/`npm test`). O usuário roda a suíte em momentos escolhidos por ele.
- **Não execute lint** como rotina de conferência. Escreva código que respeite o ESLint do projeto; a execução é do usuário.
- **Não inicie preview, dev server ou simulador** para verificação visual. O usuário confere no próprio simulador.
- **Não rode build** (`tsup`/`turbo build`) como checagem — apenas quando a tarefa exigir o artefato.

## Economia de tokens

- Não rode `npm install` automaticamente após editar dependências; só quando indispensável para prosseguir, avisando antes.
- Não repita consultas ao Figma (MCP) para o mesmo componente na mesma sessão — reaproveite o contexto já obtido.
- Não leia artefatos gerados (`dist/`, `package-lock.json`) salvo exigência explícita da tarefa.
- Leia apenas os arquivos necessários para a mudança; prefira busca direcionada (`grep`) a exploração ampla.
- Não gere documentação, changelog ou resumo extenso sem pedido explícito.

## Gerenciador de pacotes

- Este repo usa **npm** (`"packageManager": "npm@11.4.2"`) com workspaces e `package-lock.json`. Nunca gere `yarn.lock` aqui.
- O repo irmão `vrum-mobile` usa **Yarn Classic** via `corepack yarn`. Decisão deliberada — não uniformizar.
- Ao instalar libs com conflito de peer deps (reanimated × react-native), use `npm install --legacy-peer-deps`.

## Escopo de desenvolvimento

- Novos componentes vão em `packages/native-ui` (React Native), **não** em `packages/web-ui`, até o usuário indicar que o projeto web começou.
- Versionamento em lockstep: design-tokens, native-ui e web-ui sobem juntos na mesma versão. Publicação via tag `v*` → GitHub Actions publica no GitHub Packages.

## Boas práticas de código (obrigatórias)

- **Tokens sempre**: cores, raios, espaçamentos e tipografia vêm de `@x-men-evolution/design-tokens/native`. Nunca hex/valores mágicos hardcoded.
- **Siga o padrão dos componentes existentes** (ex.: `FilterChip.tsx`, `Text.tsx`): função nomeada exportada, props tipadas com `type XProps = Omit<PressableProps, ...> & {...}`, `StyleSheet.create` para estilos estáticos, estilos dinâmicos inline no array, `style` do consumidor mesclado por último.
- **Acessibilidade não é opcional**: `accessibilityRole`, `accessibilityState` (disabled/selected), alvos de toque adequados.
- **Reuso interno**: helpers compartilhados vivem em `src/internal/` (`typography`, `fieldMetrics`, `useFocusState`) — verifique se já existe antes de criar.
- **Peer dependencies**: dependências de runtime do consumidor (gesture-handler, reanimated, nativewind…) são `peerDependencies` — opcionais somente se nenhum componente do barrel principal as importar. Adicione novas externals em `tsup.config.ts`.
- **API mínima**: exponha só as props necessárias; sem prop "por precaução". Componentes não definem cor de texto via variante tipográfica (variantes cuidam apenas de fonte/tamanho/peso/altura/espaçamento).
- **Sem comentários redundantes**: comente apenas restrições que o código não consegue expressar.
