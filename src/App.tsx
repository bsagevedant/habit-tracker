import React, { useState } from 'react';
import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { NewHabitForm } from './components/NewHabitForm';
import { HabitList } from './components/HabitList';
import { useHabits } from './hooks/useHabits';

export default function App() {
  const { habits, toggleHabit, addHabit, editHabit, deleteHabit } = useHabits();
  const [showNewHabitForm, setShowNewHabitForm] = useState(false);

  const handleAddHabit = (habitData: Parameters<typeof addHabit>[0]) => {
    addHabit(habitData);
    setShowNewHabitForm(false);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Header onNewHabit={() => setShowNewHabitForm(!showNewHabitForm)} />
        <Stats habits={habits} />
        {showNewHabitForm && <NewHabitForm onSubmit={handleAddHabit} />}
        <HabitList
          habits={habits}
          onToggle={toggleHabit}
          onEdit={editHabit}
          onDelete={deleteHabit}
          today={today}
        />
      </div>
    </div>
  );
}