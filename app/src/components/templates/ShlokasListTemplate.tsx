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

interface ShlokasListTemplateProps {
  header: React.ReactNode;
  controls?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  style?: ViewStyle;
}

const ShlokasListTemplate: React.FC<ShlokasListTemplateProps> = ({
  header,
  controls,
  children,
  footer,
  style,
}) => {
  const insets = useSafeAreaInsets();
  const safeTopPadding = Math.max(
    insets.top,
    Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44
  ) + vs(8);

  return (
    <View style={[styles.screenContainer, { paddingTop: safeTopPadding }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={[styles.container, style]}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.headerSlot}>{header}</View>
          {controls ? <View style={styles.controlsSlot}>{controls}</View> : null}
        </View>

        {/* Thin Gold Separator */}
        <View style={styles.divider} />

        {/* Main Content Area */}
        <View style={styles.contentArea}>{children}</View>

        {/* Optional Docked Footer */}
        {footer ? <View style={styles.footerArea}>{footer}</View> : null}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: vs(4),
  },
  headerSlot: {
    flex: 1,
    justifyContent: 'center',
  },
  controlsSlot: {
    marginLeft: hs(8),
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: vs(10),
    marginHorizontal: hs(2),
  },
  contentArea: {
    flex: 1,
  },
  footerArea: {
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? vs(8) : vs(4),
  },
});

export default ShlokasListTemplate;
