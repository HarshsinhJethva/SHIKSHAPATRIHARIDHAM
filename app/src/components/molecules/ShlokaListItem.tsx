import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import AppText from '@components/atoms/AppText';
import CardSurface from '@components/atoms/CardSurface';
import AnimatableWrapper from '@components/atoms/AnimatableWrapper';
import { colors, borderRadius } from '@utils/theme';
import { hs, vs, ms } from '@utils/helper/Metrics';

interface ShlokaListItemProps {
  item: {
    id: number | string;
    gujSanskrit?: string;
    gujarati?: string;
    sanskrit?: string;
  };
  fontSize: number;
  onPress: () => void;
  index: number;
  style?: ViewStyle;
}

const ShlokaListItem: React.FC<ShlokaListItemProps> = ({
  item,
  fontSize,
  onPress,
  index,
  style,
}) => {
  const primaryText = item.gujSanskrit || item.sanskrit || item.gujarati || '';
  const secondaryText = item.gujarati && item.gujSanskrit ? item.gujarati : '';

  const primaryFontSize = Math.max(fontSize, ms(14));
  const secondaryFontSize = Math.max(fontSize - 2, ms(12));
  const primaryLineHeight = Math.round(primaryFontSize * 1.55);
  const secondaryLineHeight = Math.round(secondaryFontSize * 1.5);

  const itemContent = (
    <CardSurface
      onPress={onPress}
      variant="gold"
      style={styles.card}
      activeOpacity={0.72}
    >
      <View style={styles.badgeContainer}>
        <View style={styles.idCircle}>
          <AppText
            variant="caption"
            weight="bold"
            color={colors.primaryDark}
            style={styles.idText}
          >
            {item.id}
          </AppText>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <AppText
          numberOfLines={1}
          style={[
            styles.primaryText,
            {
              fontSize: primaryFontSize,
              lineHeight: primaryLineHeight,
            },
          ]}
        >
          {primaryText}
        </AppText>
        {secondaryText ? (
          <AppText
            numberOfLines={1}
            style={[
              styles.secondaryText,
              {
                fontSize: secondaryFontSize,
                lineHeight: secondaryLineHeight,
              },
            ]}
          >
            {secondaryText}
          </AppText>
        ) : null}
      </View>

      <View style={styles.chevronContainer}>
        <AppText style={styles.chevron}>›</AppText>
      </View>
    </CardSurface>
  );

  if (index < 10) {
    return (
      <AnimatableWrapper
        animation="fadeInUp"
        duration={300}
        delay={index * 25}
        useNativeDriver={true}
        style={[styles.wrapper, style]}
      >
        {itemContent}
      </AnimatableWrapper>
    );
  }

  return <View style={[styles.wrapper, style]}>{itemContent}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: vs(4),
    marginHorizontal: hs(2),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vs(10),
    paddingHorizontal: hs(12),
    backgroundColor: colors.surfaceGold,
    borderColor: colors.borderLight,
    borderWidth: 1,
    borderRadius: borderRadius.md,
  },
  badgeContainer: {
    marginRight: hs(10),
  },
  idCircle: {
    width: ms(32),
    height: ms(32),
    borderRadius: ms(16),
    backgroundColor: colors.goldBadgeBg,
    borderWidth: 1.2,
    borderColor: colors.goldBadgeBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  idText: {
    fontSize: ms(13),
    color: colors.primaryDark,
    lineHeight: ms(16),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: hs(6),
    paddingVertical: vs(2),
  },
  primaryText: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  secondaryText: {
    color: colors.textMuted,
    marginTop: vs(2),
  },
  chevronContainer: {
    paddingLeft: hs(4),
  },
  chevron: {
    fontSize: ms(20),
    color: colors.primary,
    fontWeight: '700',
  },
});

export default React.memo(ShlokaListItem);
