import { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { WebViewMessageEvent } from 'react-native-webview';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import { IAttachment } from '@/interfaces/IAttachment';
import { taskValidationSchema, taskValidationType } from '@/utils/validation/taskValidation';
import { useTaskStore } from '@/store/useTaskStore';
import { useThemeStore } from '@/store/useThemeStore';
import { lightModalStyles } from '@/styles/modal/lightThemeModal';
import { darkModalStyles } from '@/styles/modal/darkThemeModal';
import { reverseGeocode } from '@/utils/reverseGeocode';
import MapModal from '../MapModal';
import { ITask } from '@/interfaces/ITask';
import { theme as colorTheme } from '@/constants/theme';
import { styles } from './index.styles';

interface ITaskModalProps {
  isVisible: boolean;
  onClose: () => void;
}

interface IWebViewData {
  type: string;
  latitude: number;
  longitude: number;
}

const TaskModal: React.FC<ITaskModalProps> = ({ isVisible, onClose }) => {
  const { theme } = useThemeStore();
  const { addTask } = useTaskStore();
  const [showMap, setShowMap] = useState(false);
  const [attachments, setAttachments] = useState<IAttachment[]>([]);

  const { control, handleSubmit, reset, setValue } = useForm<taskValidationType>({
    resolver: zodResolver(taskValidationSchema),
  });

  const onSumbit = (data: taskValidationType) => {
    const newTask: ITask = {
      id: Math.random().toString(),
      ...data,
      location: data.location,
      attachments,
    };
    addTask(newTask);
    reset();
    setAttachments([]);
    onClose();
  };

  const handleMapMessage = async (event: WebViewMessageEvent) => {
    try {
      const data: IWebViewData = JSON.parse(event.nativeEvent.data);
      if (data.type === 'selectLocation') {
        const { latitude, longitude } = data;
        const address = await reverseGeocode(latitude, longitude);
        setValue('location', address);
        setShowMap(false);
      }
    } catch (error) {
      console.error('Ошибка парсинга сообщения из WebView:', error);
    }
  };

  const handleImagePicker = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Разрешение на доступ к библиотеке изображений необходимо!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const newAttachment: IAttachment = {
          type: 'image',
          url: result.assets[0].uri,
          name: `image-${Date.now()}.jpg`,
        };
        setAttachments((prev) => [...prev, newAttachment]);
      }
    } catch (error) {
      console.error('Ошибка выбора изображения:', error);
    }
  };

  const handleMapClose = () => {
    setShowMap(false);
  };

  const handleModalClose = () => {
    reset();
    setAttachments([]);
    onClose();
  };

  const modalStyles = theme === 'dark' ? darkModalStyles : lightModalStyles;

  return (
    <Modal isVisible={isVisible} animationIn="zoomIn" animationOut="zoomOut">
      <View style={[styles.modalContainer, modalStyles.modalContainer]}>
        <Text style={[styles.modalTitle, modalStyles.modalTitle]}>Добавить задачу</Text>

        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <TextInput
                placeholder="Название"
                placeholderTextColor={
                  theme === 'dark'
                    ? colorTheme.colors.BACKGROUND_LIGHT
                    : colorTheme.colors.TEXT_LIGHT
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
                  theme === 'dark'
                    ? colorTheme.colors.BACKGROUND_LIGHT
                    : colorTheme.colors.TEXT_LIGHT
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
                  theme === 'dark'
                    ? colorTheme.colors.BACKGROUND_LIGHT
                    : colorTheme.colors.TEXT_LIGHT
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
                    theme === 'dark'
                      ? colorTheme.colors.BACKGROUND_LIGHT
                      : colorTheme.colors.TEXT_LIGHT
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

        <View style={styles.attachmentContainer}>
          {attachments.map((file, index) => (
            <View key={index} style={styles.attachmentItem}>
              <Text style={styles.attachmentIcon}>📎</Text>
              <Text style={[styles.attachmentText, modalStyles.attachmentText]}>{file.name}</Text>
            </View>
          ))}

          <Button title="Прикрепить файл" onPress={handleImagePicker} />
        </View>

        <Button title="Добавить" onPress={handleSubmit(onSumbit)} />
        <TouchableOpacity
          onPress={handleModalClose}
          style={[styles.cancelButton, modalStyles.cancelButton]}
        >
          <Text style={[styles.cancelText, modalStyles.cancelText]}>Отмена</Text>
        </TouchableOpacity>
      </View>

      <MapModal isVisible={showMap} onClose={handleMapClose} onMessage={handleMapMessage} />
    </Modal>
  );
};

export default TaskModal;
