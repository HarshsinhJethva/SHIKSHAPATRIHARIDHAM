import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import DashboardCard from './DashboardCard';
import AnimatableWrapper from '../atoms/AnimatableWrapper';
import { animateLayout } from '../atoms/LayoutAnimatable'; // Import our helper
import { hs, vs } from '@utils/helper/Metrics';

interface DashboardListProps {
  data: any[];
  onItemPress: (item: any) => void;
}

const DashboardList: React.FC<DashboardListProps> = ({ data, onItemPress }) => {
  useEffect(() => {
    animateLayout(); // Trigger LayoutAnimation on mount/update
  }, [data]);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <AnimatableWrapper
        animation="zoomInUp"
        duration={800}
        delay={index * 100} // Stagger effect
        style={{ flex: 1 }}
      >
        <DashboardCard
          title={item?.menuTitle}
          start={item?.start}
          end={item?.end}
          onPress={() => onItemPress(item)}
        />
      </AnimatableWrapper>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.menuId.toString()}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '88%', // Kept from original styles
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: vs(8),
    marginHorizontal: hs(2), // Adjusted from right: hs(2) to be more balanced
  },
});

export default DashboardList;
