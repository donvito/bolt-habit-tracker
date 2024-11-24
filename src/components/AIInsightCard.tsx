import React from 'react';
import { Lightbulb, AlertCircle, Trophy } from 'lucide-react';
import type { AIInsight } from '../types';

const icons = {
  success: Trophy,
  warning: AlertCircle,
  tip: Lightbulb,
};

const styles = {
  success: 'bg-green-50/80 text-green-700 border-green-200',
  warning: 'bg-amber-50/80 text-amber-700 border-amber-200',
  tip: 'bg-pink-50/80 text-pink-700 border-pink-200',
};

export function AIInsightCard({ insight }: { insight: AIInsight }) {
  const Icon = icons[insight.type];
  
  return (
    <div className={`rounded-xl p-4 border backdrop-blur-sm ${styles[insight.type]} flex items-start space-x-3 transition-all hover:scale-[1.01] duration-300`}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <p className="text-sm">{insight.message}</p>
    </div>
  );
}