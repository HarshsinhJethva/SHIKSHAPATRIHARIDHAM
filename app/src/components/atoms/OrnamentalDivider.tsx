import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import Images from '@utils/Images/Images';
import { colors } from '@utils/theme';
import { hs, vs, ms } from '@utils/helper/Metrics';

interface OrnamentalDividerProps {
  variant?: 'light' | 'center' | 'last' | 'simple';
  style?: ViewStyle;
}

const OrnamentalDivider: React.FC<OrnamentalDividerProps> = ({
  variant = 'light',
  style,
}) => {
  if (variant === 'simple') {
    return (
      <View style={[styles.simpleContainer, style]}>
        <View style={styles.line} />
        <View style={styles.diamond} />
        <View style={styles.line} />
      </View>
    );
  }

  const getImageSource = () => {
    switch (variant) {
      case 'center':
        return Images.D_CENTER;
      case 'last':
        return Images.D_LAST;
      case 'light':
      default:
        return Images.DIVIDERLIGHT;
    }
  };

  return (
    <View style={[styles.imageContainer, style]}>
      <Image
        source={getImageSource()}
        resizeMode="contain"
        style={styles[variant]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vs(8),
  },
  light: {
    width: hs(160),
    height: vs(18),
    opacity: 0.85,
  },
  center: {
    width: hs(180),
    height: vs(22),
    opacity: 0.9,
  },
  last: {
    width: hs(210),
    height: vs(26),
    opacity: 0.95,
  },
  simpleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vs(10),
    paddingHorizontal: hs(20),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderGold,
    opacity: 0.5,
  },
  diamond: {
    width: ms(8),
    height: ms(8),
    backgroundColor: colors.primary,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: hs(10),
    opacity: 0.8,
  },
});

export default OrnamentalDivider;
