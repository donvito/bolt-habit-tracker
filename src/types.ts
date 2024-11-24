export interface Habit {
  id: string;
  name: string;
  streak: number;
  completedDates: string[];
  category: 'health' | 'productivity' | 'mindfulness' | 'fitness' | 'creativity' | 'learning' | 'social' | 'finance' | 'selfcare' | 'nutrition';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'anytime';
  archived?: boolean;
}

export interface AIInsight {
  type: 'success' | 'warning' | 'tip';
  message: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface MotivationalQuote {
  text: string;
  author: string;
  category: Habit['category'];
}