import { StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

export const darkModalStyles = StyleSheet.create({
  attachmentText: {
    color: theme.colors.TEXT_DARK,
  },
  button: {
    backgroundColor: theme.colors.PRIMARY,
  },
  buttonText: { color: theme.colors.TEXT_DARK },
  cancelButton: {
    backgroundColor: theme.colors.DANGER,
  },
  cancelText: {
    color: theme.colors.TEXT_DARK,
  },
  deleteButton: {
    backgroundColor: theme.colors.DANGER,
  },
  deleteText: {
    color: theme.colors.TEXT_DARK,
  },
  input: {
    borderColor: theme.colors.TEXT_DARK,
    color: theme.colors.TEXT_DARK,
  },
  mapIconButton: {
    backgroundColor: theme.colors.MAP_BUTTON,
  },
  modalContainer: {
    backgroundColor: theme.colors.TASK_ITEM_BACKGROUND_DARK,
  },
  modalTitle: {
    color: theme.colors.TEXT_DARK,
  },
});
