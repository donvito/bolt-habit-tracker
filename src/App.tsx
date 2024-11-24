import React, { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';
import { PlusCircle, Brain, Sparkles, Archive } from 'lucide-react';
import { HabitCard } from './components/HabitCard';
import { AIInsightCard } from './components/AIInsightCard';
import { AddHabitModal } from './components/AddHabitModal';
import { StreakOverview } from './components/StreakOverview';
import { MotivationCard } from './components/MotivationCard';
import { generateAIInsights } from './utils/aiInsights';
import { getMotivationalQuote, getAchievements } from './utils/motivation';
import { loadFromStorage, saveToStorage } from './utils/storage';
import type { Habit } from './types';

function generateSampleDates() {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    if (Math.random() > 0.3) {
      dates.push(format(subDays(today, i), 'yyyy-MM-dd'));
    }
  }
  return dates;
}

function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [habits, setHabits] = useState<Habit[]>(() => loadFromStorage('habits') || [
    {
      id: '1',
      name: 'Morning Meditation',
      streak: 5,
      completedDates: generateSampleDates(),
      category: 'mindfulness',
      timeOfDay: 'morning'
    },
    {
      id: '2',
      name: 'Read 30 minutes',
      streak: 3,
      completedDates: generateSampleDates(),
      category: 'productivity',
      timeOfDay: 'evening'
    }
  ]);

  useEffect(() => {
    saveToStorage('habits', habits);
  }, [habits]);

  const handleComplete = (id: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setHabits(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id === id) {
          const isAlreadyCompleted = habit.completedDates.includes(today);
          const completedDates = isAlreadyCompleted
            ? habit.completedDates.filter(date => date !== today)
            : [...habit.completedDates, today];
          
          // Calculate new streak
          const sortedDates = [...completedDates].sort();
          let streak = 0;
          let currentDate = new Date();
          
          while (sortedDates.includes(format(currentDate, 'yyyy-MM-dd'))) {
            streak++;
            currentDate = subDays(currentDate, 1);
          }

          return {
            ...habit,
            completedDates,
            streak
          };
        }
        return habit;
      })
    );
  };

  const handleArchive = (id: string) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === id ? { ...habit, archived: !habit.archived } : habit
      )
    );
  };

  const handleAddHabit = (newHabit: Omit<Habit, 'id' | 'streak' | 'completedDates'>) => {
    const habit: Habit = {
      ...newHabit,
      id: crypto.randomUUID(),
      streak: 0,
      completedDates: []
    };
    setHabits(prev => [...prev, habit]);
  };

  const handleEdit = (id: string, updates: Partial<Habit>) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === id ? { ...habit, ...updates } : habit
      )
    );
  };

  const activeHabits = habits.filter(h => !h.archived);
  const archivedHabits = habits.filter(h => h.archived);
  const insights = generateAIInsights(activeHabits);
  const achievements = getAchievements(habits);
  
  // Get a motivational quote based on the habit with the highest streak
  const topHabit = [...activeHabits].sort((a, b) => b.streak - a.streak)[0];
  const quote = getMotivationalQuote(topHabit?.category || 'productivity');

  return (
    <div className="min-h-screen hero-pattern">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <header className="mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center space-x-2 mb-2">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500" />
            <h1 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-700">
              Daily Habit Tracker
            </h1>
          </div>
          <p className="text-gray-600 mb-6 sm:mb-8">Build better habits, one day at a time</p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all duration-300 shadow-pink w-full sm:w-auto"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add New Habit</span>
            </button>
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 w-full sm:w-auto ${
                showArchived 
                  ? 'bg-pink-500 text-white shadow-pink' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Archive className="w-5 h-5" />
              <span>{showArchived ? 'Show Active' : 'Show Archived'}</span>
            </button>
          </div>
        </header>

        {!showArchived && (
          <>
            <MotivationCard quote={quote} achievements={achievements} />
            <StreakOverview habits={habits} />
            
            {insights.length > 0 && (
              <div className="glass-effect rounded-2xl p-4 sm:p-6 shadow-pink mb-6 sm:mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Brain className="w-6 h-6 text-pink-500" />
                  <h2 className="text-xl font-semibold text-pink-700">AI Insights</h2>
                </div>
                <div className="space-y-3">
                  {insights.map((insight, index) => (
                    <AIInsightCard key={index} insight={insight} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {(showArchived ? archivedHabits : activeHabits).map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onComplete={handleComplete}
              onArchive={handleArchive}
              onEdit={handleEdit}
            />
          ))}
        </div>

        {showArchived && archivedHabits.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No archived habits yet
          </div>
        )}
      </div>

      {showAddModal && (
        <AddHabitModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddHabit}
        />
      )}
    </div>
  );
}

export default App;