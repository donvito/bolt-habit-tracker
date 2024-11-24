import type { Habit, AIInsight } from '../types';

export function generateAIInsights(habits: Habit[]): AIInsight[] {
  const insights: AIInsight[] = [];
  
  // Analyze streaks
  const highestStreak = Math.max(...habits.map(h => h.streak));
  if (highestStreak >= 7) {
    insights.push({
      type: 'success',
      message: `Impressive! You've maintained a ${highestStreak}-day streak. Keep up the momentum!`
    });
  }

  // Check for incomplete habits
  const incompleteTodayCount = habits.filter(h => 
    !h.completedDates.includes(new Date().toISOString().split('T')[0])
  ).length;

  if (incompleteTodayCount > 0) {
    insights.push({
      type: 'warning',
      message: `You have ${incompleteTodayCount} habits left to complete today. You've got this!`
    });
  }

  // Analyze patterns and provide tips
  const morningHabits = habits.filter(h => h.timeOfDay === 'morning').length;
  if (morningHabits === 0) {
    insights.push({
      type: 'tip',
      message: 'Consider adding a morning habit to start your day right. Morning routines can boost productivity!'
    });
  }

  return insights;
}