import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Habit, FrequencyType } from '../types/habit';
import { FrequencySelect } from './FrequencySelect';
import { habitColors } from '../utils/habitUtils';

interface EditHabitDialogProps {
  habit: Habit;
  isOpen: boolean;
  onClose: () => void;
  onSave: (habitId: string, updates: Partial<Habit>) => void;
}

export function EditHabitDialog({ habit, isOpen, onClose, onSave }: EditHabitDialogProps) {
  const [title, setTitle] = useState(habit.title);
  const [description, setDescription] = useState(habit.description || '');
  const [frequency, setFrequency] = useState<FrequencyType>(habit.frequency);
  const [customDays, setCustomDays] = useState<number[]>(habit.customDays || []);
  const [color, setColor] = useState(habit.color);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave(habit.id, {
      title,
      description,
      frequency,
      customDays: frequency === 'custom' ? customDays : undefined,
      color,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Edit Habit</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Frequency</label>
              <FrequencySelect
                value={frequency}
                onChange={setFrequency}
                onCustomDaysChange={setCustomDays}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <div className="mt-2 flex gap-2">
                {habitColors.map((colorOption) => (
                  <button
                    key={colorOption}
                    type="button"
                    className={`w-6 h-6 rounded-full ${colorOption} ${
                      color === colorOption ? 'ring-2 ring-offset-2 ring-pink-500' : ''
                    }`}
                    onClick={() => setColor(colorOption)}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}