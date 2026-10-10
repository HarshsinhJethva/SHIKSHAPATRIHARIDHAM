import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '@screens/dashboard/Dashboard';
import Loading from '@screens/loading/Loading';
import ShlokasDetails from '@screens/shlokasDetails/ShlokasDetails';
import ShlokasList from '@screens/ShlokasList/ShlokasList';
import Guruparampara from '@screens/guruparampara/guruparampara';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="loading">
        <Stack.Screen
          name="loading"
          component={Loading}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="guruparampara"
          component={Guruparampara}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="shlokasDetails"
          component={ShlokasDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="shlokasList"
          component={ShlokasList}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
