import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import AnimatableWrapper from '../atoms/AnimatableWrapper';
import Images from '../../../utils/Images/Images';
import { ms } from '../../../utils/helper/Metrics';
import { styles } from '../../screens/shlokasDetails/styles';

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious: boolean;
  disableNext: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPrevious,
  onNext,
  disablePrevious,
  disableNext,
}) => {
  return (
    <AnimatableWrapper
      animation="zoomInUp"
      style={styles.animatedViewPreviusNext}>
      <TouchableOpacity
        onPress={onPrevious}
        disabled={disablePrevious}
        style={styles.previusNextTouchableOpacity}>
        {!disablePrevious && (
          <Image
            source={Images.LEFT}
            tintColor={'rgb(83, 61, 22)'}
            resizeMode="contain"
            style={styles.leftIcon}
          />
        )}

        <AppText
          style={{
            fontSize: ms(16),
            color: disablePrevious ? 'rgb(175, 153, 114)' : 'rgb(83, 61, 22)',
          }}>
          {'Previous'}
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onNext}
        disabled={disableNext}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AppText
          style={{
            fontSize: ms(16),
            color: disableNext ? 'rgb(175, 153, 114)' : 'rgb(83, 61, 22)',
          }}>
          {'Next'}
        </AppText>
        {!disableNext && (
          <Image
            source={Images.RIGHT}
            resizeMode="contain"
            tintColor={'rgb(83, 61, 22)'}
            style={styles.rightIcon}
          />
        )}
      </TouchableOpacity>
    </AnimatableWrapper>
  );
};

export default NavigationControls;
