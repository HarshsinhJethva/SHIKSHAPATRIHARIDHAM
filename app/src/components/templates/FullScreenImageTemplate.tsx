import React from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  ImageSourcePropType,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { colors } from '@utils/theme';

interface FullScreenImageTemplateProps {
  imageSource: ImageSourcePropType;
  children?: React.ReactNode;
}

const FullScreenImageTemplate: React.FC<FullScreenImageTemplateProps> = ({
  imageSource,
  children,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground
        style={styles.imageBackground}
        source={imageSource}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          {children}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});

export default FullScreenImageTemplate;
