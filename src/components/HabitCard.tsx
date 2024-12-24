import React, { useState } from 'react';
import { CheckCircle2, Circle, Trash2, Edit2 } from 'lucide-react';
import { Habit } from '../types/habit';
import { calculateStreak } from '../utils/habitUtils';
import { DeleteHabitDialog } from './DeleteHabitDialog';
import { EditHabitDialog } from './EditHabitDialog';

interface HabitCardProps {
  habit: Habit;
  onToggle: (habit: Habit) => void;
  onEdit: (habitId: string, updates: Partial<Habit>) => void;
  onDelete: (habitId: string) => void;
  isCompleted: boolean;
}

export function HabitCard({ habit, onToggle, onEdit, onDelete, isCompleted }: HabitCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const streak = calculateStreak(habit);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onToggle(habit)}
              className="focus:outline-none"
            >
              {isCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400" />
              )}
            </button>
            <div>
              <h3 className="font-semibold text-gray-800">{habit.title}</h3>
              {habit.description && (
                <p className="text-sm text-gray-600">{habit.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-600">
                Streak
              </div>
              <div className="text-lg font-bold text-gray-800">
                {streak} {streak === 1 ? 'day' : 'days'}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowEditDialog(true)}
                className="p-2 text-gray-400 hover:text-pink-500 rounded-full hover:bg-pink-50 transition-colors"
                title="Edit habit"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                title="Delete habit"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <DeleteHabitDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => onDelete(habit.id)}
        habitTitle={habit.title}
      />

      <EditHabitDialog
        habit={habit}
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSave={onEdit}
      />
    </>
  );
}