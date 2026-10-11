import { useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Images from '@utils/Images/Images';

export interface UseGuruparamparaProps {
  navigation?: any;
}

export const useGuruparampara = (props?: UseGuruparamparaProps) => {
  const fallbackNavigation = useNavigation<any>();
  const navigation = props?.navigation || fallbackNavigation;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('dashboard');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  const handleSkip = useCallback(() => {
    navigation.replace('dashboard');
  }, [navigation]);

  return {
    handleSkip,
    imageSource: Images.SHIKSHAPATRI,
  };
};

export default useGuruparampara;
