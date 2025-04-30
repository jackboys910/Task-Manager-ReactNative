import { StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

export const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: theme.borderRadius.SMALL,
    marginBottom: theme.margin.LARGE,
    padding: theme.padding.LARGE,
  },
  buttonText: { textAlign: 'center' },
  homeContainer: { flex: 1, padding: theme.padding.LARGE },
});
