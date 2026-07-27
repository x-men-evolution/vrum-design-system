---
name: native-ui-component
description: >-
  Add or edit a component in packages/native-ui of the vrum-design-system
  monorepo. Use when asked to create a new native-ui component (e.g. from
  Figma), add a prop/variant to an existing one, or add a new runtime
  dependency to a component.
---

# Adding/editing a native-ui component

`packages/native-ui/src/components/` has one `.tsx` file per component,
following the shape of existing ones (`FilterChip.tsx`, `Text.tsx`,
`SearchInput.tsx`, `Sheet.tsx`). There is no scaffolding tool — everything
below is manual.

## 1. Component file

- One file per component in `src/components/`.
- Colors, radii, spacing, typography: always from
  `@x-men-evolution/design-tokens/native`. Never hardcode hex or magic
  numbers.
- Reuse shared logic in `src/internal/` (`typography.ts`, `useFocusState.ts`,
  `fieldMetrics.ts`, etc.) before writing new helpers — check it exists
  first.
- Props: `type XProps = Omit<PressableProps, 'style' | 'children'> & {...}`
  (or the RN primitive being wrapped), style via `StyleSheet.create` for
  static parts, dynamic style pushed into the array, consumer `style` merged
  last so it can always override.
- Accessibility is not optional: `accessibilityRole`,
  `accessibilityState` (disabled/selected/etc.) as applicable.
- Typography variants set fontFamily/fontSize/fontWeight/lineHeight/
  letterSpacing only — never color. Don't break that convention.

## 2. Barrel export (the step most often forgotten)

There is **no auto-discovery**. A new component is invisible to consumers
until you manually add it to `packages/native-ui/src/index.ts`:

```ts
export { MyComponent } from './components/MyComponent';
export type { MyComponentProps } from './components/MyComponent';
```

Both lines are required — exporting the component without its prop type (or
vice versa) is the most common miss.

## 3. New runtime dependency? Decide peerDependencies vs optional

If the component needs a library the consumer app must supply (like `Sheet`
needing `@gorhom/bottom-sheet`, `Select` needing
`@react-native-picker/picker`):

- Add it to `peerDependencies` **and** matching `devDependencies` (for local
  build/typecheck) in `packages/native-ui/package.json`.
- Mark it `optional: true` in `peerDependenciesMeta` **only if** no export
  reachable from the main barrel (`src/index.ts`) imports it at module
  scope. If any core/always-imported component (e.g. `Text`) pulls it in
  transitively, it must be a required peer — making it optional would break
  every consumer that doesn't have it installed, even if they never touch
  the feature. (This is exactly why `nativewind` is required, not optional
  — `Text` is re-exported from the barrel and other components import
  `Text` directly.)
- Add the package to `external` in `tsup.config.ts` and to jest's
  `transformIgnorePatterns` if it ships non-CJS output.
- If installing it locally for typegen/build hits a peer-dep conflict
  (reanimated × react-native is a known one), use
  `npm install --legacy-peer-deps`.

## 4. Tests (optional but structured when present)

`src/components/__tests__/` exists for some components (`Button`,
`Input`, `Link`, `Switch`) but not all — it's not enforced per component.
Add a test there if the change involves new logic/variants worth locking
down; skip it for pure visual/token tweaks.

## 5. What not to do when finished

Per this repo's `CLAUDE.md`: don't run tests, lint, or a full build as a
routine verification step after finishing — typecheck the touched workspace
only (`npm run typecheck --workspace=@x-men-evolution/native-ui`), do the
best implementation against the Figma spec, and stop there. The user runs
the rest on their own schedule.

## 6. Versioning / releasing

Once the component change is ready to ship, use the `pr-semver` skill for
branching, the version bump (lockstep across design-tokens/native-ui/web-ui),
and PR creation.
