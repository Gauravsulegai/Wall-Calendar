export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export const generateCalendarGrid = (year, month) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  // Get the total number of days in the previous month
  const prevMonthDays = new Date(year, month, 0).getDate();
  
  const grid = [];
  
  // 1. Padding for previous month
  for (let i = 0; i < firstDay; i++) {
    grid.push({ 
      date: new Date(year, month - 1, prevMonthDays - firstDay + i + 1), 
      isCurrentMonth: false 
    });
  }
  
  // 2. Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    grid.push({ 
      date: new Date(year, month, i), 
      isCurrentMonth: true 
    });
  }
  
  // 3. Padding for next month to strictly finish the current row
  // This calculates how many empty slots are left in the final week
  const remainingCells = (7 - (grid.length % 7)) % 7; 
  for (let i = 1; i <= remainingCells; i++) {
    grid.push({ 
      date: new Date(year, month + 1, i), 
      isCurrentMonth: false 
    });
  }
  
  return grid;
};

export const isDateInRange = (date, start, end) => {
  if (!start || !end || !date) return false;
  
  const targetTime = date.getTime();
  const startTime = start.getTime();
  const endTime = end.getTime();
  
  return (
    (targetTime >= startTime && targetTime <= endTime) ||
    (targetTime >= endTime && targetTime <= startTime)
  );
};

export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};