---
name: release
description: Abrir PR, decidir a versão (SemVer) e publicar os pacotes do vrum-design-system (design-tokens, native-ui, web-ui). Use para abrir PR neste repo, subir versão, gerar tag ou publicar, e para atualizar a versão nos apps depois.
---

# PR, versão e publicação

Monorepo npm (`packages/design-tokens`, `native-ui`, `web-ui`) publicado no GitHub Packages como `@x-men-evolution/*`. **Os três sobem juntos (lockstep)**, porque `native-ui` e `web-ui` dependem da versão **exata** de `design-tokens` (`"0.17.1"`, sem `^`).

## Regras fixas
- Nunca commitar direto na `main`: branch (`feat/`, `fix/`, `chore/`) e PR, inclusive para o bump.
- Commits em Conventional Commits: `feat(native-ui): …`. `git add` só dos arquivos da tarefa.
- O bump vai no mesmo PR: `"version"` dos três `packages/*/package.json` e o pin de `@x-men-evolution/design-tokens` em `native-ui` e `web-ui`.

## Versão (pré-1.0)
| Mudança | Bump |
|---|---|
| Componente, prop ou variante nova; ou mudança que quebra API | MINOR (`0.X.0`) |
| Correção, ajuste visual ou de token, sem mudar API | PATCH (`0.0.X`) |
| Compromisso de estabilidade | MAJOR (`1.0.0`), só a pedido |

Mudança só em documentação ou em `.claude/` não gera versão nem tag.

## Fluxo (autonomia dada pelo usuário: não perguntar a cada vez)
1. Push da branch e `gh pr create` com resumo (o quê e por quê, incluindo a versão) e plano de teste.
2. Com o CI verde (`ci.yml`: build, lint, typecheck, test), `gh pr merge --merge`.
3. Tag no commit de merge e push: `git tag vX.Y.Z <sha> && git push origin vX.Y.Z`. O `publish.yml` publica os três pacotes.
4. Atualizar a dependência nos apps que precisam da mudança (`corepack yarn add @x-men-evolution/native-ui@X.Y.Z @x-men-evolution/design-tokens@X.Y.Z`, com o `GITHUB_TOKEN` do `.env` do app), seguindo a política de PR de cada app.

Parar e perguntar se o CI falhar, se a mudança for arriscada ou ambígua, ou se o publish falhar. 403 no registry: ler o corpo da resposta antes de suspeitar do token.
