import React, { useCallback } from 'react';
import { FlatList, View, Platform } from 'react-native';
import ShlokaListItem from '@components/molecules/ShlokaListItem';
import HeaderWithBack from '@components/molecules/HeaderWithBack';
import FontSizeControls from '@components/molecules/FontSizeControls';
import SearchInput from '@components/atoms/SearchInput';
import AppText from '@components/atoms/AppText';
import ShlokasListTemplate from '@components/templates/ShlokasListTemplate';
import { colors } from '@utils/theme';
import useShlokasList from './useShlokasList';
import styles from './styles';

const ShlokasList = ({ navigation, route }) => {
  const {
    shlokas_list,
    start,
    end,
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
  } = useShlokasList({ navigation, route });

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

  return (
    <ShlokasListTemplate
      header={
        <HeaderWithBack
          title={shlokas_list?.menuTitle || 'શ્લોક સંગ્રહ'}
          subtitle={`શ્લોક ${start} થી ${end}`}
          onBackPress={handleBackPress}
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
            onClear={handleClearSearch}
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

export default ShlokasList;
