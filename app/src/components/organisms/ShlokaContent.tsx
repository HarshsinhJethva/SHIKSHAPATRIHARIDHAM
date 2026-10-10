import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AppText from '@components/atoms/AppText';
import CardSurface from '@components/atoms/CardSurface';
import OrnamentalDivider from '@components/atoms/OrnamentalDivider';
import ShlokaSectionCard from '@components/molecules/ShlokaSectionCard';
import { colors, borderRadius } from '@utils/theme';
import { ms, vs, hs } from '@utils/helper/Metrics';

export interface ShlokaItemData {
  id: number | string;
  sanskrit?: string;
  gujarati?: string;
  gujSanskrit?: string;
  engSanskrit?: string;
}

interface ShlokaContentProps {
  currentShloka: ShlokaItemData;
  fontSize: number;
}

const ShlokaContent: React.FC<ShlokaContentProps> = ({
  currentShloka,
  fontSize,
}) => {
  if (!currentShloka) {
    return null;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.container}>
        {/* Sacred Shloka Number Banner */}
        <View style={styles.shlokaHeaderBanner}>
          <CardSurface variant="gold" style={styles.bannerCard}>
            <AppText variant="caption" weight="bold" color={colors.saffron} style={styles.shlokaPrefix}>
              ॥ શ્રી શિક્ષાપત્રી ॥
            </AppText>
            <AppText variant="h2" weight="heavy" color={colors.primaryDark} style={styles.shlokaNumber}>
              {`શ્લોક ${currentShloka.id}`}
            </AppText>
          </CardSurface>
        </View>

        {/* 1. Original Sanskrit Shloka */}
        {currentShloka.sanskrit ? (
          <>
            <ShlokaSectionCard
              label="મૂળ સંસ્કૃત શ્લોક"
              badgeVariant="saffron"
              content={currentShloka.sanskrit}
              fontSize={fontSize + 1}
              highlight={true}
            />
            <OrnamentalDivider variant="light" />
          </>
        ) : null}

        {/* 2. Gujarati Meaning (ભાવાર્થ) */}
        {currentShloka.gujarati ? (
          <>
            <ShlokaSectionCard
              label="ગુજરાતી અર્થ"
              badgeVariant="gold"
              content={currentShloka.gujarati}
              fontSize={fontSize}
            />
            <OrnamentalDivider variant="center" />
          </>
        ) : null}

        {/* 3. Gujarati Sanskrit Transliteration */}
        {currentShloka.gujSanskrit ? (
          <>
            <ShlokaSectionCard
              label="ગુજરાતી લિપિ"
              badgeVariant="subtle"
              content={currentShloka.gujSanskrit}
              fontSize={fontSize}
            />
            <OrnamentalDivider variant="light" />
          </>
        ) : null}

        {/* 4. English Transliteration */}
        {currentShloka.engSanskrit ? (
          <>
            <ShlokaSectionCard
              label="English Script"
              badgeVariant="subtle"
              content={currentShloka.engSanskrit}
              fontSize={fontSize - 1}
            />
            <OrnamentalDivider variant="last" />
          </>
        ) : (
          <OrnamentalDivider variant="last" />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: vs(32),
    paddingHorizontal: hs(2),
  },
  container: {
    flex: 1,
    width: '100%',
  },
  shlokaHeaderBanner: {
    width: '100%',
    alignItems: 'center',
    marginVertical: vs(6),
  },
  bannerCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vs(8),
    paddingHorizontal: hs(24),
    backgroundColor: colors.surfaceGold,
    borderColor: colors.borderGold,
    borderWidth: 1.2,
    borderRadius: borderRadius.md,
  },
  shlokaPrefix: {
    letterSpacing: 1.2,
    fontSize: ms(11),
  },
  shlokaNumber: {
    fontSize: ms(20),
    marginTop: vs(2),
  },
});

export default ShlokaContent;
