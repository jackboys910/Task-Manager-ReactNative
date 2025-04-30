import { StyleSheet } from 'react-native';
import { Theme } from '@react-navigation/native';
import { fonts } from '@react-navigation/native/src/theming/fonts';
import { theme } from './theme';

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#1e90ff',
    background: '#121212',
    card: '#1a1a1a',
    text: '#e4e4e4',
    border: '#272727',
    notification: '#ff6347',
  },
  fonts,
};

export const darkStyles = StyleSheet.create({
  date: { color: theme.colors.TEXT_SECONDARY_DARK },
  description: { color: theme.colors.DESCRIPTION_TEXT_DARK },
  location: { color: theme.colors.LOCATION_TEXT_DARK },
  taskItem: {
    backgroundColor: theme.colors.BACKGROUND_DARK,
    color: theme.colors.TEXT_DARK,
  },
  title: { color: theme.colors.TEXT_DARK },
});
