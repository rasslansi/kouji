// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Available options: https://facebook.github.io/metro/docs/configuration
  isCSSEnabled: true, // Enable CSS support for NativeWind
});

// Enable CSS transforms
config.transformer.babelTransformerPath = require.resolve('react-native-css-transformer');

// Add CSS extensions to assetExts
config.resolver.assetExts.push('css');

// Add special resolver for NativeWind/Tailwind
config.resolver.sourceExts = [...config.resolver.sourceExts, 'css', 'mjs'];

module.exports = config; 