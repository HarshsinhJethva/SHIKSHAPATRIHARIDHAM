import { useState, useMemo, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  shikshapatriShlokas,
  shikshaptriDhyan,
} from '@utils/shlokas/shlokas';
import { saveLastReadShloka } from '@utils/storage/lastReadStorage';
import { ms } from '@utils/helper/Metrics';

export const MAX_FONT_SIZE = ms(26);
export const MIN_FONT_SIZE = ms(12);

export interface UseShlokasListProps {
  navigation?: any;
  route?: any;
}

export const useShlokasList = (props?: UseShlokasListProps) => {
  const fallbackNavigation = useNavigation<any>();
  const fallbackRoute = useRoute<any>();

  const navigation = props?.navigation || fallbackNavigation;
  const route = props?.route || fallbackRoute;

  const shlokas_list = route?.params?.shlokas_list;
  const isDhyan = shlokas_list?.menuId === 1;
  const fullShlokasDataset = isDhyan ? shikshaptriDhyan : shikshapatriShlokas;

  const { start, end } = shlokas_list || {};

  const [fontSize, setFontSize] = useState<number>(ms(15));
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter shlokas belonging to this chapter/section
  const chapterShlokas = useMemo(() => {
    return fullShlokasDataset.filter(
      (item: any) => item.id >= Number(start) && item.id <= Number(end)
    );
  }, [fullShlokasDataset, start, end]);

  // Live filter within chapter
  const displayedShlokas = useMemo(() => {
    if (!searchQuery.trim()) {
      return chapterShlokas;
    }
    const query = searchQuery.trim().toLowerCase();
    return chapterShlokas.filter((item: any) => {
      const matchId = item.id.toString().includes(query);
      const matchGujarati = item.gujarati?.toLowerCase().includes(query);
      const matchSanskrit = item.sanskrit?.toLowerCase().includes(query);
      const matchGujSanskrit = item.gujSanskrit?.toLowerCase().includes(query);
      const matchEngSanskrit = item.engSanskrit?.toLowerCase().includes(query);

      return (
        matchId ||
        matchGujarati ||
        matchSanskrit ||
        matchGujSanskrit ||
        matchEngSanskrit
      );
    });
  }, [chapterShlokas, searchQuery]);

  const increaseFontSize = useCallback(() => {
    setFontSize((prev) => (prev < MAX_FONT_SIZE ? prev + 2 : prev));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize((prev) => (prev > MIN_FONT_SIZE ? prev - 2 : prev));
  }, []);

  const handleShlokaPress = useCallback(
    (item: any) => {
      const datasetIndex = fullShlokasDataset.findIndex(
        (i: any) => i.id === item.id
      );
      const targetIndex = datasetIndex >= 0 ? datasetIndex : 0;

      saveLastReadShloka({
        shlokaId: item.id,
        shlokaIndex: targetIndex,
        chapterId: shlokas_list?.menuId || 0,
        chapterTitle: shlokas_list?.menuTitle || 'શિક્ષાપત્રી',
        isDhyan: isDhyan,
      });

      navigation.navigate('shlokasDetails', {
        shloka: item,
        shlokas_data: fullShlokasDataset,
        index: targetIndex,
        shlokas_list: shlokas_list,
      });
    },
    [fullShlokasDataset, isDhyan, navigation, shlokas_list]
  );

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  return {
    shlokas_list,
    start,
    end,
    isDhyan,
    fontSize,
    searchQuery,
    setSearchQuery,
    displayedShlokas,
    increaseFontSize,
    decreaseFontSize,
    handleShlokaPress,
    handleBackPress,
    handleClearSearch,
    keyExtractor,
  };
};

export default useShlokasList;
