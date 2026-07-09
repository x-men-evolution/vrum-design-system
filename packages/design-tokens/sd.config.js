import StyleDictionary from 'style-dictionary';

// Tokens dimensionais são armazenados como números (consumo direto no React
// Native); no CSS eles precisam do sufixo px. Line-heights unitless (escala
// tipográfica, valores <= 4) e font-weights ficam sem unidade.
StyleDictionary.registerTransform({
  name: 'vrum/size/px',
  type: 'value',
  filter: (token) =>
    typeof token.value === 'number' &&
    token.value !== 0 &&
    !token.path.join('-').includes('font-weight') &&
    !(token.path.includes('line-height') && token.value <= 4),
  transform: (token) => `${token.value}px`
});

// Um token é folha quando tem `value` + `path` (metadados que o Style
// Dictionary injeta); qualquer outro objeto é um nível de agrupamento.
function toPlainObject(node) {
  if (node !== null && typeof node === 'object') {
    if ('value' in node && 'path' in node) return node.value;
    const out = {};
    for (const key of Object.keys(node)) out[key] = toPlainObject(node[key]);
    return out;
  }
  return node;
}

// `text-style/*` viram entradas de `theme.fontSize` no formato de tupla do
// Tailwind: fontSize.titleSmall -> ['14px', { lineHeight, letterSpacing, fontWeight }].
function flattenTextStyles(node, prefix = []) {
  const out = {};
  for (const [key, val] of Object.entries(node)) {
    if (val && typeof val === 'object' && 'font-size' in val) {
      const name = [...prefix, key]
        .join('-')
        .replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
      out[name] = [
        toPlainObject(val['font-size']),
        {
          lineHeight: toPlainObject(val['line-height']),
          letterSpacing: toPlainObject(val['letter-spacing']),
          fontWeight: String(toPlainObject(val['font-weight']))
        }
      ];
    } else if (val && typeof val === 'object') {
      Object.assign(out, flattenTextStyles(val, [...prefix, key]));
    }
  }
  return out;
}

function buildTailwindTheme(dictionary) {
  return {
    colors: toPlainObject(dictionary.tokens.color),
    spacing: toPlainObject(dictionary.tokens.spacing),
    borderRadius: toPlainObject(dictionary.tokens.radius),
    boxShadow: toPlainObject(dictionary.tokens.shadow),
    fontFamily: toPlainObject(dictionary.tokens.font.family),
    fontWeight: toPlainObject(dictionary.tokens.font.weight),
    fontSize: flattenTextStyles(dictionary.tokens['text-style'])
  };
}

const tailwindThemeHeader =
  '/**\n * Do not edit directly, this file was auto-generated.\n * Consumo: theme.extend em tailwind.config (web) e NativeWind (mobile).\n */\n';

StyleDictionary.registerFormat({
  name: 'tailwind/theme',
  format: ({ dictionary }) =>
    `${tailwindThemeHeader}export default ${JSON.stringify(buildTailwindTheme(dictionary), null, 2)};\n`
});

// tailwind.config.js costuma ser CommonJS (Metro/NativeWind carregam via
// require); o pacote é "type": "module", então precisamos de uma saída .cjs
// separada além do theme.js ESM.
StyleDictionary.registerFormat({
  name: 'tailwind/theme-cjs',
  format: ({ dictionary }) =>
    `${tailwindThemeHeader}module.exports = ${JSON.stringify(buildTailwindTheme(dictionary), null, 2)};\n`
});

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['vrum/size/px'],
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: { outputReferences: true }
        }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [
        { destination: 'index.js', format: 'javascript/es6' },
        { destination: 'index.d.ts', format: 'typescript/es6-declarations' }
      ]
    },
    tailwind: {
      transformGroup: 'css',
      transforms: ['vrum/size/px'],
      buildPath: 'dist/tailwind/',
      files: [
        { destination: 'theme.js', format: 'tailwind/theme' },
        { destination: 'theme.cjs', format: 'tailwind/theme-cjs' }
      ]
    }
  }
};
