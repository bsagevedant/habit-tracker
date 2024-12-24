import React from 'react';
import { Habit } from '../types/habit';
import { HabitCard } from './HabitCard';

interface HabitListProps {
  habits: Habit[];
  onToggle: (habit: Habit) => void;
  onEdit: (habitId: string, updates: Partial<Habit>) => void;
  onDelete: (habitId: string) => void;
  today: Date;
}

export function HabitList({ habits, onToggle, onEdit, onDelete, today }: HabitListProps) {
  return (
    <div className="space-y-4">
      {habits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          isCompleted={habit.completedDates.some(
            date => new Date(date).setHours(0, 0, 0, 0) === today.getTime()
          )}
        />
      ))}
    </div>
  );
}