import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Images from '../../../utils/Images/Images';
import FullScreenImageTemplate from '../../components/templates/FullScreenImageTemplate';

const Guruparampara = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <FullScreenImageTemplate imageSource={Images.SHIKSHAPATRI} />
  );
};


export default Guruparampara

const styles = StyleSheet.create({})