import { useState, useCallback, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveLastReadShloka } from '@utils/storage/lastReadStorage';
import { ms } from '@utils/helper/Metrics';

export const MAX_FONT_SIZE = ms(28);
export const MIN_FONT_SIZE = ms(13);

export interface UseShlokasDetailsProps {
  navigation?: any;
  route?: any;
}

export const useShlokasDetails = (props?: UseShlokasDetailsProps) => {
  const fallbackNavigation = useNavigation<any>();
  const fallbackRoute = useRoute<any>();

  const navigation = props?.navigation || fallbackNavigation;
  const route = props?.route || fallbackRoute;

  const { index, shlokas_list, shlokas_data } = route?.params || {};

  const [currentIndex, setCurrentIndex] = useState<number>(index || 0);
  const [fontSize, setFontSize] = useState<number>(ms(16));

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

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const chapterTitle = shlokas_list?.menuTitle || 'શિક્ષાપત્રી';
  const headerTitle = currentShloka?.id
    ? `શ્લોક ${currentShloka.id} • ${chapterTitle}`
    : chapterTitle;

  return {
    currentIndex,
    currentShloka,
    totalShlokasCount,
    fontSize,
    headerTitle,
    handleNext,
    handlePrevious,
    increaseFontSize,
    decreaseFontSize,
    handleBackPress,
  };
};

export default useShlokasDetails;
