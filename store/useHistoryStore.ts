import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { IHistoryItem } from '@/interfaces/IHistoryItem';

interface IHistoryState {
  history: IHistoryItem[];
  addHistory: (action: string, taskId: string, taskTitle: string) => void;
  loadHistory: () => void;
}

export const useHistoryStore = create<IHistoryState>((set, get) => ({
  history: [],
  addHistory: (action, taskId, taskTitle) => {
    const newHistoryItem = {
      action,
      timestamp: format(new Date(), 'dd.MM.yyyy HH:mm', { locale: ru }),
      taskId,
      taskTitle,
    };
    const updatedHistory = [newHistoryItem, ...get().history];
    set({ history: updatedHistory });
    AsyncStorage.setItem('history', JSON.stringify(updatedHistory));
  },
  loadHistory: async () => {
    const storedHistory = await AsyncStorage.getItem('history');
    if (storedHistory) {
      const parsedHistory: IHistoryItem[] = JSON.parse(storedHistory).sort(
        (a: IHistoryItem, b: IHistoryItem) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );
      set({ history: parsedHistory });
    }
  },
}));

useHistoryStore.getState().loadHistory();
