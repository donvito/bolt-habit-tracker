import type { Habit, Achievement, MotivationalQuote } from '../types';

const quotes: MotivationalQuote[] = [
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "productivity"
  },
  {
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown",
    category: "fitness"
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    category: "mindfulness"
  },
  {
    text: "Let food be thy medicine and medicine be thy food.",
    author: "Hippocrates",
    category: "nutrition"
  },
  {
    text: "Creativity is intelligence having fun.",
    author: "Albert Einstein",
    category: "creativity"
  },
  {
    text: "Investment in knowledge pays the best interest.",
    author: "Benjamin Franklin",
    category: "learning"
  }
];

const achievements: Achievement[] = [
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Complete a habit for 7 consecutive days',
    icon: '🏆'
  },
  {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Complete all morning habits before 9 AM',
    icon: '🌅'
  },
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: 'Maintain a 30-day streak',
    icon: '🔥'
  },
  {
    id: 'habit-collector',
    title: 'Habit Collector',
    description: 'Create habits in 5 different categories',
    icon: '🌟'
  }
];

export function getMotivationalQuote(category: Habit['category']): MotivationalQuote {
  const categoryQuotes = quotes.filter(q => q.category === category);
  if (categoryQuotes.length === 0) {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  return categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
}

export function getAchievements(habits: Habit[]): Achievement[] {
  const unlockedAchievements: Achievement[] = [];
  const today = new Date();

  // Week Warrior
  if (habits.some(h => h.streak >= 7)) {
    unlockedAchievements.push({
      ...achievements.find(a => a.id === 'week-warrior')!,
      unlockedAt: today.toISOString()
    });
  }

  // Streak Master
  if (habits.some(h => h.streak >= 30)) {
    unlockedAchievements.push({
      ...achievements.find(a => a.id === 'streak-master')!,
      unlockedAt: today.toISOString()
    });
  }

  // Habit Collector
  const uniqueCategories = new Set(habits.map(h => h.category));
  if (uniqueCategories.size >= 5) {
    unlockedAchievements.push({
      ...achievements.find(a => a.id === 'habit-collector')!,
      unlockedAt: today.toISOString()
    });
  }

  return unlockedAchievements;
}