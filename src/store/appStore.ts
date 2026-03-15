import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  hasCompletedOnboarding: boolean;
  theme: 'light' | 'dark' | 'system';
  selectedDate: string;
  activeFilters: string[];
  viewMode: 'list' | 'kanban';
  timerState: {
    isRunning: boolean;
    remainingSeconds: number;
    mode: 'pomodoro' | 'shortBreak' | 'longBreak';
    linkedTaskId: number | null;
  };
  quickAddVisible: boolean;
  setHasCompletedOnboarding: (val: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setSelectedDate: (date: string) => void;
  setActiveFilters: (filters: string[]) => void;
  setViewMode: (mode: 'list' | 'kanban') => void;
  setTimerState: (state: Partial<AppState['timerState']>) => void;
  setQuickAddVisible: (visible: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      theme: 'system',
      selectedDate: new Date().toISOString().split('T')[0],
      activeFilters: [],
      viewMode: 'list',
      timerState: {
        isRunning: false,
        remainingSeconds: 25 * 60,
        mode: 'pomodoro',
        linkedTaskId: null,
      },
      quickAddVisible: false,
      setHasCompletedOnboarding: (val) => set({ hasCompletedOnboarding: val }),
      setTheme: (theme) => set({ theme }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setActiveFilters: (filters) => set({ activeFilters: filters }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setTimerState: (state) => set((prev) => ({ timerState: { ...prev.timerState, ...state } })),
      setQuickAddVisible: (visible) => set({ quickAddVisible: visible }),
    }),
    {
      name: 'focusflow-storage',
    }
  )
);
