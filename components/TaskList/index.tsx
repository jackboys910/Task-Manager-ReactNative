import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, Image } from 'react-native';
import { ITask } from '@/interfaces/ITask';
import { useThemeStore } from '@/store/useThemeStore';
import { lightStyles } from '@/constants/lightTheme';
import { darkStyles } from '@/constants/darkTheme';
import EditTaskModal from '../EditTaskModal';
import { styles } from './index.styles';

interface ITaskListProps {
  tasks: ITask[];
}

const TaskList: React.FC<ITaskListProps> = ({ tasks }) => {
  const { theme } = useThemeStore();
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const handleTaskPress = (task: ITask) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  const taskStyles = theme === 'dark' ? darkStyles : lightStyles;

  return (
    <>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleTaskPress(item)}
            style={[styles.taskItem, taskStyles.taskItem]}
          >
            <Text style={[styles.title, taskStyles.title]}>{item.title}</Text>
            <Text style={[styles.description, taskStyles.description]}>{item.description}</Text>
            <Text style={[styles.date, taskStyles.date]}>{item.dateTime}</Text>
            <Text style={[styles.location, taskStyles.location]}>{item.location}</Text>

            {item.attachments && item.attachments.length > 0 && (
              <View style={styles.attachmentList}>
                {item.attachments.map((attachment, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => Linking.openURL(attachment.url)}
                    style={styles.attachmentItem}
                  >
                    <Image source={{ uri: attachment.url }} style={styles.image} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      {selectedTask && (
        <EditTaskModal
          isVisible={isEditModalVisible}
          onClose={() => setEditModalVisible(false)}
          task={selectedTask}
        />
      )}
    </>
  );
};

export default TaskList;
