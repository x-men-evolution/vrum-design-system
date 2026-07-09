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
    !token.path.includes('font-weight') &&
    !(token.path.includes('line-height') && token.value <= 4),
  transform: (token) => `${token.value}px`
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
    }
  }
};
