import {
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import {
  shikshapatriShlokas,
  shikshaptriDhyan,
} from '../../../utils/shlokas/shlokas';
import ShlokaListItem from '../../components/molecules/ShlokaListItem';
import { animateLayout } from '../../components/atoms/LayoutAnimatable';
import HeaderWithBack from '../../components/molecules/HeaderWithBack';
import FontSizeControls from '../../components/molecules/FontSizeControls';
import ShlokasListTemplate from '../../components/templates/ShlokasListTemplate';

const ShlokasList = ({ navigation, route }) => {
  const shlokas_list = route?.params?.shlokas_list;
  const shlokas_data =
    shlokas_list?.menuId === 1 ? shikshaptriDhyan : shikshapatriShlokas;

  // Get the start and end id from the selected shlokas list
  const { start, end } = shlokas_list || {};

  // Filter shlokas data based on the start and end id
  const filteredShlokas = shlokas_data.filter(
    item => item.id >= start && item.id <= end,
  );
  const [fontSize, setFontSize] = useState(16);
  // const MAX_FONT_SIZE = ms(24); // Removed unused import ms if not used elsewhere, but maybe used in other parts? 
  // keeping ms import if needed or removing it. ms was imported.
  // We can keep constants here.
  const MAX_FONT_SIZE = 24;
  const MIN_FONT_SIZE = 10;

  useEffect(() => {
    animateLayout();
  }, [fontSize, filteredShlokas]);

  const increaseFontSize = () => {
    setFontSize(prevSize =>
      prevSize < MAX_FONT_SIZE ? prevSize + 2 : prevSize,
    );
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize =>
      prevSize > MIN_FONT_SIZE ? prevSize - 2 : prevSize,
    );
  };

  const renderItem = ({ item, index }) => (
    <ShlokaListItem
      item={item}
      index={index}
      fontSize={fontSize}
      onPress={() =>
        navigation.navigate('shlokasDetails', {
          shloka: item,
          shlokas_data:
            shlokas_list?.menuId === 1
              ? shikshaptriDhyan
              : shikshapatriShlokas,
          index: (shlokas_list?.menuId === 1
            ? shikshaptriDhyan
            : shikshapatriShlokas
          ).findIndex(i => i.id === item.id),
          shlokas_list: shlokas_list,
        })
      }
    />
  );

  return (
    <ShlokasListTemplate
      header={
        <HeaderWithBack
          title={shlokas_list?.menuTitle}
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
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        data={filteredShlokas}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </ShlokasListTemplate>
  );
};

export default ShlokasList;
