import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTaskStore } from '@/store/useTaskStore';
import { useThemeStore } from '@/store/useThemeStore';
import TaskList from '@/components/TaskList';
import TaskModal from '@/components/TaskModal';
import { theme as colorTheme } from '@/constants/theme';
import { styles } from '@/styles/tabs/Home.styles';

const index: React.FC = () => {
  const { theme } = useThemeStore();
  const { tasks, loadTasks } = useTaskStore();
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.homeContainer}>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor:
              theme === 'dark'
                ? colorTheme.colors.PRIMARY_BACKGROUND
                : colorTheme.colors.MAP_BUTTON,
          },
        ]}
        onPress={handleModalOpen}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: theme === 'dark' ? colorTheme.colors.TEXT_DARK : colorTheme.colors.TEXT_LIGHT,
            },
          ]}
        >
          Добавить задачу
        </Text>
      </TouchableOpacity>

      <TaskList tasks={tasks} />

      <TaskModal isVisible={isModalVisible} onClose={handleModalClose} />
    </View>
  );
};

export default index;
