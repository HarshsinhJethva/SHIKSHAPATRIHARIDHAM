import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Images from '../../../utils/Images/Images';
import { useNavigation } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import FullScreenImageTemplate from '../../components/templates/FullScreenImageTemplate';

const Loading = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
      navigation.replace('guruparampara');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <FullScreenImageTemplate imageSource={Images.SHIKSHAPATRI} />
  );
};

export default Loading;

const styles = StyleSheet.create({});
