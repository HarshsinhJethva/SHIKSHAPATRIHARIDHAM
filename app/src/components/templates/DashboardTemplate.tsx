import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ViewStyle,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@utils/theme';
import { hs, vs } from '@utils/helper/Metrics';

interface DashboardTemplateProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  style?: ViewStyle;
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  header,
  children,
  style,
}) => {
  const insets = useSafeAreaInsets();
  const safeTopPadding = Math.max(
    insets.top,
    Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44
  ) + vs(6);

  return (
    <View style={[styles.screenContainer, { paddingTop: safeTopPadding }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={[styles.container, style]}>
        {header}
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: hs(14),
  },
  content: {
    flex: 1,
  },
});

export default DashboardTemplate;
