import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ms, vs, hs } from '@utils/helper/Metrics';
import AppText from '../atoms/AppText';

interface DashboardCardProps {
  title: string;
  start: number | string;
  end: number | string;
  onPress: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  start,
  end,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <AppText numberOfLines={1} style={styles.menuTitle}>
        {title}
      </AppText>
      <AppText style={styles.startEnd}>
        {start}-{end}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: hs(6),
    marginVertical: vs(6),
    borderRadius: ms(10),
    paddingVertical: vs(8),
    paddingHorizontal: hs(4),
    borderColor: 'rgb(161,127,69)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Added a subtle background for better visibility
  },
  menuTitle: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: ms(16),
    color: 'rgb(83, 61, 22)',
    width: '100%',
  },
  startEnd: {
    fontSize: ms(16),
    alignSelf: 'center',
    fontWeight: '400',
    color: 'rgb(83, 61, 22)',
  },
});

export default DashboardCard;
