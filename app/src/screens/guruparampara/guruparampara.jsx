import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FullScreenImageTemplate from '@components/templates/FullScreenImageTemplate';
import Badge from '@components/atoms/Badge';
import useGuruparampara from './useGuruparampara';
import styles from './styles';

const Guruparampara = ({ navigation }) => {
  const { handleSkip, imageSource } = useGuruparampara({ navigation });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleSkip}
      style={styles.touchable}
    >
      <FullScreenImageTemplate imageSource={imageSource}>
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

export default Guruparampara;
