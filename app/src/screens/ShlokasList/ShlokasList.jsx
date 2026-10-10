import React, { useState, useMemo, useCallback } from 'react';
import { FlatList, StyleSheet, View, Platform } from 'react-native';
import {
  shikshapatriShlokas,
  shikshaptriDhyan,
} from '@utils/shlokas/shlokas';
import ShlokaListItem from '@components/molecules/ShlokaListItem';
import HeaderWithBack from '@components/molecules/HeaderWithBack';
import FontSizeControls from '@components/molecules/FontSizeControls';
import SearchInput from '@components/atoms/SearchInput';
import AppText from '@components/atoms/AppText';
import ShlokasListTemplate from '@components/templates/ShlokasListTemplate';
import { saveLastReadShloka } from '@utils/storage/lastReadStorage';
import { colors } from '@utils/theme';
import { ms, vs, hs } from '@utils/helper/Metrics';

const MAX_FONT_SIZE = ms(26);
const MIN_FONT_SIZE = ms(12);

const ShlokasList = ({ navigation, route }) => {
  const shlokas_list = route?.params?.shlokas_list;
  const isDhyan = shlokas_list?.menuId === 1;
  const fullShlokasDataset = isDhyan ? shikshaptriDhyan : shikshapatriShlokas;

  const { start, end } = shlokas_list || {};

  // Filter shlokas belonging to this chapter/section
  const chapterShlokas = useMemo(() => {
    return fullShlokasDataset.filter(
      (item) => item.id >= start && item.id <= end
    );
  }, [fullShlokasDataset, start, end]);

  const [fontSize, setFontSize] = useState(ms(15));
  const [searchQuery, setSearchQuery] = useState('');

  // Live filter within chapter
  const displayedShlokas = useMemo(() => {
    if (!searchQuery.trim()) {
      return chapterShlokas;
    }
    const query = searchQuery.trim().toLowerCase();
    return chapterShlokas.filter((item) => {
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
    (item) => {
      const datasetIndex = fullShlokasDataset.findIndex(
        (i) => i.id === item.id
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

  const renderItem = useCallback(
    ({ item, index }) => (
      <ShlokaListItem
        item={item}
        index={index}
        fontSize={fontSize}
        onPress={() => handleShlokaPress(item)}
      />
    ),
    [fontSize, handleShlokaPress]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <ShlokasListTemplate
      header={
        <HeaderWithBack
          title={shlokas_list?.menuTitle || 'શ્લોક સંગ્રહ'}
          subtitle={`શ્લોક ${start} થી ${end}`}
          onBackPress={() => navigation.goBack()}
        />
      }
      controls={
        <FontSizeControls
          onIncrease={increaseFontSize}
          onDecrease={decreaseFontSize}
        />
      }
    >
      <View style={styles.container}>
        {/* In-chapter quick search */}
        <View style={styles.searchWrapper}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={`આ પ્રકરણમાં શોધો (દા.ત. શ્લોક ${start})...`}
            onClear={() => setSearchQuery('')}
          />
        </View>

        {/* Shlokas List */}
        <FlatList
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          data={displayedShlokas}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          initialNumToRender={14}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={Platform.OS === 'android'}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AppText
                variant="caption"
                center
                color={colors.textMuted}
                style={styles.emptyText}
              >
                આ પ્રકરણમાં કોઈ શ્લોક મળ્યો નથી.
              </AppText>
            </View>
          }
        />
      </View>
    </ShlokasListTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchWrapper: {
    marginBottom: vs(8),
    paddingHorizontal: hs(2),
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: vs(24),
  },
  emptyContainer: {
    paddingVertical: vs(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: ms(14),
  },
});

export default ShlokasList;
