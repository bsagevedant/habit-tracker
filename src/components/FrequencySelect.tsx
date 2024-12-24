import React from 'react';
import { FREQUENCIES } from '../constants/frequencies';
import { FrequencyType } from '../types/habit';

interface FrequencySelectProps {
  value: FrequencyType;
  onChange: (value: FrequencyType) => void;
  onCustomDaysChange?: (days: number[]) => void;
}

export function FrequencySelect({ value, onChange, onCustomDaysChange }: FrequencySelectProps) {
  const handleCustomDaysChange = (day: number) => {
    if (!onCustomDaysChange) return;
    
    const currentDays = value === 'custom' ? [] : [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    
    onCustomDaysChange(newDays);
  };

  return (
    <div className="space-y-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as FrequencyType)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
      >
        {FREQUENCIES.map(freq => (
          <option key={freq.value} value={freq.value}>
            {freq.label}
          </option>
        ))}
      </select>
      
      {value === 'custom' && (
        <div className="flex gap-2 mt-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <button
              key={day}
              type="button"
              onClick={() => handleCustomDaysChange(index)}
              className="px-2 py-1 text-sm rounded-md border border-gray-300 hover:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {day}
            </button>
          ))}
        </div>
      )}
      
      <p className="text-sm text-gray-500">
        {FREQUENCIES.find(f => f.value === value)?.description}
      </p>
    </div>
  );
}