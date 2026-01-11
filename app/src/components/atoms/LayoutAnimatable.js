import { LayoutAnimation, Platform, UIManager } from 'react-native';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const animateLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

// No specific component "Atom" needed as it's a utility function, 
// but we can export presets if needed.
