import React, { useState, useCallback } from 'react';
import { BackHandler, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DashboardTemplate from '@components/templates/DashboardTemplate';
import DashboardList from '@components/molecules/DashboardList';
import { shlokas_title } from '@utils/shlokas/shlokas_title';

const Dashboard = ({ navigation }) => {
  const [selectionModeEnable, changeSelectionMode] = useState(true);

  // BackHandler logic from original file
  useFocusEffect(
    useCallback(() => {
      changeSelectionMode(true);
      const onBackPress = () => {
        if (selectionModeEnable) {
          Alert.alert(
            'Exit App',
            'Are you sure you want to exit?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Exit', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
          );
          changeSelectionMode(false);
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [selectionModeEnable])
  );

  const handleItemPress = (item) => {
    // console.log('item =========>>>>>>>>>>', item);
    navigation.navigate('shlokasList', { shlokas_list: item });
  };

  return (
    <DashboardTemplate title="શિક્ષાપત્રી">
      <DashboardList
        data={shlokas_title}
        onItemPress={handleItemPress}
      />
    </DashboardTemplate>
  );
};

export default Dashboard;
