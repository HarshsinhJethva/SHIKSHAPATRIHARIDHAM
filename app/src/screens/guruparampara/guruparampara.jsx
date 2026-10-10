import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Images from '@utils/Images/Images';
import FullScreenImageTemplate from '@components/templates/FullScreenImageTemplate';
import Badge from '@components/atoms/Badge';
import { vs, hs } from '@utils/helper/Metrics';

const Guruparampara = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('dashboard');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  const handleSkip = () => {
    navigation.replace('dashboard');
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleSkip}
      style={styles.touchable}
    >
      <FullScreenImageTemplate imageSource={Images.SHIKSHAPATRI}>
        <View style={styles.skipContainer}>
          <Badge
            label="આગળ વધો →"
            variant="gold"
            size="md"
            style={styles.skipBadge}
          />
        </View>
      </FullScreenImageTemplate>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  skipContainer: {
    position: 'absolute',
    bottom: vs(36),
    right: hs(20),
    zIndex: 10,
  },
  skipBadge: {
    backgroundColor: 'rgba(255, 253, 248, 0.9)',
    borderColor: '#D4AF37',
    paddingHorizontal: hs(14),
    paddingVertical: vs(6),
  },
});

export default Guruparampara;