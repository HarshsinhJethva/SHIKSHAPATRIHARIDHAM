import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AppText from '@components/atoms/AppText';
import Images from '@utils/Images/Images';
import { colors, borderRadius, shadows } from '@utils/theme';
import { hs, ms } from '@utils/helper/Metrics';

interface FontSizeControlsProps {
  onIncrease: () => void;
  onDecrease: () => void;
  currentSize?: number;
}

const FontSizeControls: React.FC<FontSizeControlsProps> = ({
  onIncrease,
  onDecrease,
  currentSize,
}) => {
  return (
    <View style={styles.pillContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={onDecrease}
        activeOpacity={0.65}
        accessibilityLabel="Decrease Font Size"
      >
        <Image
          source={Images.MINUS}
          resizeMode="contain"
          style={styles.icon}
        />
      </TouchableOpacity>

      <View style={styles.indicatorContainer}>
        <AppText variant="caption" weight="bold" color={colors.primaryDark} style={styles.indicatorText}>
          {currentSize ? `${currentSize}` : '|'}
        </AppText>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onIncrease}
        activeOpacity={0.65}
        accessibilityLabel="Increase Font Size"
      >
        <Image
          source={Images.PLUS}
          resizeMode="contain"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ms(36),
    backgroundColor: colors.surface,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: hs(4),
    ...shadows.sm,
  },
  button: {
    paddingHorizontal: hs(8),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: ms(12),
    height: ms(12),
    tintColor: colors.primaryDark,
  },
  indicatorContainer: {
    paddingHorizontal: hs(4),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: ms(18),
  },
  indicatorText: {
    fontSize: ms(12),
    color: colors.primaryDark,
  },
});

export default FontSizeControls;
