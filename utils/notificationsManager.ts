import * as Notifications from 'expo-notifications';
import { parse, subMinutes, isAfter } from 'date-fns';

export const scheduleNotification = async (title: string, dateTime: string) => {
  try {
    const taskDate = parse(dateTime, 'dd.MM.yyyy HH:mm', new Date());
    const notificationTime = subMinutes(taskDate, 30);

    if (isAfter(notificationTime, new Date())) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body: 'На задачу осталось 30 минут!',
          sound: true,
        },
        // @ts-ignore
        trigger: notificationTime,
      });
    }
  } catch (error) {
    console.error('Ошибка при создании уведомления:', error);
  }
};
