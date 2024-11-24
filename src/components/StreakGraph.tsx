import React from 'react';
import { format, subDays } from 'date-fns';

interface StreakGraphProps {
  completedDates: string[];
  days?: number;
}

export function StreakGraph({ completedDates, days = 7 }: StreakGraphProps) {
  const today = new Date();
  const dates = Array.from({ length: days }, (_, i) => {
    const date = subDays(today, days - 1 - i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const isCompleted = completedDates.includes(dateStr);
    
    return {
      date: format(date, 'E'),
      dateStr,
      isCompleted
    };
  });

  return (
    <div className="flex items-end space-x-1.5">
      {dates.map(({ date, dateStr, isCompleted }) => (
        <div key={dateStr} className="flex flex-col items-center">
          <div
            className={`w-6 rounded-sm transition-all duration-300 ${
              isCompleted
                ? 'bg-pink-500 hover:bg-pink-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            style={{ height: isCompleted ? '24px' : '8px' }}
          />
          <span className="text-xs text-gray-500 mt-1">{date}</span>
        </div>
      ))}
    </div>
  );
}