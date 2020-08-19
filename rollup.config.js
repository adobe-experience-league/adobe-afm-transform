const {terser} = require('rollup-plugin-terser');

export default [
  {
    input: './src/afm.js',
    output: [
      {
        file: 'dist/afm.cjs.js',
        format: 'cjs',
        exports: 'default'
      },
      {
        file: 'dist/afm.esm.js',
        format: 'es',
        compact: true,
        plugins: [terser()]
      },
      {
        file: 'dist/afm.js',
        name: 'afm',
        format: 'umd',
        compact: true,
        plugins: [terser()]
      }
    ]
  }
];
