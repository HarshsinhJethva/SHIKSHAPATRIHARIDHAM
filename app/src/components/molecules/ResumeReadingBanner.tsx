import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import CardSurface from '@components/atoms/CardSurface';
import AppText from '@components/atoms/AppText';
import Badge from '@components/atoms/Badge';
import { colors, borderRadius, shadows } from '@utils/theme';
import { hs, vs, ms } from '@utils/helper/Metrics';
import { toGujaratiNumeral } from '@utils/helper/gujaratiNumbers';

interface ResumeReadingBannerProps {
  shlokaId: number;
  chapterTitle: string;
  isDhyan?: boolean;
  onPress: () => void;
}

const ResumeReadingBanner: React.FC<ResumeReadingBannerProps> = ({
  shlokaId,
  chapterTitle,
  isDhyan = false,
  onPress,
}) => {
  const typeLabel = isDhyan ? 'ધ્યાન' : 'શ્લોક';
  const displayNum = toGujaratiNumeral ? toGujaratiNumeral(shlokaId) : String(shlokaId);

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      style={styles.wrapper}
    >
      <CardSurface variant="gold" style={styles.card}>
        <View style={styles.leftContainer}>
          <View style={styles.headerRow}>
            <Badge
              label="છેલ્લે વાંચેલ"
              variant="saffron"
              size="sm"
              style={styles.badge}
            />
            <AppText variant="caption" color={colors.textGold} style={styles.subtext}>
              વાંચન ચાલુ રાખો
            </AppText>
          </View>

          <View style={styles.titleRow}>
            <AppText variant="title" color={colors.primaryDark} style={styles.shlokaTitle}>
              {typeLabel} {displayNum}
            </AppText>
            <AppText variant="body" color={colors.textPrimary} style={styles.dot}>
              •
            </AppText>
            <AppText
              variant="body"
              color={colors.textPrimary}
              numberOfLines={1}
              style={styles.chapterTitle}
            >
              {chapterTitle}
            </AppText>
          </View>
        </View>

        <View style={styles.arrowButton}>
          <AppText style={styles.arrowIcon}>➔</AppText>
        </View>
      </CardSurface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: vs(12),
    paddingHorizontal: hs(4),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: vs(10),
    paddingHorizontal: hs(14),
    backgroundColor: '#FFF8EC',
    borderWidth: 1.2,
    borderColor: colors.borderGold,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  leftContainer: {
    flex: 1,
    marginRight: hs(10),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(4),
  },
  badge: {
    marginRight: hs(8),
  },
  subtext: {
    fontSize: ms(11),
    fontWeight: '600',
    lineHeight: Math.round(ms(11) * 1.45),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shlokaTitle: {
    fontSize: ms(14),
    fontWeight: '800',
    color: colors.primaryDark,
    lineHeight: Math.round(ms(14) * 1.45),
  },
  dot: {
    marginHorizontal: hs(6),
    color: colors.textMuted,
    fontSize: ms(12),
  },
  chapterTitle: {
    flex: 1,
    fontSize: ms(13),
    fontWeight: '600',
    lineHeight: Math.round(ms(13) * 1.45),
  },
  arrowButton: {
    width: ms(32),
    height: ms(32),
    borderRadius: ms(16),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  arrowIcon: {
    color: '#FFFFFF',
    fontSize: ms(14),
    fontWeight: '700',
  },
});

export default ResumeReadingBanner;
