import React from 'react';
import { Quote, Award } from 'lucide-react';
import type { MotivationalQuote, Achievement } from '../types';

interface MotivationCardProps {
  quote: MotivationalQuote;
  achievements: Achievement[];
}

export function MotivationCard({ quote, achievements }: MotivationCardProps) {
  const recentAchievements = achievements
    .filter(a => a.unlockedAt)
    .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
    .slice(0, 3);

  return (
    <div className="glass-effect rounded-2xl p-6 mb-8">
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-4">
            <Quote className="w-5 h-5 text-pink-500" />
            <h3 className="text-lg font-semibold text-gray-900">Daily Inspiration</h3>
          </div>
          <blockquote className="text-gray-700 italic mb-2">"{quote.text}"</blockquote>
          <p className="text-sm text-gray-500">— {quote.author}</p>
        </div>

        {recentAchievements.length > 0 && (
          <div className="hidden sm:block border-l border-gray-200 pl-4 ml-4">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5 text-pink-500" />
              <h3 className="text-lg font-semibold text-gray-900">Recent Achievements</h3>
            </div>
            <div className="space-y-3">
              {recentAchievements.map(achievement => (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-2 text-sm bg-pink-50 rounded-lg p-2"
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{achievement.title}</p>
                    <p className="text-gray-500 text-xs">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}