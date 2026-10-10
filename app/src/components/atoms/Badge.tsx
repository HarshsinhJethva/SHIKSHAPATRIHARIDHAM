import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import AppText from '@components/atoms/AppText';
import { colors, borderRadius } from '@utils/theme';
import { ms, hs, vs } from '@utils/helper/Metrics';

export type BadgeVariant = 'gold' | 'saffron' | 'subtle' | 'outline';

interface BadgeProps {
  label: string | number;
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'gold',
  size = 'md',
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.base, styles[variant], sizeStyles[size], style]}>
      <AppText
        variant="badge"
        style={[
          textVariantStyles[variant],
          sizeTextStyles[size],
          textStyle,
        ]}
      >
        {label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  gold: {
    backgroundColor: colors.goldBadgeBg,
    borderColor: colors.goldBadgeBorder,
  },
  saffron: {
    backgroundColor: 'rgba(217, 83, 30, 0.12)',
    borderColor: 'rgba(217, 83, 30, 0.4)',
  },
  subtle: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.borderGold,
  },
});

const sizeStyles = StyleSheet.create({
  sm: {
    paddingHorizontal: hs(8),
    paddingVertical: vs(3),
    minWidth: ms(20),
  },
  md: {
    paddingHorizontal: hs(10),
    paddingVertical: vs(4),
    minWidth: ms(28),
  },
  lg: {
    paddingHorizontal: hs(14),
    paddingVertical: vs(6),
    minWidth: ms(36),
  },
});

const textVariantStyles = StyleSheet.create({
  gold: {
    color: colors.primaryDark,
  },
  saffron: {
    color: colors.saffron,
  },
  subtle: {
    color: colors.textSecondary,
  },
  outline: {
    color: colors.textGold,
  },
});

const sizeTextStyles = StyleSheet.create({
  sm: {
    fontSize: ms(11),
    lineHeight: Math.round(ms(11) * 1.45),
  },
  md: {
    fontSize: ms(12.5),
    lineHeight: Math.round(ms(12.5) * 1.45),
  },
  lg: {
    fontSize: ms(14),
    lineHeight: Math.round(ms(14) * 1.45),
  },
});

export default Badge;
