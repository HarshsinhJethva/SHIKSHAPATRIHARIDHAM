import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import AppText from '@components/atoms/AppText';
import Badge from '@components/atoms/Badge';
import CardSurface from '@components/atoms/CardSurface';
import { colors, borderRadius } from '@utils/theme';
import { vs, hs } from '@utils/helper/Metrics';

interface ShlokaSectionCardProps {
  label: string;
  badgeVariant?: 'gold' | 'saffron' | 'subtle';
  content?: string;
  fontSize: number;
  highlight?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ShlokaSectionCard: React.FC<ShlokaSectionCardProps> = ({
  label,
  badgeVariant = 'gold',
  content,
  fontSize,
  highlight = false,
  style,
}) => {
  if (!content) {
    return null;
  }

  return (
    <CardSurface
      variant={highlight ? 'gold' : 'default'}
      style={[styles.card, highlight ? styles.highlightCard : undefined, style]}
    >
      {/* Section Header Label */}
      <View style={styles.headerRow}>
        <Badge
          label={label}
          variant={badgeVariant}
          size="sm"
          style={styles.badge}
        />
      </View>

      {/* Section Content Text */}
      <AppText
        style={[
          styles.contentText,
          {
            fontSize,
            lineHeight: fontSize * (highlight ? 1.6 : 1.5),
            fontWeight: highlight ? '700' : '500',
          },
        ]}
      >
        {content}
      </AppText>
    </CardSurface>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: vs(5),
    marginHorizontal: hs(2),
    paddingHorizontal: hs(14),
    paddingVertical: vs(12),
    backgroundColor: colors.surface,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: borderRadius.md,
  },
  highlightCard: {
    backgroundColor: colors.surfaceGold,
    borderColor: colors.borderGold,
    borderWidth: 1.2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(8),
  },
  badge: {
    alignSelf: 'flex-start',
  },
  contentText: {
    color: colors.textPrimary,
    textAlign: 'center',
  },
});

export default ShlokaSectionCard;
