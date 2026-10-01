import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './auth';
import { dayKey } from './dates';
import { supabase } from './supabase';

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

// Mission 3: same functions as the in-memory store, now backed by Supabase.
export function HabitsProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const userId = session?.user.id;
  const [habits, setHabits] = useState<Habit[]>([]);
  const [doneDays, setDoneDays] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reload whenever the signed-in user changes, and clear everything on sign-out.
  useEffect(() => {
    setHabits([]);
    setDoneDays({});
    if (!userId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([
      supabase.from('habits').select('id, name, created_at').order('created_at'),
      supabase.from('checkins').select('habit_id, day'),
    ]).then(([habitsRes, checkinsRes]) => {
      if (cancelled) return;
      const failure = habitsRes.error ?? checkinsRes.error;
      if (failure) {
        setError(failure.message);
      } else {
        setHabits((habitsRes.data ?? []).map((h) => ({ id: h.id, name: h.name, createdAt: h.created_at })));
        const grouped: Record<string, string[]> = {};
        for (const c of checkinsRes.data ?? []) (grouped[c.habit_id] ??= []).push(c.day);
        setDoneDays(grouped);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const addHabit = useCallback(async (name: string) => {
    const { data, error } = await supabase.from('habits').insert({ name: name.trim() }).select('id, name, created_at').single();
    if (error) throw new Error(error.message);
    setHabits((list) => [...list, { id: data.id, name: data.name, createdAt: data.created_at }]);
  }, []);

  const deleteHabit = useCallback(async (id: string) => {
    const { error } = await supabase.from('habits').delete().eq('id', id);
    if (error) throw new Error(error.message);
    setHabits((list) => list.filter((h) => h.id !== id));
    setDoneDays(({ [id]: _removed, ...rest }) => rest);
  }, []);

  const toggleToday = useCallback(
    async (id: string) => {
      const today = dayKey();
      const wasDone = (doneDays[id] ?? []).includes(today);
      const apply = (done: boolean) =>
        setDoneDays((all) => {
          const days = (all[id] ?? []).filter((d) => d !== today);
          return { ...all, [id]: done ? [...days, today] : days };
        });

      apply(!wasDone); // update the screen first, then the server
      const { error } = wasDone
        ? await supabase.from('checkins').delete().eq('habit_id', id).eq('day', today)
        : await supabase.from('checkins').insert({ habit_id: id, day: today });
      if (error) {
        apply(wasDone); // roll back
        setError('Could not save. Check your connection and try again.');
      }
    },
    [doneDays],
  );

  const value = useMemo(
    () => ({ habits, doneDays, loading, error, addHabit, deleteHabit, toggleToday }),
    [habits, doneDays, loading, error, addHabit, deleteHabit, toggleToday],
  );

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
}

export function useHabits() {
  const store = useContext(HabitsContext);
  if (!store) throw new Error('useHabits must be used inside <HabitsProvider>');
  return store;
}
