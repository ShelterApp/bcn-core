import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import async from 'rollup-plugin-async';
import sourceMaps from 'rollup-plugin-sourcemaps';

import pkg from './package.json';

const common = {
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true, rollupCommonJSResolveHack: true }),
    async(),
    sourceMaps(),
  ],
};

export default [
  // models
  {
    ...common,
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  // apis
  {
    ...common,
    input: 'src/apis/index.ts',
    output: [
      {
        dir: 'dist/apis',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  // utils
  {
    ...common,
    input: 'src/utils/db.ts',
    output: [
      {
        dir: 'dist/utils',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: 'src/utils/error.ts',
    output: [
      {
        dir: 'dist/utils',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: 'src/utils/error-handler.ts',
    output: [
      {
        dir: 'dist/utils',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: 'src/utils/express.ts',
    output: [
      {
        dir: 'dist/utils',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: 'src/utils/logger.ts',
    output: [
      {
        dir: 'dist/utils',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: 'src/utils/mongoose.ts',
    output: [
      {
        dir: 'dist/utils',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: 'src/utils/services.ts',
    output: [
      {
        dir: 'dist/utils',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: 'src/utils/index.ts',
    output: [
      {
        dir: 'dist/utils',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
];
