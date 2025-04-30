import { StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

export const lightModalStyles = StyleSheet.create({
  attachmentText: {
    color: theme.colors.ATTACHMENT_TEXT_LIGHT,
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
    borderColor: theme.colors.BORDER_LIGHT,
    color: theme.colors.INPUT_TEXT,
  },
  mapIconButton: {
    backgroundColor: theme.colors.MAP_BUTTON,
  },
  modalContainer: {
    backgroundColor: theme.colors.TEXT_DARK,
  },
  modalTitle: {
    color: theme.colors.TEXT_LIGHT,
  },
});
