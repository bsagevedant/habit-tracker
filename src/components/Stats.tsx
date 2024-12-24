import React from 'react';
import { Trophy, Calendar, BarChart2 } from 'lucide-react';
import { Habit } from '../types/habit';
import { calculateStreak, getCompletionRate } from '../utils/habitUtils';

interface StatsProps {
  habits: Habit[];
}

export function Stats({ habits }: StatsProps) {
  const totalHabits = habits.length;
  const activeHabits = habits.filter(h => !h.archived).length;
  const bestStreak = Math.max(...habits.map(calculateStreak));
  const averageCompletion = habits.length
    ? habits.reduce((acc, habit) => acc + getCompletionRate(habit), 0) / habits.length
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-pink-500" />
          <div>
            <p className="text-sm text-gray-600">Active Habits</p>
            <p className="text-2xl font-bold text-gray-800">{activeHabits}/{totalHabits}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center space-x-3">
          <Trophy className="w-6 h-6 text-pink-500" />
          <div>
            <p className="text-sm text-gray-600">Best Streak</p>
            <p className="text-2xl font-bold text-gray-800">{bestStreak} days</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center space-x-3">
          <BarChart2 className="w-6 h-6 text-pink-500" />
          <div>
            <p className="text-sm text-gray-600">Completion Rate</p>
            <p className="text-2xl font-bold text-gray-800">
              {averageCompletion.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}