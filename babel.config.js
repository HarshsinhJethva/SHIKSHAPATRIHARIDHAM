module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './app/src/components',
          '@utils': './app/utils',
          '@screens': './app/src/screens',
          '@assets': './app/assets',
        },
      },
    ],
  ],
};
