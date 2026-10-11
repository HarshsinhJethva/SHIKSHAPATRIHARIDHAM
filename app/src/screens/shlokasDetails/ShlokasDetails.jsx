import React from 'react';
import { View } from 'react-native';
import HeaderWithBack from '@components/molecules/HeaderWithBack';
import FontSizeControls from '@components/molecules/FontSizeControls';
import NavigationControls from '@components/molecules/NavigationControls';
import ShlokaContent from '@components/organisms/ShlokaContent';
import ShlokasListTemplate from '@components/templates/ShlokasListTemplate';
import useShlokasDetails from './useShlokasDetails';
import styles from './styles';

const ShlokasDetails = ({ navigation, route }) => {
  const {
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
  } = useShlokasDetails({ navigation, route });

  return (
    <ShlokasListTemplate
      header={
        <HeaderWithBack
          title={headerTitle}
          onBackPress={handleBackPress}
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

export default ShlokasDetails;
