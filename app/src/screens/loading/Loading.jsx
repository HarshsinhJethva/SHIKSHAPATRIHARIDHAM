import React, { useEffect } from 'react';
import Images from '@utils/Images/Images';
import { useNavigation } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import FullScreenImageTemplate from '@components/templates/FullScreenImageTemplate';

const Loading = () => {
  const navigation = useNavigation();

  useEffect(() => {
    try {
      SplashScreen?.hide();
    } catch (e) {
      // Safe fallback if native module is not attached
    }

    const timer = setTimeout(() => {
      navigation.replace('dashboard');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return <FullScreenImageTemplate imageSource={Images.SHIKSHAPATRI} />;
};

export default Loading;
