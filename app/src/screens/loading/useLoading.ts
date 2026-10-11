import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import Images from '@utils/Images/Images';

export interface UseLoadingProps {
  navigation?: any;
}

export const useLoading = (props?: UseLoadingProps) => {
  const fallbackNavigation = useNavigation<any>();
  const navigation = props?.navigation || fallbackNavigation;

  useEffect(() => {
    try {
      SplashScreen?.hide();
    } catch (_e) {
      // Safe fallback if native module is not attached
    }

    const timer = setTimeout(() => {
      navigation.replace('dashboard');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return {
    imageSource: Images.SHIKSHAPATRI,
  };
};

export default useLoading;
