import React from 'react';
import { Layout, PlusCircle } from 'lucide-react';

interface HeaderProps {
  onNewHabit: () => void;
}

export function Header({ onNewHabit }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Layout className="w-8 h-8 text-pink-600" />
        <h1 className="text-2xl font-bold text-gray-800">Habit Tracker</h1>
      </div>
      <button
        onClick={onNewHabit}
        className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        New Habit
      </button>
    </header>
  );
}