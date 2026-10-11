import { StyleSheet } from 'react-native';
import { ms, vs, hs } from '@utils/helper/Metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchWrapper: {
    marginBottom: vs(8),
    paddingHorizontal: hs(2),
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: vs(24),
  },
  emptyContainer: {
    paddingVertical: vs(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: ms(14),
  },
});

export default styles;
