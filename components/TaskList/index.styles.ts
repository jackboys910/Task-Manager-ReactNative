import { StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

export const styles = StyleSheet.create({
  attachmentIcon: {
    fontSize: theme.fontSizes.EXTRA_MEDIUM,
    marginRight: theme.margin.SMALL,
  },
  attachmentItem: {
    marginTop: theme.margin.TINY,
  },
  attachmentList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.gap.SMALL,
    marginTop: theme.margin.SMALL,
  },
  attachmentText: {
    fontSize: theme.fontSizes.MEDIUM,
    textDecorationLine: 'underline',
  },
  date: {
    marginTop: theme.margin.TINY,
  },
  description: {
    marginTop: theme.margin.TINY,
  },
  image: { borderRadius: theme.borderRadius.SMALL, height: 100, width: 100 },
  location: {
    marginTop: theme.margin.TINY,
  },
  taskItem: {
    borderRadius: theme.borderRadius.SMALL,
    marginBottom: theme.margin.SMALL,
    padding: theme.padding.LARGE,
  },
  title: {
    fontWeight: 'bold',
  },
});
