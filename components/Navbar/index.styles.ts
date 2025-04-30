import { StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

export const styles = StyleSheet.create({
  navbarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.padding.LARGE,
  },
  navbarTitle: {
    fontSize: theme.fontSizes.EXTRA_LARGE,
    fontWeight: 'bold',
  },
});
