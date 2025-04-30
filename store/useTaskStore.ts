import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITask } from '@/interfaces/ITask';
// import { syncTasks } from '@/utils/syncTasks';
import { scheduleNotification } from '@/utils/notificationsManager';
import { useHistoryStore } from './useHistoryStore';

interface ITaskState {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  updateTask: (updateTask: ITask) => void;
  deleteTask: (id: string) => void;
  loadTasks: () => Promise<void>;
}

export const useTaskStore = create<ITaskState>((set, get) => ({
  tasks: [],
  addTask: async (task) => {
    const updatedTasks = [task, ...get().tasks];
    set({ tasks: updatedTasks });
    AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    // syncTasks();

    const { addHistory } = useHistoryStore.getState();
    addHistory(`Создана задача: ${task.title}`, task.id, task.title);

    await scheduleNotification(task.title, task.dateTime);
  },
  updateTask: (updatedTask) => {
    const updatedTasks = get().tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );
    set({ tasks: updatedTasks });
    AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    // syncTasks();

    const { addHistory } = useHistoryStore.getState();
    addHistory(`Изменена задача: ${updatedTask.title}`, updatedTask.id, updatedTask.title);
  },
  deleteTask: (id) => {
    const taskToDelete = get().tasks.find((task) => task.id === id);
    const updatedTasks = get().tasks.filter((task) => task.id !== id);
    set({ tasks: updatedTasks });
    AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    // syncTasks();

    if (taskToDelete) {
      const { addHistory } = useHistoryStore.getState();
      addHistory(`Удалена задача: ${taskToDelete.title}`, taskToDelete.id, taskToDelete.title);
    }
  },
  loadTasks: async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) {
      set({ tasks: JSON.parse(storedTasks) });
      // syncTasks();
    }
  },
}));
