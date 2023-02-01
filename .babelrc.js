module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          pages: './src/pages',
          components: './src/components',
          utils: './src/utils',
          handlers: './src/handlers',
          database: './src/database',
          localization: './src/localization',
          styles: './src/styles',
        },
      },
    ],
  ],
};
