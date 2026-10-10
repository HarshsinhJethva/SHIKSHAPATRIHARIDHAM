import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { colors, borderRadius, shadows } from '@utils/theme';

interface CardSurfaceProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: 'default' | 'gold' | 'elevated' | 'glass' | 'outlined';
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
}

const CardSurface: React.FC<CardSurfaceProps> = ({
  children,
  onPress,
  variant = 'default',
  style,
  activeOpacity = 0.72,
}) => {
  const containerStyle = [styles.base, styles[variant], style];

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={activeOpacity}
        style={containerStyle}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.md,
  },
  default: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.sm,
  },
  gold: {
    backgroundColor: colors.surfaceGold,
    borderWidth: 1,
    borderColor: colors.borderGold,
    ...shadows.sm,
  },
  elevated: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.md,
  },
  glass: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
});

export default CardSurface;
