# Tokens (fonte)

Os arquivos JSON desta pasta são a fonte de verdade dos tokens, extraídos das
**variáveis e estilos** do Figma (Vrum — Design System), não dos componentes.

Estrutura:

- `color.json` — ramps primitivas (`primary`, `slate`, `emerald`, `blue`, `amber`, …)
- `semantic.json` — tokens semânticos que **não** mudam entre marcas
- `modes/<mode>.json` — os tokens semânticos que **mudam** por marca
- `typography.json` — famílias, tamanhos, pesos, line-heights
- `spacing.json` — escala de espaçamento
- `radius.json` — border radius
- `elevation.json` — sombras

Formato: Style Dictionary (categoria → item → `{ "value": ... }`).

## Camadas e modes

O `mode` do Figma (Default = cliente, Prestador) troca **apenas para onde o
token semântico aponta** — nunca o valor de uma ramp primitiva. `modes/` contém
exatamente os tokens que diferem entre marcas; todo o resto vive em
`semantic.json` e é compartilhado.

`build.js` roda o Style Dictionary uma vez por mode e emite `dist/themes/`. As
saídas legadas (`dist/js`, `dist/css`, `dist/tailwind`) representam o mode
`default` — é o que o `vrum-mobile` já consome como constante.

### `primary` não quer dizer "marca"

No mode Prestador a marca é `slate`, mas a ramp `primary` **continua vermelha** —
ela é a ramp de feedback. É de propósito: é o que mantém erro, campo inválido e
botão destrutivo vermelhos nos dois apps, sem nenhuma regra extra.

Consequência prática, e é fácil errar:

- Precisa da cor da marca? Use o **semântico** (`color.action.default`,
  `color.text.brand`, `color.brand.default`). Nunca `color.primary.*`.
- `color.primary.*` só aparece legitimamente em token de feedback
  (`border.error`, `text.danger`, `action.destructive.*`, `chip.danger`).

Em componente a mesma regra vira: **semântico vem do `useTheme()`, primitiva
vem de constante importada.** Uma primitiva de marca hardcodada num componente
não acompanha a troca de mode e vira bug silencioso no app do prestador.

## O mesmo em className (NativeWind)

`useTheme()` não alcança `className` — NativeWind resolve classe na build, lendo
o `tailwind.config.js` do app. Para as duas camadas não divergirem, cada app
deriva suas classes de marca do **mesmo** tema:

```js
const { prestadorTheme } = require("@x-men-evolution/design-tokens/themes");

brand: { ...prestadorTheme.brand, DEFAULT: prestadorTheme.brand.default }
```

`color.brand` carrega a ramp inteira da marca do mode (`50`…`950`) além dos
apelidos semânticos `light`/`default`/`dark` — mesma estrutura da variável
`color/brand/*` no Figma.

Nas telas, a regra é a mesma de cima, uma camada acima:

- **`brand-*`** — a marca do app. `bg-brand-700` sai vermelho no `vrum-mobile` e
  cinza no `vrum-partner`, escrevendo o mesmo código. Prefira em código novo.
- **`primary-*`** — a ramp vermelha de feedback, igual nos dois apps. Use quando
  quiser vermelho *de propósito* (erro, destrutivo), não para "a cor da marca".
