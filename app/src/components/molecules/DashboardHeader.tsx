import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '@components/atoms/AppText';
import Badge from '@components/atoms/Badge';
import { colors } from '@utils/theme';
import { ms, vs, hs } from '@utils/helper/Metrics';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  totalChapters?: number;
  totalShlokas?: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = 'શિક્ષાપત્રી',
  subtitle = 'સર્વજીવહિતાવહ પાવન ધર્મશાસ્ત્ર',
  totalChapters = 14,
  totalShlokas = 212,
}) => {
  return (
    <View style={styles.container}>
      {/* Top Sacred Shlok/Mantra */}
      {/* <View style={styles.mantraContainer}>
        <AppText variant="caption" weight="bold" color={colors.saffron} style={styles.mantraText}>
          ॥ શ્રીહરિઃ જયતિ ॥
        </AppText>
      </View> */}

      {/* Title & Subtitle */}
      <View style={styles.titleSection}>
        <AppText variant="h1" weight="heavy" color={colors.primaryDark} style={styles.title}>
          {title}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary} style={styles.subtitle}>
          {subtitle}
        </AppText>
      </View>

      {/* Quick Summary Pill Bar */}
      <View style={styles.statsRow}>
        <Badge
          label={`${totalChapters} અધ્યાય`}
          variant="gold"
          size="sm"
          style={styles.statBadge}
        />
        <View style={styles.dot} />
        <Badge
          label={`${totalShlokas} શ્લોકો`}
          variant="gold"
          size="sm"
          style={styles.statBadge}
        />
        <View style={styles.dot} />
        <Badge
          label="હરિધામ સોખડા"
          variant="subtle"
          size="sm"
          style={styles.statBadge}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: vs(8),
    paddingHorizontal: hs(4),
    marginBottom: vs(4),
  },
  mantraContainer: {
    alignItems: 'center',
    marginBottom: vs(2),
  },
  mantraText: {
    letterSpacing: 1.5,
    fontSize: ms(12),
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: vs(8),
  },
  title: {
    fontSize: ms(28),
    color: colors.primaryDark,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: Math.round(ms(28) * 1.45),
  },
  subtitle: {
    fontSize: ms(13),
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: vs(3),
    lineHeight: Math.round(ms(13) * 1.55),
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(4),
  },
  statBadge: {
    backgroundColor: colors.surface,
  },
  dot: {
    width: ms(4),
    height: ms(4),
    borderRadius: ms(2),
    backgroundColor: colors.borderGold,
    marginHorizontal: hs(6),
  },
});

export default DashboardHeader;
