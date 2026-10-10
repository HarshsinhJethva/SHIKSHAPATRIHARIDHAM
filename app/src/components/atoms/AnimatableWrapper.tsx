import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface AnimatableWrapperProps {
  animation?: any;
  duration?: number;
  delay?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  useNativeDriver?: boolean;
}

const AnimatableWrapper: React.FC<AnimatableWrapperProps> = ({
  animation = 'fadeIn',
  duration = 500,
  delay = 0,
  style,
  children,
  useNativeDriver = true,
}) => {
  return (
    <Animatable.View
      animation={animation}
      duration={duration}
      delay={delay}
      style={style}
      useNativeDriver={useNativeDriver}
    >
      {children}
    </Animatable.View>
  );
};

export default AnimatableWrapper;
