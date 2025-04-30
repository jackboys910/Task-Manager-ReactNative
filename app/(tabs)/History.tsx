import { View, Text, FlatList } from 'react-native';
import { useHistoryStore } from '@/store/useHistoryStore';
import { useThemeStore } from '@/store/useThemeStore';
import { theme as colorTheme } from '@/constants/theme';
import { styles } from '@/styles/tabs/History.styles';

const History: React.FC = () => {
  const { theme } = useThemeStore();
  const { history } = useHistoryStore();

  return (
    <View style={styles.historyContainer}>
      <FlatList
        data={history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.historyItem,
              {
                backgroundColor:
                  theme === 'dark'
                    ? colorTheme.colors.PRIMARY_BACKGROUND
                    : colorTheme.colors.MODAL_BACKGROUND_LIGHT,
              },
            ]}
          >
            <Text
              style={[
                styles.historyItemText,
                {
                  color:
                    theme === 'dark' ? colorTheme.colors.TEXT_DARK : colorTheme.colors.TEXT_LIGHT,
                },
              ]}
            >
              {item.action}
            </Text>
            <Text
              style={[
                styles.historyItemText,
                {
                  color:
                    theme === 'dark' ? colorTheme.colors.TEXT_DARK : colorTheme.colors.TEXT_LIGHT,
                },
              ]}
            >
              {item.timestamp}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default History;
