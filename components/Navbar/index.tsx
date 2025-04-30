import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeStore } from '@/store/useThemeStore';
import { theme as colorTheme } from '@/constants/theme';
import { styles } from './index.styles';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <View
      style={[
        styles.navbarContainer,
        {
          backgroundColor:
            theme === 'dark' ? colorTheme.colors.TEXT_LIGHT : colorTheme.colors.TEXT_DARK,
        },
      ]}
    >
      <Text
        style={[
          styles.navbarTitle,
          { color: theme === 'dark' ? colorTheme.colors.TEXT_DARK : colorTheme.colors.INPUT_TEXT },
        ]}
      >
        Task Manager
      </Text>
      <TouchableOpacity onPress={toggleTheme}>
        <MaterialIcons
          size={24}
          name={theme === 'dark' ? 'dark-mode' : 'light-mode'}
          color={theme === 'dark' ? colorTheme.colors.TEXT_DARK : colorTheme.colors.INPUT_TEXT}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
