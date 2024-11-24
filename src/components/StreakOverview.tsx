import React from 'react';
import { BarChart, Activity } from 'lucide-react';
import type { Habit } from '../types';

interface StreakOverviewProps {
  habits: Habit[];
}

export function StreakOverview({ habits }: StreakOverviewProps) {
  const sortedHabits = [...habits]
    .filter(h => !h.archived)
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 5);

  const maxStreak = Math.max(...sortedHabits.map(h => h.streak));
  
  return (
    <div className="glass-effect rounded-2xl p-6 mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="w-6 h-6 text-pink-500" />
        <h2 className="text-xl font-semibold text-gray-900">Streak Overview</h2>
      </div>
      
      <div className="space-y-4">
        {sortedHabits.map(habit => (
          <div key={habit.id} className="flex items-center">
            <div className="w-32 sm:w-48 truncate mr-4">
              <span className="text-sm font-medium text-gray-700">{habit.name}</span>
            </div>
            <div className="flex-1 h-8 relative">
              <div className="absolute inset-y-0 left-0 bg-pink-100 rounded-full w-full" />
              <div
                className="absolute inset-y-0 left-0 bg-pink-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(habit.streak / maxStreak) * 100}%`,
                }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <span className="text-sm font-semibold">
                  {habit.streak} {habit.streak === 1 ? 'day' : 'days'}
                </span>
              </div>
            </div>
          </div>
        ))}

        {sortedHabits.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No active habits yet. Start building your streaks!
          </div>
        )}
      </div>
    </div>
  );
}