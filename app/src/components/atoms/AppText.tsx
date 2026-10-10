import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { colors, typography } from '@utils/theme';

export type TextVariant =
  | 'hero'
  | 'h1'
  | 'h2'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'bodyLarge'
  | 'sanskrit'
  | 'caption'
  | 'badge'
  | 'shlokaNumber';

export interface AppTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
  weight?: keyof typeof typography.weights;
  center?: boolean;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color,
  weight,
  center = false,
  children,
  style,
  ...props
}) => {
  const variantStyle = variantStyles[variant] || variantStyles.body;
  const flatStyle = StyleSheet.flatten(style);

  // If a custom fontSize is specified without an adequate lineHeight,
  // dynamically compute lineHeight to prevent Indic/Gujarati matra clipping
  let dynamicLineHeight: TextStyle | undefined;
  if (flatStyle && flatStyle.fontSize) {
    const flatFontSize = flatStyle.fontSize;
    if (
      flatStyle.lineHeight === undefined ||
      flatStyle.lineHeight < flatFontSize * 1.3
    ) {
      dynamicLineHeight = {
        lineHeight: Math.round(flatFontSize * 1.55),
      };
    }
  }

  return (
    <Text
      style={[
        variantStyle,
        color ? { color } : undefined,
        weight ? { fontWeight: typography.weights[weight] } : undefined,
        center ? styles.center : undefined,
        style,
        dynamicLineHeight,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const variantStyles = StyleSheet.create({
  hero: {
    fontSize: typography.sizes.hero,
    fontWeight: typography.weights.heavy,
    color: colors.textPrimary,
    lineHeight: Math.round(typography.sizes.hero * 1.45),
  },
  h1: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.primaryDark,
    lineHeight: Math.round(typography.sizes.xxl * 1.45),
  },
  h2: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primaryDark,
    lineHeight: Math.round(typography.sizes.xl * 1.45),
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    lineHeight: Math.round(typography.sizes.lg * 1.45),
  },
  subtitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
    lineHeight: Math.round(typography.sizes.md * 1.5),
  },
  body: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
    color: colors.textPrimary,
    lineHeight: Math.round(typography.sizes.base * 1.55),
  },
  bodyLarge: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.regular,
    color: colors.textPrimary,
    lineHeight: Math.round(typography.sizes.md * 1.55),
  },
  sanskrit: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    lineHeight: Math.round(typography.sizes.lg * 1.65),
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  caption: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textMuted,
    lineHeight: Math.round(typography.sizes.sm * 1.5),
  },
  badge: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.goldBadgeText,
    letterSpacing: 0.5,
  },
  shlokaNumber: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.primaryDark,
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
});

export default AppText;
