import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { WebViewMessageEvent } from 'react-native-webview';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskValidationSchema, taskValidationType } from '@/utils/validation/taskValidation';
import { ITask } from '@/interfaces/ITask';
import { useTaskStore } from '@/store/useTaskStore';
import { useThemeStore } from '@/store/useThemeStore';
import { lightModalStyles } from '@/styles/modal/lightThemeModal';
import { darkModalStyles } from '@/styles/modal/darkThemeModal';
import { reverseGeocode } from '@/utils/reverseGeocode';
import MapModal from '../MapModal';
import { theme as colorTheme } from '@/constants/theme';
import { styles } from '../TaskModal/index.styles';

interface IEditTaskModalProps {
  isVisible: boolean;
  onClose: () => void;
  task: ITask;
}

const EditTaskModal: React.FC<IEditTaskModalProps> = ({ isVisible, onClose, task }) => {
  const { theme } = useThemeStore();
  const { updateTask, deleteTask } = useTaskStore();
  const [showMap, setShowMap] = useState(false);

  const { control, handleSubmit, reset, setValue } = useForm<taskValidationType>({
    resolver: zodResolver(taskValidationSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      dateTime: task.dateTime,
      location: task.location,
    },
  });

  useEffect(() => {
    reset({
      title: task.title,
      description: task.description,
      dateTime: task.dateTime,
      location: task.location,
    });
  }, [task, reset]);

  const handleMapMessage = async (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'selectLocation') {
        const address = await reverseGeocode(data.latitude, data.longitude);
        setValue('location', address);
        setShowMap(false);
      }
    } catch (error) {
      console.error('Ошибка парсинга сообщения из WebView:', error);
    }
  };

  const onSubmit = (data: taskValidationType) => {
    const updatedTask: ITask = {
      ...task,
      ...data,
    };
    updateTask(updatedTask);
    onClose();
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    onClose();
  };

  const handleMapClose = () => {
    setShowMap(false);
  };

  const modalStyles = theme === 'dark' ? darkModalStyles : lightModalStyles;

  return (
    <Modal isVisible={isVisible} animationIn="zoomIn" animationOut="zoomOut">
      <View style={[styles.modalContainer, modalStyles.modalContainer]}>
        <Text style={[styles.modalTitle, modalStyles.modalTitle]}>Редактировать задачу</Text>

        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <TextInput
                placeholder="Название"
                placeholderTextColor={
                  theme === 'dark' ? colorTheme.colors.TEXT_DARK : colorTheme.colors.TEXT_LIGHT
                }
                value={field.value}
                onChangeText={field.onChange}
                style={[styles.input, modalStyles.input]}
              />
              {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
            </>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <TextInput
                placeholder="Описание"
                placeholderTextColor={
                  theme === 'dark' ? colorTheme.colors.TEXT_DARK : colorTheme.colors.TEXT_LIGHT
                }
                value={field.value}
                onChangeText={field.onChange}
                style={[styles.input, modalStyles.input]}
              />
              {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
            </>
          )}
        />

        <Controller
          name="dateTime"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <TextInput
                placeholder="Дата и время"
                placeholderTextColor={
                  theme === 'dark' ? colorTheme.colors.TEXT_DARK : colorTheme.colors.TEXT_LIGHT
                }
                value={field.value}
                onChangeText={field.onChange}
                style={[styles.input, modalStyles.input]}
              />
              {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
            </>
          )}
        />

        <Controller
          name="location"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <View style={styles.locationContainer}>
                <TextInput
                  placeholder="Местоположение"
                  placeholderTextColor={
                    theme === 'dark' ? colorTheme.colors.TEXT_DARK : colorTheme.colors.TEXT_LIGHT
                  }
                  value={field.value}
                  onChangeText={field.onChange}
                  style={[styles.input, modalStyles.input, { flex: 1 }]}
                />
                <TouchableOpacity
                  onPress={() => setShowMap(true)}
                  style={[styles.mapIconButton, modalStyles.mapIconButton]}
                >
                  <MaterialIcons name="map" size={24} color={colorTheme.colors.TEXT_LIGHT} />
                </TouchableOpacity>
              </View>
              {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
            </>
          )}
        />

        <View style={styles.buttonContainer}>
          <Button title="Сохранить изменения" onPress={handleSubmit(onSubmit)} />
          <TouchableOpacity
            onPress={handleDeleteTask}
            style={[styles.deleteButton, modalStyles.deleteButton]}
          >
            <Text style={[styles.deleteText, modalStyles.deleteText]}>Удалить задачу</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClose}
            style={[styles.cancelButton, modalStyles.cancelButton]}
          >
            <Text style={[styles.cancelText, modalStyles.cancelText]}>Отмена</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MapModal isVisible={showMap} onClose={handleMapClose} onMessage={handleMapMessage} />
    </Modal>
  );
};

export default EditTaskModal;
