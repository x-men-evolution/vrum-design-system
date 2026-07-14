---
name: pr-semver
description: >-
  Open pull requests and manage package versions (SemVer) for the
  vrum-design-system monorepo (design-tokens, native-ui, web-ui). Use when
  asked to create/open a PR in this repo, bump a package version, prepare a
  release, or tag/publish packages.
---

# PR & SemVer process for vrum-design-system

This repo is an npm workspaces monorepo (`packages/design-tokens`,
`packages/native-ui`, `packages/web-ui`) published to GitHub Packages under
`@x-men-evolution/*`. It has one hard constraint that drives everything
below: **the three packages are versioned in lockstep**, because
`native-ui` and `web-ui` depend on an **exact, non-caret** version of
`design-tokens` (e.g. `"@x-men-evolution/design-tokens": "0.5.0"`, not
`^0.5.0`). A version mismatch between them breaks installs.

## Hard rules

- Never commit or push directly to `main`. Always work on a branch and open
  a PR, even for the version-bump itself — do not repeat the repo's older
  pattern of pushing a bare `chore: bump version` commit straight to `main`
  after merging (this produced at least one accidental double-bump to the
  same version in this repo's history).
- Never create or push a `v*` git tag (which triggers
  `.github/workflows/publish.yml` and publishes to the registry) without
  the user explicitly confirming — tagging is a real release, not a normal
  git operation.
- Always bump all three `packages/*/package.json` `"version"` fields
  together to the same new value, even if only one package's code changed.
- Whenever `design-tokens`' version changes, update the exact-pinned
  `"@x-men-evolution/design-tokens"` dependency entries in
  `packages/native-ui/package.json` and `packages/web-ui/package.json` to
  match.

## 1. Branch and commit

- Branch names: `feat/...`, `fix/...`, or `chore/...`, matching the change
  type (mirrors existing branches like `feat/native-ui-components`).
- Commit messages follow Conventional Commits already used in this repo's
  history: `type(scope): summary`, e.g.
  `feat(native-ui): add OptionButton, CarVersionListItem`. Include the
  version bump (see below) as part of the same PR/commit rather than a
  follow-up direct push.
- Stage only the files that changed for this task — never `git add -A`.

## 2. Decide the version bump

The repo is pre-1.0 (`0.x.y`), so per SemVer §4 the public API is not yet
considered stable and breaking changes bump **MINOR**, not MAJOR — MAJOR
(`1.0.0`) is reserved for the deliberate stability milestone, not for
day-to-day breaking changes.

| Change                                                        | Bump  |
|-----------------------------------------------------------------|-------|
| New component, new prop, new variant (additive, backward-compatible) | MINOR (`0.X.0`) |
| Breaking change (removed/renamed export or prop, changed default behavior) | MINOR (`0.X.0`) — same as above while pre-1.0 |
| Bug fix, visual/token correction, no API change                 | PATCH (`0.0.X`) |
| Deliberate stability commitment                                  | MAJOR (`1.0.0`) — only when the user explicitly asks for it |

Look at `git log --oneline -10` and the last version in
`packages/design-tokens/package.json` to know the current baseline before
picking the next number.

Update, in the same commit:
- `"version"` in all three `packages/*/package.json`
- the `@x-men-evolution/design-tokens` dependency pin in `native-ui` and
  `web-ui` if `design-tokens` changed

## 3. Build, push, open the PR

1. `npm run build` at the repo root (turbo) — must pass clean before opening
   the PR.
2. Push the branch: `git push -u origin <branch>`.
3. `gh pr create` with a body covering **Summary** (what changed + why) and
   a **Test plan** checklist, following the existing PR style in this repo
   (see PRs #3/#4). Note the version bump explicitly in the summary, e.g.
   "Bumps design-tokens/native-ui/web-ui to 0.6.0 (minor: new components)".
4. Report the PR URL back to the user.

If a PR already exists for the branch, push new commits and report the
existing URL instead of opening a duplicate.

## 4. Releasing (separate step, requires explicit confirmation)

Publishing only happens by pushing a `v*` tag, which triggers
`.github/workflows/publish.yml` to run `npm publish --workspace` for all
three packages. After the version-bump PR is merged to `main`:

1. Ask the user to confirm the exact version before tagging.
2. `git tag vX.Y.Z <merge-commit-sha>` and `git push origin vX.Y.Z`.
3. Point the user at the Actions run to verify the publish succeeded.

Do not perform step 2 without an explicit go-ahead in the same
conversation — a prior approval for a different PR/tag does not carry over.
