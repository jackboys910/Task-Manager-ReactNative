import { StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

export const styles = StyleSheet.create({
  historyContainer: { flex: 1, padding: theme.padding.LARGE },
  historyItem: {
    backgroundColor: theme.colors.MODAL_BACKGROUND_LIGHT,
    borderRadius: theme.borderRadius.SMALL,
    marginBottom: theme.margin.SMALL,
    padding: theme.padding.LARGE,
  },
  historyItemText: { color: theme.colors.TEXT_SECONDARY_LIGHT },
});
