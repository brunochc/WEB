const isTest = String(process.env.NODE_ENV) === 'tests'

module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
          modules: 'commonjs',
        },
      ],
    ],
  };