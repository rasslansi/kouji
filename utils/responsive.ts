import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions based on standard iPhone X dimensions (for consistent look)
const baseWidth = 375;
const baseHeight = 812;

// Scaling factors
const widthScale = SCREEN_WIDTH / baseWidth;
const heightScale = SCREEN_HEIGHT / baseHeight;

// Consider device aspect ratio for balanced scaling across devices
const deviceAspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
const baseAspectRatio = baseHeight / baseWidth;
const aspectRatioFactor = deviceAspectRatio / baseAspectRatio;

// Base font size for the app (similar to root font size in web)
export const BASE_FONT_SIZE = 16;

// Use height for vertical spacing, width for horizontal
export const scale = (size: number): number => {
  return Math.round(size * widthScale);
};

export const verticalScale = (size: number): number => {
  return Math.round(size * heightScale);
};

// Moderate scale is more balanced for sizes that should change but not as dramatically
// For example, font sizes or button heights
export const moderateScale = (size: number, factor = 0.5): number => {
  return Math.round(size + (scale(size) - size) * factor);
};

// Font scaling with minimum size limits for readability
export const fontScale = (size: number): number => {
  const scaledSize = moderateScale(size);
  // Ensure minimum readable font size
  return Math.max(size * 0.8, scaledSize);
};

// Rem-like function that's based on root font size (for component layout)
export const rem = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * BASE_FONT_SIZE * widthScale);
};

// Em-like function that's based on a provided context size (for inner component spacing)
export const em = (size: number, context = BASE_FONT_SIZE): number => {
  return PixelRatio.roundToNearestPixel(size * context * widthScale / BASE_FONT_SIZE);
};

// Spacing system (following 4-point grid often used in design systems)
export const spacing = {
  xs: rem(0.25), // 4px at base font size
  sm: rem(0.5),  // 8px at base font size
  md: rem(1),    // 16px at base font size
  lg: rem(1.5),  // 24px at base font size
  xl: rem(2),    // 32px at base font size
  xxl: rem(3),   // 48px at base font size
};

// Typography (following common type scale ratios)
export const typography = {
  caption: fontScale(12),
  body: fontScale(16),
  subheader: fontScale(18),
  title: fontScale(20),
  headline: fontScale(24),
  display: fontScale(34),
};

// Calculate device-specific dimensions based on screen size
export const getResponsiveDimension = (dimension: number): number => {
  return PixelRatio.roundToNearestPixel(dimension * widthScale);
};

// For components that need to know about screen dimensions
export const screenDimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmallDevice: SCREEN_WIDTH < 375,
  isLargeDevice: SCREEN_WIDTH >= 768,
  isLandscape: SCREEN_WIDTH > SCREEN_HEIGHT,
}; 