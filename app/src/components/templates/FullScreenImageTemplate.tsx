import React from 'react';
import { ImageBackground, View, StyleSheet, ImageSourcePropType } from 'react-native';

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
      <ImageBackground
        style={styles.imageBackground}
        source={imageSource}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
});

export default FullScreenImageTemplate;
