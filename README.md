# VRUM Design System

Monorepo (Turborepo + npm workspaces) do design system do VRUM.

Fonte de verdade: [Figma — Vrum Design System](https://www.figma.com/design/oNdtL12mvpHoOx6AUDKr2Z/Vrum---Design-System). Os tokens são extraídos das **variáveis e estilos** do arquivo (não dos componentes).

## Pacotes

| Pacote | Descrição |
| --- | --- |
| `@x-men-evolution/design-tokens` | Tokens (cores, tipografia, espaçamento…) compilados via Style Dictionary para CSS variables (web) e objeto JS/TS (web + React Native) |
| `@x-men-evolution/web-ui` | Componentes React para o produto web (Next.js) |
| `@x-men-evolution/native-ui` | Componentes React Native para o produto mobile |

## Requisitos

- Node 24 (LTS) — `nvm use`
- npm 11+

## Comandos

```sh
npm install
npm run build          # builda tudo (tokens primeiro, via grafo do Turborepo)
npm run tokens:build   # builda só os tokens
```

## Consumo

Web (Next.js):

```ts
import '@x-men-evolution/design-tokens/css'; // CSS variables globais
import { ColorBrandPrimary } from '@x-men-evolution/design-tokens';
```

React Native:

```ts
import { ColorBrandPrimary } from '@x-men-evolution/design-tokens/native';
```

Tailwind / NativeWind (`theme.extend` do `tailwind.config`):

```js
import theme from '@x-men-evolution/design-tokens/tailwind';

export default {
  theme: {
    extend: theme // colors, spacing, borderRadius, boxShadow, fontFamily, fontWeight, fontSize
  }
};
```

## Publicação (GitHub Packages)

Os pacotes são publicados no GitHub Packages via workflow de release
(`.github/workflows/publish.yml`), disparado por tag `v*`. Para consumir,
o projeto precisa de um `.npmrc` com:

```
@x-men-evolution:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

> O escopo do pacote (`@x-men-evolution/*`) precisa ser igual ao owner do
> repositório no GitHub — o repo vive na org `x-men-evolution`, então os
> pacotes usam esse mesmo escopo.
