import React from 'react';
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleSheet,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { colors, shadows } from '@utils/theme';
import { ms } from '@utils/helper/Metrics';

export type IconButtonVariant = 'gold' | 'glass' | 'filled' | 'ghost';

interface IconButtonProps {
  icon?: ImageSourcePropType;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: IconButtonVariant;
  size?: number;
  iconSize?: number;
  tintColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
  iconStyle?: ImageStyle;
  accessibilityLabel?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  children,
  onPress,
  variant = 'glass',
  size = 40,
  iconSize = 20,
  tintColor = colors.primaryDark,
  disabled = false,
  style,
  iconStyle,
  accessibilityLabel,
}) => {
  const scaledSize = ms(size);
  const scaledIconSize = ms(iconSize);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.65}
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.base,
        styles[variant],
        {
          width: scaledSize,
          height: scaledSize,
          borderRadius: scaledSize / 2,
        },
        disabled ? styles.disabled : null,
        style,
      ]}
    >
      {icon ? (
        <Image
          source={icon}
          resizeMode="contain"
          style={[
            {
              width: scaledIconSize,
              height: scaledIconSize,
              tintColor: disabled ? colors.textDisabled : tintColor,
            },
            iconStyle,
          ]}
        />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glass: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  gold: {
    backgroundColor: colors.surfaceGold,
    borderWidth: 1.2,
    borderColor: colors.borderGold,
    ...shadows.sm,
  },
  filled: {
    backgroundColor: colors.primary,
    ...shadows.md,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.4,
  },
});

export default IconButton;
