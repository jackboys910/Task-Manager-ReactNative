import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const syncTasks = async () => {
  const connection = await NetInfo.fetch();
  if (connection.isConnected) {
    const localTasks = await AsyncStorage.getItem('tasks');
    if (localTasks) {
      const tasks = JSON.parse(localTasks);
      for (const task of tasks) {
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
          });
          if (!response.ok) {
            console.error('Ошибка при синхронизации:', response.statusText);
          }
        } catch (error) {
          console.error('Ошибка подключения к API:', error);
        }
      }
    }
  } else {
    console.log('Нет подключения к интернету.');
  }
};
