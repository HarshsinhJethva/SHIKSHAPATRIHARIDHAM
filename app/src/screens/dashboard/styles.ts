import { StyleSheet } from 'react-native';
import { vs, hs, ms } from '@utils/helper/Metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    marginBottom: vs(10),
    paddingHorizontal: hs(4),
  },
  emptyContainer: {
    paddingVertical: vs(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: ms(14),
  },
});

export default styles;
