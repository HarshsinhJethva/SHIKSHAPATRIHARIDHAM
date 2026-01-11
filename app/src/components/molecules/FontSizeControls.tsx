import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Images from '../../../utils/Images/Images';
import { styles } from '../../screens/ShlokasList/styles';

interface FontSizeControlsProps {
  onIncrease: () => void;
  onDecrease: () => void;
}

const FontSizeControls: React.FC<FontSizeControlsProps> = ({ onIncrease, onDecrease }) => {
  return (
    <View style={styles.plusMinusView}>
      <TouchableOpacity
        style={styles.TouchableOpacityPlusMinus}
        onPress={onIncrease}>
        <Image
          source={Images.PLUS}
          resizeMode="contain"
          tintColor={'rgb(83, 61, 22)'}
          style={[styles.backImage]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.TouchableOpacityPlusMinus}
        onPress={onDecrease}>
        <Image
          source={Images.MINUS}
          resizeMode="contain"
          tintColor={'rgb(83, 61, 22)'}
          style={styles.backImage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FontSizeControls;
