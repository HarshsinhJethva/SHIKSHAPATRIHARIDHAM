import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { Divider } from '@rneui/themed';
import { ms, vs, hs } from '@utils/helper/Metrics';
import Images from '@utils/Images/Images';
import AppText from '../atoms/AppText';

interface DashboardTemplateProps {
  title: string;
  children: React.ReactNode;
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  title,
  children,
}) => {
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={Images.BACKGROUND}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeAreaViewMainView}>
        <View style={styles.headerContainer}>
          <AppText style={styles.headerText}>{title}</AppText>
        </View>
        <Divider width={1} color="rgb(161,127,69)" style={styles.divider} />
        
        <View style={styles.contentContainer}>
          {children}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  safeAreaViewMainView: {
    flex: 1,
    marginHorizontal: hs(24),
    marginVertical: vs(24),
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: vs(10), // Simplified
    justifyContent: 'space-between',
    marginBottom: vs(10)
  },
  headerText: {
    textAlign: 'left',
    fontSize: ms(24),
    fontWeight: '600',
    color: 'rgb(161,127,69)',
  },
  divider: {
    marginVertical: vs(8),
  },
  contentContainer: {
    flex: 1,
  }
});

export default DashboardTemplate;
