import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './app/src/navigator/Navigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <Navigator />
    </SafeAreaProvider>
  );
};

export default App;
