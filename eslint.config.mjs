import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.turbo/**']
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks
    },
    rules: {
      // Só as regras clássicas de hooks (rules-of-hooks/exhaustive-deps).
      // O restante do preset "recommended" do react-hooks v7 assume código
      // pronto para o React Compiler (ex.: react-hooks/refs proíbe ler
      // ref.current durante o render), o que quebra o padrão idiomático do
      // Animated do React Native (useRef(new Animated.Value(...)).current).
      // Nenhum pacote daqui usa o React Compiler.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  }
);
