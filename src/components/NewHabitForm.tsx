import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { habitColors } from '../utils/habitUtils';
import { FrequencySelect } from './FrequencySelect';
import { FrequencyType } from '../types/habit';

interface NewHabitFormProps {
  onSubmit: (habit: {
    title: string;
    description: string;
    frequency: FrequencyType;
    customDays?: number[];
    color: string;
  }) => void;
}

export function NewHabitForm({ onSubmit }: NewHabitFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<FrequencyType>('daily');
  const [customDays, setCustomDays] = useState<number[]>([]);
  const [color, setColor] = useState(habitColors[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({
      title,
      description,
      frequency,
      ...(frequency === 'custom' ? { customDays } : {}),
      color
    });
    
    setTitle('');
    setDescription('');
    setFrequency('daily');
    setCustomDays([]);
    setColor(habitColors[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Habit</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            placeholder="Enter habit title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            placeholder="Enter habit description"
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

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Habit
        </button>
      </div>
    </form>
  );
}