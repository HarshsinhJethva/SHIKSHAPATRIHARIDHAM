import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '@components/atoms/AppText';
import Badge from '@components/atoms/Badge';
import CardSurface from '@components/atoms/CardSurface';
import { colors, borderRadius } from '@utils/theme';
import { ms, vs, hs } from '@utils/helper/Metrics';

interface DashboardCardProps {
  id?: number | string;
  title: string;
  start: number | string;
  end: number | string;
  onPress: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  id,
  title,
  start,
  end,
  onPress,
}) => {
  const startNum = Number(start) || 0;
  const endNum = Number(end) || 0;
  const count = endNum >= startNum ? endNum - startNum + 1 : '';

  const formattedId = id ? (Number(id) < 10 ? `0${id}` : `${id}`) : '';

  return (
    <CardSurface
      onPress={onPress}
      variant="gold"
      style={styles.card}
      activeOpacity={0.75}
    >
      <View style={styles.topRow}>
        {formattedId ? (
          <View style={styles.idCircle}>
            <AppText variant="caption" weight="bold" color={colors.primaryDark}>
              {formattedId}
            </AppText>
          </View>
        ) : null}
        <Badge
          label={`${start} - ${end}`}
          variant="gold"
          size="sm"
        />
      </View>

      <View style={styles.titleContainer}>
        <AppText
          variant="title"
          weight="bold"
          numberOfLines={2}
          style={styles.titleText}
        >
          {title}
        </AppText>
      </View>

      <View style={styles.footerRow}>
        <AppText variant="caption" color={colors.textSecondary} style={styles.countText}>
          {count ? `શ્લોક ${start} થી ${end} (${count})` : `શ્લોક ${start}-${end}`}
        </AppText>
        <AppText style={styles.arrowIcon}>→</AppText>
      </View>
    </CardSurface>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: hs(6),
    marginVertical: vs(7),
    paddingHorizontal: hs(12),
    paddingVertical: vs(12),
    minHeight: vs(120),
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceGold,
    borderColor: colors.borderGold,
    borderWidth: 1,
    borderRadius: borderRadius.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vs(6),
  },
  idCircle: {
    width: ms(24),
    height: ms(24),
    borderRadius: ms(12),
    backgroundColor: colors.goldBadgeBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.goldBadgeBorder,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: vs(4),
  },
  titleText: {
    fontSize: ms(15),
    color: colors.textPrimary,
    lineHeight: Math.round(ms(15) * 1.5),
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: vs(6),
    paddingTop: vs(6),
    borderTopWidth: 0.8,
    borderTopColor: colors.borderLight,
  },
  countText: {
    fontSize: ms(11),
    color: colors.textMuted,
  },
  arrowIcon: {
    fontSize: ms(14),
    color: colors.primary,
    fontWeight: '700',
  },
});

export default DashboardCard;
