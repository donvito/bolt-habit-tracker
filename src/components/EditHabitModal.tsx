import React, { useState } from 'react';
import { X, Pencil } from 'lucide-react';
import type { Habit } from '../types';

interface EditHabitModalProps {
  habit: Habit;
  onClose: () => void;
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

export function EditHabitModal({ habit, onClose, onEdit }: EditHabitModalProps) {
  const [name, setName] = useState(habit.name);
  const [category, setCategory] = useState<Habit['category']>(habit.category);
  const [timeOfDay, setTimeOfDay] = useState<Habit['timeOfDay']>(habit.timeOfDay);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(habit.id, { name, category, timeOfDay });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm z-50">
      <div className="glass-effect rounded-2xl max-w-md w-full overflow-hidden">
        <div className="h-32 relative">
          <img
            src={categoryImages[category]}
            alt={category}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-pink-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="absolute bottom-4 left-6 text-2xl font-semibold text-white">
            Edit Habit
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Habit Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Habit['category'])}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="health">Health</option>
                <option value="productivity">Productivity</option>
                <option value="mindfulness">Mindfulness</option>
                <option value="fitness">Fitness</option>
                <option value="creativity">Creativity</option>
                <option value="learning">Learning</option>
                <option value="social">Social</option>
                <option value="finance">Finance</option>
                <option value="selfcare">Self Care</option>
                <option value="nutrition">Nutrition</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time of Day
              </label>
              <select
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(e.target.value as Habit['timeOfDay'])}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="anytime">Anytime</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 shadow-pink"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}