import { useState, useCallback, useMemo, useRef } from 'react';
import { BackHandler, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { shlokas_title } from '@utils/shlokas/shlokas_title';
import {
  shikshapatriShlokas,
  shikshaptriDhyan,
} from '@utils/shlokas/shlokas';
import { getLastReadShloka, LastReadData } from '@utils/storage/lastReadStorage';

export interface ChapterItem {
  menuId: number;
  menuTitle: string;
  start: number | string;
  end: number | string;
  [key: string]: any;
}

export interface UseDashboardProps {
  navigation?: any;
}

export const useDashboard = (props?: UseDashboardProps) => {
  const fallbackNavigation = useNavigation<any>();
  const navigation = props?.navigation || fallbackNavigation;

  const [selectionModeEnable, changeSelectionMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastReadData, setLastReadData] = useState<LastReadData | null>(null);
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);
  const hasCheckedResumeRef = useRef<boolean>(false);

  // Check last read shloka on screen focus
  useFocusEffect(
    useCallback(() => {
      getLastReadShloka().then((data) => {
        if (data && data.shlokaId) {
          setLastReadData(data);
          if (!hasCheckedResumeRef.current) {
            hasCheckedResumeRef.current = true;
            setShowResumeModal(true);
          }
        }
      });
    }, [])
  );

  // Hardware BackHandler logic
  useFocusEffect(
    useCallback(() => {
      changeSelectionMode(true);
      const onBackPress = () => {
        if (selectionModeEnable) {
          Alert.alert(
            'Exit App',
            'Are you sure you want to exit?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Exit', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
          );
          changeSelectionMode(false);
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [selectionModeEnable])
  );

  // Filter chapters based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return shlokas_title;
    }
    const query = searchQuery.trim().toLowerCase();
    const queryNum = parseInt(query, 10);

    return shlokas_title.filter((item: ChapterItem) => {
      const matchesTitle = item.menuTitle.toLowerCase().includes(query);
      const matchesRange =
        !isNaN(queryNum) &&
        queryNum >= Number(item.start) &&
        queryNum <= Number(item.end);

      return matchesTitle || matchesRange;
    });
  }, [searchQuery]);

  const handleItemPress = useCallback(
    (item: ChapterItem) => {
      navigation.navigate('shlokasList', { shlokas_list: item });
    },
    [navigation]
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleContinueReading = useCallback(() => {
    if (!lastReadData) {
      return;
    }
    setShowResumeModal(false);

    const isDhyan = lastReadData.isDhyan || lastReadData.chapterId === 1;
    const fullShlokasDataset = isDhyan ? shikshaptriDhyan : shikshapatriShlokas;

    let chapter = shlokas_title.find(
      (item: ChapterItem) => item.menuId === lastReadData.chapterId
    );
    if (!chapter) {
      if (isDhyan) {
        chapter = shlokas_title[0];
      } else {
        chapter = shlokas_title.find(
          (item: ChapterItem) =>
            item.menuId > 1 &&
            lastReadData.shlokaId >= Number(item.start) &&
            lastReadData.shlokaId <= Number(item.end)
        );
      }
    }

    const datasetIndex = fullShlokasDataset.findIndex(
      (item: any) => item.id === lastReadData.shlokaId
    );
    const targetIndex =
      datasetIndex >= 0 ? datasetIndex : lastReadData.shlokaIndex || 0;

    navigation.navigate('shlokasDetails', {
      shloka: fullShlokasDataset[targetIndex],
      shlokas_data: fullShlokasDataset,
      index: targetIndex,
      shlokas_list: chapter || shlokas_title[1],
    });
  }, [lastReadData, navigation]);

  const handleDismissResume = useCallback(() => {
    setShowResumeModal(false);
  }, []);

  return {
    selectionModeEnable,
    changeSelectionMode,
    searchQuery,
    setSearchQuery,
    lastReadData,
    setLastReadData,
    showResumeModal,
    setShowResumeModal,
    filteredData,
    handleItemPress,
    handleClearSearch,
    handleContinueReading,
    handleDismissResume,
  };
};

export default useDashboard;
