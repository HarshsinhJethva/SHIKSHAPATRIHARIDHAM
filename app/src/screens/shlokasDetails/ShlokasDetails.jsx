import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderWithBack from '@components/molecules/HeaderWithBack';
import FontSizeControls from '@components/molecules/FontSizeControls';
import NavigationControls from '@components/molecules/NavigationControls';
import ShlokaContent from '@components/organisms/ShlokaContent';
import ShlokasListTemplate from '@components/templates/ShlokasListTemplate';
import { saveLastReadShloka } from '@utils/storage/lastReadStorage';
import { ms } from '@utils/helper/Metrics';

const MAX_FONT_SIZE = ms(28);
const MIN_FONT_SIZE = ms(13);

const ShlokasDetails = ({ navigation, route }) => {
  const { index, shlokas_list, shlokas_data } = route.params || {};

  const [currentIndex, setCurrentIndex] = useState(index || 0);
  const [fontSize, setFontSize] = useState(ms(16));

  const totalShlokasCount = shlokas_data?.length || 0;
  const currentShloka = shlokas_data?.[currentIndex];

  // Persist current reading position to AsyncStorage
  useEffect(() => {
    if (currentShloka?.id !== undefined) {
      saveLastReadShloka({
        shlokaId: currentShloka.id,
        shlokaIndex: currentIndex,
        chapterId: shlokas_list?.menuId || 0,
        chapterTitle: shlokas_list?.menuTitle || 'શિક્ષાપત્રી',
        isDhyan: shlokas_list?.menuId === 1,
      });
    }
  }, [currentIndex, currentShloka, shlokas_list]);

  const handleNext = useCallback(() => {
    if (currentIndex < totalShlokasCount - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalShlokasCount]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const increaseFontSize = useCallback(() => {
    setFontSize((prevSize) =>
      prevSize < MAX_FONT_SIZE ? prevSize + 2 : prevSize
    );
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize((prevSize) =>
      prevSize > MIN_FONT_SIZE ? prevSize - 2 : prevSize
    );
  }, []);

  const chapterTitle = shlokas_list?.menuTitle || 'શિક્ષાપત્રી';
  const headerTitle = currentShloka?.id
    ? `શ્લોક ${currentShloka.id} • ${chapterTitle}`
    : chapterTitle;

  return (
    <ShlokasListTemplate
      header={
        <HeaderWithBack
          title={headerTitle}
          onBackPress={() => navigation.goBack()}
        />
      }
      controls={
        <FontSizeControls
          onIncrease={increaseFontSize}
          onDecrease={decreaseFontSize}
        />
      }
      footer={
        <NavigationControls
          onPrevious={handlePrevious}
          onNext={handleNext}
          disablePrevious={currentIndex === 0}
          disableNext={currentIndex === totalShlokasCount - 1}
          currentIndex={currentIndex}
          totalCount={totalShlokasCount}
        />
      }
    >
      <View style={styles.contentContainer}>
        <ShlokaContent
          currentShloka={currentShloka}
          fontSize={fontSize}
        />
      </View>
    </ShlokasListTemplate>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});

export default ShlokasDetails;
