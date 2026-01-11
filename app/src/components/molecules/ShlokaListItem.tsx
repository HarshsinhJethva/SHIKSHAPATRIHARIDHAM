import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import AppText from '../atoms/AppText';
import AnimatableWrapper from '../atoms/AnimatableWrapper';
import { hs, vs } from '@utils/helper/Metrics';

interface ShlokaListItemProps {
  item: {
    id: number | string;
    gujSanskrit?: string;
    gujarati?: string;
  };
  fontSize: number;
  onPress: () => void;
  index: number;
  style?: ViewStyle;
}

const ShlokaListItem: React.FC<ShlokaListItemProps> = ({
  item,
  fontSize,
  onPress,
  index,
  style,
}) => {
  return (
    <AnimatableWrapper
      animation="zoomInUp"
      duration={500}
      delay={index * 50} // Stagger
      style={[styles.listItem, style]}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <AppText numberOfLines={1} style={[styles.idText, { fontSize }]}>
          {item.id}
        </AppText>
        <AppText
          numberOfLines={1}
          style={[styles.shlokaText, { fontSize }]}
        >
          {item.gujSanskrit || item.gujarati}
        </AppText>
      </TouchableOpacity>
    </AnimatableWrapper>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: '2%',
    padding: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    width: '100%',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
  idText: {
    color: 'rgb(83, 61, 22)',
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginRight: 8,
  },
  shlokaText: {
    color: 'rgb(83, 61, 22)',
    borderWidth: 0.2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    width: '83%',
    paddingHorizontal: 8,
  },
});

export default ShlokaListItem;
