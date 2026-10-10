import React, { useState, useCallback, useMemo, useRef } from 'react';
import { BackHandler, Alert, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DashboardTemplate from '@components/templates/DashboardTemplate';
import DashboardHeader from '@components/molecules/DashboardHeader';
import DashboardList from '@components/molecules/DashboardList';
import ResumeReadingModal from '@components/molecules/ResumeReadingModal';
import ResumeReadingBanner from '@components/molecules/ResumeReadingBanner';
import SearchInput from '@components/atoms/SearchInput';
import AppText from '@components/atoms/AppText';
import { shlokas_title } from '@utils/shlokas/shlokas_title';
import {
  shikshapatriShlokas,
  shikshaptriDhyan,
} from '@utils/shlokas/shlokas';
import { getLastReadShloka } from '@utils/storage/lastReadStorage';
import { colors } from '@utils/theme';
import { vs, hs, ms } from '@utils/helper/Metrics';

const Dashboard = ({ navigation }) => {
  const [selectionModeEnable, changeSelectionMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastReadData, setLastReadData] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const hasCheckedResumeRef = useRef(false);

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

    return shlokas_title.filter((item) => {
      const matchesTitle = item.menuTitle.toLowerCase().includes(query);
      const matchesRange =
        !isNaN(queryNum) &&
        queryNum >= Number(item.start) &&
        queryNum <= Number(item.end);

      return matchesTitle || matchesRange;
    });
  }, [searchQuery]);

  const handleItemPress = useCallback(
    (item) => {
      navigation.navigate('shlokasList', { shlokas_list: item });
    },
    [navigation]
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleContinueReading = useCallback(() => {
    if (!lastReadData) return;
    setShowResumeModal(false);

    const isDhyan = lastReadData.isDhyan || lastReadData.chapterId === 1;
    const fullShlokasDataset = isDhyan ? shikshaptriDhyan : shikshapatriShlokas;

    let chapter = shlokas_title.find(
      (item) => item.menuId === lastReadData.chapterId
    );
    if (!chapter) {
      if (isDhyan) {
        chapter = shlokas_title[0];
      } else {
        chapter = shlokas_title.find(
          (item) =>
            item.menuId > 1 &&
            lastReadData.shlokaId >= item.start &&
            lastReadData.shlokaId <= item.end
        );
      }
    }

    const datasetIndex = fullShlokasDataset.findIndex(
      (item) => item.id === lastReadData.shlokaId
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

  return (
    <DashboardTemplate>
      <View style={styles.container}>
        <DashboardHeader
          title="શિક્ષાપત્રી"
          subtitle="સર્વજીવહિતાવહ પાવન ધર્મશાસ્ત્ર"
          totalChapters={shlokas_title.length}
          totalShlokas={212}
        />

        {/* Live Search Bar */}
        <View style={styles.searchContainer}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="અધ્યાય અથવા શ્લોક નંબર શોધો (દા.ત. ૧૫)..."
            onClear={handleClearSearch}
          />
        </View>

        {/* Quick Resume Reading Banner */}
        {lastReadData && !searchQuery.trim() && (
          <ResumeReadingBanner
            shlokaId={lastReadData.shlokaId}
            chapterTitle={lastReadData.chapterTitle}
            isDhyan={lastReadData.isDhyan}
            onPress={handleContinueReading}
          />
        )}

        {/* Chapters Grid List */}
        <DashboardList
          data={filteredData}
          onItemPress={handleItemPress}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AppText variant="caption" center color={colors.textMuted} style={styles.emptyText}>
                કોઈ પરિણામ મળ્યા નથી.
              </AppText>
            </View>
          }
        />

        {/* Continue Reading Resume Prompt */}
        {lastReadData && (
          <ResumeReadingModal
            visible={showResumeModal}
            shlokaId={lastReadData.shlokaId}
            chapterTitle={lastReadData.chapterTitle}
            isDhyan={lastReadData.isDhyan}
            onContinue={handleContinueReading}
            onDismiss={handleDismissResume}
          />
        )}
      </View>
    </DashboardTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    marginBottom: vs(10),
    paddingHorizontal: hs(4),
  },
  emptyContainer: {
    paddingVertical: vs(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: ms(14),
  },
});

export default Dashboard;
