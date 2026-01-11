import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { ms } from '@utils/helper/Metrics';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: any;
}

const AppText: React.FC<AppTextProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: ms(14),
    color: '#000',
    // Add default font family here if project has one
  },
});

export default AppText;
