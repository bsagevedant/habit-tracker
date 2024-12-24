export type FrequencyType = 'daily' | 'weekly' | 'weekdays' | 'weekends' | 'custom';

export interface Habit {
  id: string;
  title: string;
  description?: string;
  frequency: FrequencyType;
  customDays?: number[]; // 0-6, where 0 is Sunday
  createdAt: Date;
  completedDates: Date[];
  color: string;
  archived: boolean;
}

export interface HabitCompletion {
  date: Date;
  completed: boolean;
}