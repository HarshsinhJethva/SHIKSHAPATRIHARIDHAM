import React from 'react';
import { View, StyleSheet } from 'react-native';
import MarqueeText from 'react-native-marquee';
import AppText from '@components/atoms/AppText';
import IconButton from '@components/atoms/IconButton';
import Images from '@utils/Images/Images';
import { colors } from '@utils/theme';
import { hs, ms } from '@utils/helper/Metrics';

interface HeaderWithBackProps {
  title: string;
  subtitle?: string;
  onBackPress: () => void;
  rightAction?: React.ReactNode;
  useMarquee?: boolean;
}

const HeaderWithBack: React.FC<HeaderWithBackProps> = ({
  title,
  subtitle,
  onBackPress,
  rightAction,
  useMarquee = true,
}) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon={Images.BACK}
        onPress={onBackPress}
        variant="glass"
        size={36}
        iconSize={16}
        tintColor={colors.primaryDark}
        style={styles.backButton}
        accessibilityLabel="Go Back"
      />

      <View style={styles.titleWrapper}>
        {useMarquee ? (
          <MarqueeText
            style={styles.marqueeTitle}
            speed={0.45}
            marqueeOnStart={true}
            loop={true}
            delay={1200}
          >
            {title}
          </MarqueeText>
        ) : (
          <AppText
            variant="title"
            weight="bold"
            numberOfLines={1}
            style={styles.staticTitle}
          >
            {title}
          </AppText>
        )}
        {subtitle ? (
          <AppText variant="caption" numberOfLines={1} style={styles.subtitle}>
            {subtitle}
          </AppText>
        ) : null}
      </View>

      {rightAction ? (
        <View style={styles.rightActionContainer}>{rightAction}</View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton: {
    marginRight: hs(10),
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: hs(6),
  },
  marqueeTitle: {
    fontSize: ms(17),
    fontWeight: '700',
    color: colors.primaryDark,
    lineHeight: Math.round(ms(17) * 1.45),
  },
  staticTitle: {
    fontSize: ms(17),
    fontWeight: '700',
    color: colors.primaryDark,
    lineHeight: Math.round(ms(17) * 1.45),
  },
  subtitle: {
    fontSize: ms(12),
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: Math.round(ms(12) * 1.45),
  },
  rightActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HeaderWithBack;
