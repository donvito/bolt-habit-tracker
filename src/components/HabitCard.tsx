import React, { useState } from 'react';
import { format } from 'date-fns';
import { Trophy, Flame, CheckCircle2, Archive, Pencil } from 'lucide-react';
import { EditHabitModal } from './EditHabitModal';
import { StreakGraph } from './StreakGraph';
import type { Habit } from '../types';

interface HabitCardProps {
  habit: Habit;
  onComplete: (id: string) => void;
  onArchive: (id: string) => void;
  onEdit: (id: string, updates: Partial<Habit>) => void;
}

const categoryImages = {
  health: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=120&q=80',
  productivity: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=120&q=80',
  mindfulness: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=120&q=80',
  fitness: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=120&q=80',
  creativity: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=120&q=80',
  learning: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=120&q=80',
  social: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=120&q=80',
  finance: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=120&q=80',
  selfcare: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=120&q=80',
  nutrition: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=120&q=80'
};

const categoryColors = {
  health: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  productivity: 'bg-blue-100 text-blue-700 border-blue-200',
  mindfulness: 'bg-purple-100 text-purple-700 border-purple-200',
  fitness: 'bg-orange-100 text-orange-700 border-orange-200',
  creativity: 'bg-pink-100 text-pink-700 border-pink-200',
  learning: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  social: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  finance: 'bg-green-100 text-green-700 border-green-200',
  selfcare: 'bg-rose-100 text-rose-700 border-rose-200',
  nutrition: 'bg-lime-100 text-lime-700 border-lime-200'
};

export function HabitCard({ habit, onComplete, onArchive, onEdit }: HabitCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const isCompletedToday = habit.completedDates.includes(format(new Date(), 'yyyy-MM-dd'));

  return (
    <>
      <div className={`glass-effect rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] duration-300 ${
        habit.archived ? 'opacity-75' : ''
      }`}>
        <div className="h-32 relative overflow-hidden">
          <img
            src={categoryImages[habit.category]}
            alt={habit.category}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-4 right-4 flex space-x-2">
            {!habit.archived && (
              <>
                <button
                  onClick={() => onComplete(habit.id)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isCompletedToday
                      ? 'bg-pink-500 text-white scale-110'
                      : 'bg-white/90 text-gray-600 hover:bg-pink-500 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="p-3 rounded-full bg-white/90 text-gray-600 hover:bg-pink-500 hover:text-white transition-all duration-300"
                >
                  <Pencil className="w-6 h-6" />
                </button>
              </>
            )}
            <button
              onClick={() => onArchive(habit.id)}
              className="p-3 rounded-full bg-white/90 text-gray-600 hover:bg-pink-500 hover:text-white transition-all duration-300"
              title={habit.archived ? 'Unarchive habit' : 'Archive habit'}
            >
              <Archive className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{habit.name}</h3>
              <span className={`inline-block px-4 py-1.5 rounded-full text-sm border ${categoryColors[habit.category]}`}>
                {habit.category}
              </span>
            </div>
          </div>
          
          <div className="mt-6">
            <StreakGraph completedDates={habit.completedDates} />
          </div>
          
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2 bg-pink-50 px-3 py-1.5 rounded-full">
              <Flame className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-medium text-pink-700">
                {habit.streak} day streak
              </span>
            </div>
            {habit.streak >= 7 && (
              <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1.5 rounded-full">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700">
                  Week achieved!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditHabitModal
          habit={habit}
          onClose={() => setShowEditModal(false)}
          onEdit={onEdit}
        />
      )}
    </>
  );
}