import React from 'react';
import { ScrollView, Image, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import AnimatableWrapper from '../atoms/AnimatableWrapper';
import Images from '../../../utils/Images/Images';
import { styles } from '../../screens/shlokasDetails/styles';

interface ShlokaContentProps {
  currentShloka: any; // Define strict type if available
  fontSize: number;
  animationKey: number;
}

const ShlokaContent: React.FC<ShlokaContentProps> = ({
  currentShloka,
  fontSize,
  animationKey,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}>
      <AnimatableWrapper
        animation="zoomInUp"
        style={styles.animatedView}
        key={animationKey} // Trigger animation on change
      >
        <AppText style={[styles.currentShlokaText, { fontSize }]}>
          {currentShloka?.sanskrit}
        </AppText>

        <Image
          source={Images.DIVIDERLIGHT}
          resizeMode="contain"
          style={styles.deviderall}
        />
        <AppText style={[styles.currentShlokaText, { fontSize }]}>
          {currentShloka?.gujarati}
        </AppText>
        <Image
          source={Images.D_CENTER}
          resizeMode="contain"
          style={styles.deviderall}
        />
        <AppText style={[styles.currentShlokaText, { fontSize }]}>
          {currentShloka?.gujSanskrit}
        </AppText>
        <Image
          source={Images.DIVIDERLIGHT}
          resizeMode="contain"
          style={styles.deviderall}
        />
        <AppText style={[styles.currentShlokaText, { fontSize }]}>
          {currentShloka?.engSanskrit}
        </AppText>
        <Image
          source={Images.D_LAST}
          resizeMode="contain"
          style={styles.devideLast}
        />
      </AnimatableWrapper>
    </ScrollView>
  );
};

export default ShlokaContent;
