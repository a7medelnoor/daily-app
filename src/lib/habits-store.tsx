import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { dayKey } from './dates';

export type Habit = { id: string; name: string; createdAt: string };

type HabitsStore = {
  habits: Habit[];
  doneDays: Record<string, string[]>; // habit id → days it was checked
  loading: boolean;
  error: string | null;
  addHabit: (name: string) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  toggleToday: (id: string) => Promise<void>;
};

const HabitsContext = createContext<HabitsStore | null>(null);

// Mission 1: habits live in memory. They disappear when the app reloads. Mission 3 fixes that.
export function HabitsProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [doneDays, setDoneDays] = useState<Record<string, string[]>>({});

  const addHabit = useCallback(async (name: string) => {
    const habit = { id: String(Date.now()), name: name.trim(), createdAt: new Date().toISOString() };
    setHabits((list) => [...list, habit]);
  }, []);

  const deleteHabit = useCallback(async (id: string) => {
    setHabits((list) => list.filter((h) => h.id !== id));
    setDoneDays(({ [id]: _removed, ...rest }) => rest);
  }, []);

  const toggleToday = useCallback(async (id: string) => {
    const today = dayKey();
    setDoneDays((all) => {
      const days = all[id] ?? [];
      return { ...all, [id]: days.includes(today) ? days.filter((d) => d !== today) : [...days, today] };
    });
  }, []);

  const value = useMemo(
    () => ({ habits, doneDays, loading: false, error: null, addHabit, deleteHabit, toggleToday }),
    [habits, doneDays, addHabit, deleteHabit, toggleToday],
  );

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
}

export function useHabits() {
  const store = useContext(HabitsContext);
  if (!store) throw new Error('useHabits must be used inside <HabitsProvider>');
  return store;
}
