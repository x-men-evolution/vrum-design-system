import { writeFile } from 'node:fs/promises';
import StyleDictionary from 'style-dictionary';
import { MODES, makeConfig, toTsType } from './sd.config.js';

const THEMES_DIR = new URL('./dist/themes/', import.meta.url);

const header =
  '/**\n * Do not edit directly, this file was auto-generated.\n * Tema semântico por mode — consumido via VrumThemeProvider (native-ui).\n */\n';

for (const mode of MODES) {
  const sd = new StyleDictionary(makeConfig(mode));
  await sd.buildAllPlatforms();
}

// Os módulos por mode acabaram de ser escritos: importá-los (em vez de
// reconstruir o objeto aqui) garante que o barrel e o .d.ts descrevam
// exatamente o que foi para o disco.
const themes = Object.fromEntries(
  await Promise.all(
    MODES.map(async (mode) => [mode, (await import(new URL(`${mode}.js`, THEMES_DIR))).default])
  )
);

const camel = (mode) => `${mode.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Theme`;

const imports = MODES.map((mode) => `import ${camel(mode)} from './${mode}.js';`).join('\n');
const named = MODES.map(camel).join(', ');
const entries = MODES.map((mode) => `  ${JSON.stringify(mode)}: ${camel(mode)}`).join(',\n');

await writeFile(
  new URL('index.js', THEMES_DIR),
  `${header}${imports}\n\nexport { ${named} };\n\nexport const themes = {\n${entries}\n};\n`
);

const requires = MODES.map((mode) => `const ${camel(mode)} = require('./${mode}.cjs');`).join('\n');

await writeFile(
  new URL('index.cjs', THEMES_DIR),
  `${header}${requires}\n\nmodule.exports = {\n  ${named},\n  themes: {\n  ${entries}\n  }\n};\n`
);

// Todos os modes compartilham a mesma forma — o mode só troca valores. Tipar
// a partir do default e reusar para os demais é o que faz um token presente
// num mode e ausente noutro virar erro de compilação.
await writeFile(
  new URL('index.d.ts', THEMES_DIR),
  `${header}export type VrumTheme = ${toTsType(themes.default)};\n\n` +
    `export type VrumThemeName = ${MODES.map((m) => JSON.stringify(m)).join(' | ')};\n\n` +
    MODES.map((mode) => `export declare const ${camel(mode)}: VrumTheme;`).join('\n') +
    `\n\nexport declare const themes: Record<VrumThemeName, VrumTheme>;\n`
);

console.log(`themes: ${MODES.join(', ')}`);
