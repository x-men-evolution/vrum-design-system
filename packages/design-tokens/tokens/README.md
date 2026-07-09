# Tokens (fonte)

Os arquivos JSON desta pasta são a fonte de verdade dos tokens, extraídos das
**variáveis e estilos** do Figma (Vrum — Design System), não dos componentes.

Estrutura sugerida:

- `color.json` — paleta e cores semânticas
- `typography.json` — famílias, tamanhos, pesos, line-heights
- `spacing.json` — escala de espaçamento
- `radius.json` — border radius
- `elevation.json` — sombras

Formato: Style Dictionary (categoria → item → `{ "value": ... }`).
