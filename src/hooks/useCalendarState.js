import { useState } from 'react';

export const useCalendarState = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selection, setSelection] = useState({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState(null);
  
  // NEW: State to track which way the calendar is flipping
  const [slideDirection, setSlideDirection] = useState(''); 

  const handleDateClick = (date) => {
    setSelection((prev) => {
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null };
      }
      if (date < prev.start) {
        return { start: date, end: prev.start }; 
      }
      return { start: prev.start, end: date };
    });
  };

  const nextMonth = () => {
    setSlideDirection('next'); // Triggers slide-up
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setSlideDirection('prev'); // Triggers slide-down
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const jumpToToday = () => {
    setSlideDirection('next'); 
    setCurrentDate(new Date());
  };

  return {
    currentDate,
    selection,
    hoverDate,
    setHoverDate,
    handleDateClick,
    nextMonth,
    prevMonth,
    jumpToToday,
    slideDirection // EXPORT THE NEW STATE
  };
};