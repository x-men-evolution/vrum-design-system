module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@gorhom/.*|react-native-.*|lucide-react-native|nativewind|react-native-css-interop)/)'
  ],
  moduleNameMapper: {
    // `lucide-react-native`'s package.json lists the `react-native` export
    // condition before `require`, and the RN Jest preset registers both —
    // exports resolves in the target package's declared order, so Jest picks
    // the ESM (.mjs) build and fails to parse it before Babel ever runs.
    // Metro doesn't hit this: it resolves the same condition but transforms
    // ESM through Babel first.
    //
    // Force Jest onto the package's own CJS build via an absolute path — a
    // bare specifier here (e.g. 'lucide-react-native/dist/cjs/...') would
    // still go through the package's `exports` map, which only declares
    // `.`, so any deep subpath is rejected as unresolvable even though the
    // file exists. `require.resolve` runs in this file's own CJS context, so
    // it hits the `require` condition directly and sidesteps the mapper.
    '^lucide-react-native$': require.resolve('lucide-react-native')
  }
};
