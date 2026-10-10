import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet, ViewStyle } from 'react-native';
import AppText from '@components/atoms/AppText';
import Badge from '@components/atoms/Badge';
import Images from '@utils/Images/Images';
import { colors, borderRadius, shadows } from '@utils/theme';
import { ms, hs, vs } from '@utils/helper/Metrics';

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious: boolean;
  disableNext: boolean;
  currentIndex?: number;
  totalCount?: number;
  style?: ViewStyle;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPrevious,
  onNext,
  disablePrevious,
  disableNext,
  currentIndex,
  totalCount,
  style,
}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.dockBar}>
        {/* Previous Button */}
        <TouchableOpacity
          onPress={onPrevious}
          disabled={disablePrevious}
          activeOpacity={0.7}
          style={[
            styles.navButton,
            disablePrevious && styles.disabledButton,
          ]}
          accessibilityLabel="Previous Shloka"
        >
          <Image
            source={Images.LEFT}
            resizeMode="contain"
            style={[
              styles.icon,
              { tintColor: disablePrevious ? colors.textDisabled : colors.primaryDark },
            ]}
          />
          <AppText
            variant="body"
            weight="semibold"
            color={disablePrevious ? colors.textDisabled : colors.primaryDark}
            style={styles.buttonLabel}
          >
            પાછળ
          </AppText>
        </TouchableOpacity>

        {/* Center Progress Badge */}
        {currentIndex !== undefined && totalCount !== undefined && (
          <View style={styles.centerProgress}>
            <Badge
              label={`${currentIndex + 1} / ${totalCount}`}
              variant="gold"
              size="md"
              style={styles.progressBadge}
            />
          </View>
        )}

        {/* Next Button */}
        <TouchableOpacity
          onPress={onNext}
          disabled={disableNext}
          activeOpacity={0.7}
          style={[
            styles.navButton,
            disableNext && styles.disabledButton,
          ]}
          accessibilityLabel="Next Shloka"
        >
          <AppText
            variant="body"
            weight="semibold"
            color={disableNext ? colors.textDisabled : colors.primaryDark}
            style={styles.buttonLabel}
          >
            આગળ
          </AppText>
          <Image
            source={Images.RIGHT}
            resizeMode="contain"
            style={[
              styles.icon,
              { tintColor: disableNext ? colors.textDisabled : colors.primaryDark },
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: vs(8),
    paddingHorizontal: hs(4),
  },
  dockBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: vs(8),
    paddingHorizontal: hs(16),
    backgroundColor: colors.surfaceGold,
    borderColor: colors.borderGold,
    borderWidth: 1.2,
    borderRadius: borderRadius.round,
    ...shadows.sm,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vs(6),
    paddingHorizontal: hs(10),
    borderRadius: borderRadius.round,
  },
  disabledButton: {
    opacity: 0.45,
  },
  buttonLabel: {
    fontSize: ms(15),
    marginHorizontal: hs(4),
  },
  icon: {
    width: ms(16),
    height: ms(16),
  },
  centerProgress: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBadge: {
    backgroundColor: colors.goldBadgeBg,
    borderColor: colors.goldBadgeBorder,
    paddingHorizontal: hs(12),
  },
});

export default NavigationControls;
