import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ListRenderItemInfo,
  Platform,
} from 'react-native';
import DashboardCard from '@components/molecules/DashboardCard';
import AnimatableWrapper from '@components/atoms/AnimatableWrapper';
import { hs, vs } from '@utils/helper/Metrics';

interface DashboardItem {
  menuId: number;
  menuTitle: string;
  start: number | string;
  end: number | string;
}

interface DashboardListProps {
  data: DashboardItem[];
  onItemPress: (item: DashboardItem) => void;
  ListHeaderComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | null;
}

const DashboardList: React.FC<DashboardListProps> = ({
  data,
  onItemPress,
  ListHeaderComponent,
  ListEmptyComponent,
}) => {
  const renderItem = ({ item, index }: ListRenderItemInfo<DashboardItem>) => {
    const shouldAnimate = index < 8;

    if (!shouldAnimate) {
      return (
        <View style={styles.itemWrapper}>
          <DashboardCard
            id={index + 1}
            title={item?.menuTitle}
            start={item?.start}
            end={item?.end}
            onPress={() => onItemPress(item)}
          />
        </View>
      );
    }

    return (
      <AnimatableWrapper
        animation="fadeInUp"
        duration={300}
        delay={index * 30}
        useNativeDriver={true}
        style={styles.itemWrapper}
      >
        <DashboardCard
          id={index + 1}
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
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: vs(24),
    paddingHorizontal: hs(2),
  },
  itemWrapper: {
    flex: 1,
  },
});

export default React.memo(DashboardList);
