import { StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

export const styles = StyleSheet.create({
  attachmentContainer: {
    marginVertical: theme.margin.LARGE,
  },
  attachmentIcon: {
    fontSize: theme.fontSizes.EXTRA_MEDIUM,
    marginRight: theme.margin.SMALL,
  },
  attachmentItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: theme.margin.SMALL,
  },
  attachmentText: {
    fontSize: theme.fontSizes.MEDIUM,
  },
  button: {
    alignItems: 'center',
    borderRadius: theme.borderRadius.SMALL,
    marginTop: theme.margin.SMALL,
    padding: theme.padding.MEDIUM,
  },
  buttonContainer: {
    marginTop: theme.margin.MEDIUM,
  },
  cancelButton: {
    alignItems: 'center',
    borderRadius: theme.borderRadius.SMALL,
    marginTop: theme.margin.LARGE,
    padding: theme.padding.MEDIUM,
  },
  cancelText: {
    textAlign: 'center',
  },
  deleteButton: {
    alignItems: 'center',
    borderRadius: theme.borderRadius.SMALL,
    marginTop: theme.margin.LARGE,
    padding: theme.padding.MEDIUM,
  },
  deleteText: {
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: theme.fontSizes.SMALL,
    marginBottom: theme.margin.TINY,
  },
  input: {
    borderBottomWidth: theme.borderWidth.THIN,
    height: 40,
  },
  locationContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  mapIconButton: {
    borderRadius: theme.borderRadius.SMALL,
    marginLeft: theme.margin.SMALL,
    marginTop: theme.margin.SMALL,
    padding: theme.padding.SMALL,
  },
  modalContainer: {
    borderRadius: theme.borderRadius.SMALL,
    padding: theme.padding.LARGE,
  },
  modalTitle: {
    fontSize: theme.fontSizes.LARGE,
    fontWeight: 'bold',
    marginBottom: theme.margin.SMALL,
  },
});
