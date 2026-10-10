import { Platform } from 'react-native';

export const colors = {
  // Brand Gold & Saffron (Sacred Spiritual Palette)
  primary: '#8C6219',          // Deep royal gold
  primaryDark: '#5E3F0A',      // Antique bronze brown
  primaryLight: '#C59A45',     // Bright golden aura
  primaryGlow: 'rgba(212, 175, 55, 0.25)',

  // Sacred Saffron & Vermilion Accents
  saffron: '#D9531E',          // Sacred saffron
  saffronLight: '#FF9800',     // Golden orange
  kumkum: '#B71C1C',           // Sacred red
  vermilion: '#C62828',

  // Backgrounds & Surfaces (Solid, Clean & Crisp for Android & iOS)
  background: '#FDFBF7',       // Warm spiritual cream
  surface: '#FFFFFF',          // Clean crisp card surface
  surfaceElevated: '#FFFFFF',
  surfaceGold: '#FFFDF9',      // Clean warm gold-tinted paper
  surfaceHighlight: '#FFF8E7', // Highlight card surface

  // Borders & Dividers (Clean & Delicate)
  borderGold: '#DECBA5',
  borderLight: '#EFE6D5',
  borderActive: '#A17F45',
  divider: '#E8DCBF',

  // Text Colors
  textPrimary: '#3D2806',      // Deep antique brown for highest contrast readability
  textSecondary: '#6B4E1B',    // Medium warm brown
  textMuted: '#967C52',        // Subdued golden brown
  textGold: '#8C6219',         // Royal gold accent text
  textLight: '#FAF5ED',        // Inverted text
  textDisabled: '#C8B89E',

  // Status & Utility
  goldBadgeBg: '#F7EED9',
  goldBadgeBorder: '#DECBA5',
  goldBadgeText: '#664614',

  // Overlay & Card
  cardBackdrop: '#FFFDF9',
  cardBorder: '#EADECA',
  cardShadow: '#5E3F0A',
};

export const shadows = {
  sm: Platform.select({
    ios: {
      shadowColor: '#5E3F0A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
    },
    android: {
      elevation: 0, // Avoid Android muddy shadow clipping artifact
    },
  }) || {},
  md: Platform.select({
    ios: {
      shadowColor: '#5E3F0A',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
    },
    android: {
      elevation: 1,
    },
  }) || {},
  lg: Platform.select({
    ios: {
      shadowColor: '#5E3F0A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    android: {
      elevation: 2,
    },
  }) || {},
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  round: 9999,
};
