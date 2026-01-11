import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MarqueeText from 'react-native-marquee';
import Images from '../../../utils/Images/Images';
import { styles } from '../../screens/ShlokasList/styles'; 

interface HeaderProps {
  title: string;
  onBackPress: () => void;
}

const HeaderWithBack: React.FC<HeaderProps> = ({ title, onBackPress }) => {
  return (
    <View style={styles.backView}>
      <TouchableOpacity onPress={onBackPress}>
        <Image
          source={Images.BACK}
          resizeMode="contain"
          tintColor={'rgb(83, 61, 22)'}
          style={styles.backImage}
        />
      </TouchableOpacity>

      <MarqueeText
        style={styles.shikshaptriText}
        speed={0.4}
        marqueeOnStart={true}
        loop={true}
        delay={1000}>
        {title}
      </MarqueeText>
    </View>
  );
};

export default HeaderWithBack;
