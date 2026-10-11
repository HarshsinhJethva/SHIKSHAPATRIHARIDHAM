import { StyleSheet } from 'react-native';
import { vs, hs } from '@utils/helper/Metrics';

export const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  skipContainer: {
    position: 'absolute',
    bottom: vs(36),
    right: hs(20),
    zIndex: 10,
  },
  skipBadge: {
    backgroundColor: 'rgba(255, 253, 248, 0.9)',
    borderColor: '#D4AF37',
    paddingHorizontal: hs(14),
    paddingVertical: vs(6),
  },
});

export default styles;
