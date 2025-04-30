import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const lightStyles = StyleSheet.create({
  date: { color: theme.colors.TEXT_SECONDARY_LIGHT },
  description: { color: theme.colors.TEXT_LIGHT },
  location: { color: theme.colors.LOCATION_TEXT_LIGHT },
  taskItem: {
    backgroundColor: theme.colors.MODAL_BACKGROUND_LIGHT,
    color: theme.colors.INPUT_TEXT,
  },
  title: { color: theme.colors.INPUT_TEXT },
});
