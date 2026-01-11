import React, { useState } from 'react';
import { ms } from '../../../utils/helper/Metrics';
import { styles } from './styles';
import HeaderWithBack from '../../components/molecules/HeaderWithBack';
import FontSizeControls from '../../components/molecules/FontSizeControls';
import NavigationControls from '../../components/molecules/NavigationControls';
import ShlokaContent from '../../components/organisms/ShlokaContent';
import ShlokasListTemplate from '../../components/templates/ShlokasListTemplate';

const ShlokasDetails = ({ navigation, route }) => {
  const shloka = route.params.shloka;
  const [fontSize, setFontSize] = useState(16);
  const MAX_FONT_SIZE = ms(32);
  const MIN_FONT_SIZE = ms(10);

  const { index, shlokas_list, shlokas_data } = route.params;
  const [currentIndex, setCurrentIndex] = useState(index);
  const currentShloka = shlokas_data[currentIndex];
  const displayIndex = currentIndex + 1;

  const handleNext = () => {
    if (currentIndex < shlokas_data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
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

  return (
    <ShlokasListTemplate
      header={
        <HeaderWithBack
          title={`${displayIndex}. ${shlokas_list?.menuTitle}`}
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
      <ShlokaContent
        currentShloka={currentShloka}
        fontSize={fontSize}
        animationKey={currentIndex}
      />
      <NavigationControls
        onPrevious={handlePrevious}
        onNext={handleNext}
        disablePrevious={currentIndex === 0}
        disableNext={currentIndex === shlokas_data.length - 1}
      />
    </ShlokasListTemplate>
  );
};

export default ShlokasDetails;


