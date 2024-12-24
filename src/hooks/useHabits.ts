import { useState, useEffect } from 'react';
import { Habit } from '../types/habit';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((habit: any) => ({
        ...habit,
        createdAt: new Date(habit.createdAt),
        completedDates: habit.completedDates.map((date: string) => new Date(date))
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const toggleHabit = (habit: Habit) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isCompletedToday = habit.completedDates.some(
      date => new Date(date).setHours(0, 0, 0, 0) === today.getTime()
    );

    setHabits(prevHabits =>
      prevHabits.map(h => {
        if (h.id === habit.id) {
          return {
            ...h,
            completedDates: isCompletedToday
              ? h.completedDates.filter(
                  date => new Date(date).setHours(0, 0, 0, 0) !== today.getTime()
                )
              : [...h.completedDates, new Date()]
          };
        }
        return h;
      })
    );
  };

  const addHabit = (newHabit: {
    title: string;
    description: string;
    frequency: Habit['frequency'];
    customDays?: number[];
    color: string;
  }) => {
    const habit: Habit = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      completedDates: [],
      archived: false,
      ...newHabit
    };
    
    setHabits(prev => [...prev, habit]);
  };

  const editHabit = (habitId: string, updates: Partial<Habit>) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === habitId
          ? { ...habit, ...updates }
          : habit
      )
    );
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prevHabits => prevHabits.filter(h => h.id !== habitId));
  };

  return {
    habits,
    toggleHabit,
    addHabit,
    editHabit,
    deleteHabit
  };
}