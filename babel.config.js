module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.ios.ts',
          '.android.ts',
          '.ios.tsx',
          '.android.tsx',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '@components': './app/src/components',
          '@atoms': './app/src/components/atoms',
          '@molecules': './app/src/components/molecules',
          '@organisms': './app/src/components/organisms',
          '@templates': './app/src/components/templates',
          '@utils': './app/utils',
          '@screens': './app/src/screens',
          '@navigator': './app/src/navigator',
          '@assets': './app/assets',
          '@theme': './app/src/theme',
        },
      },
    ],
  ],
};
