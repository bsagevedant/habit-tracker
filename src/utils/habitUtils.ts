import { Habit } from '../types/habit';

export function calculateStreak(habit: Habit): number {
  const sortedDates = [...habit.completedDates].sort((a, b) => b.getTime() - a.getTime());
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sortedDates.length; i++) {
    const date = new Date(sortedDates[i]);
    date.setHours(0, 0, 0, 0);
    
    if (i === 0 && date.getTime() !== today.getTime()) {
      break;
    }
    
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);
    
    if (date.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

export function getCompletionRate(habit: Habit): number {
  const totalDays = Math.ceil((new Date().getTime() - habit.createdAt.getTime()) / (1000 * 60 * 60 * 24));
  return (habit.completedDates.length / totalDays) * 100;
}

export const habitColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-indigo-500',
  'bg-orange-500',
];