import React from 'react';
import { generateCalendarGrid, isDateInRange, isSameDay } from '../../utils/dateUtils';

const DateGrid = ({
  currentDate,
  selection,
  hoverDate,
  setHoverDate,
  handleDateClick,
  nextMonth,
  prevMonth,
  jumpToToday,
  slideDirection // ADDED: New prop to track animation direction
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const grid = generateCalendarGrid(year, month);
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const realToday = new Date();
  const isCurrentMonthView = year === realToday.getFullYear() && month === realToday.getMonth();

  return (
    // ADDED: overflow-hidden so the sliding numbers don't clip over the header
    <div className="flex flex-col h-full select-none overflow-hidden pb-2">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 relative z-10 bg-white">
        <div>
          <div className="text-sm font-semibold text-slate-500 tracking-widest">{year}</div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-wider">
            {monthNames[month]}
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1 border border-slate-100 shadow-sm w-full sm:w-auto justify-between sm:justify-start">
          <button 
            onClick={prevMonth}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-white rounded-lg transition-all"
            aria-label="Previous Month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div className="w-px h-5 bg-slate-200 mx-2"></div>

          <button 
            onClick={nextMonth}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-white rounded-lg transition-all"
            aria-label="Next Month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* Weekdays Row */}
      <div className="grid grid-cols-7 mb-2 relative z-10 bg-white">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>

      {/* CHANGED: Animation Wrapper */}
      {/* The key property forces React to re-render this div, triggering the CSS animation */}
      <div 
        key={currentDate.getTime()} 
        className={
          slideDirection === 'next' ? 'animate-flip-next' : 
          slideDirection === 'prev' ? 'animate-flip-prev' : ''
        }
      >
        <div className="grid grid-cols-7 gap-y-2 min-h-[280px] content-start">
          {grid.map((cell, index) => {
            const isStart = isSameDay(cell.date, selection.start);
            const isEnd = isSameDay(cell.date, selection.end);
            const isSelected = isStart || isEnd;
            
            const isInRange = isDateInRange(cell.date, selection.start, selection.end);
            const isHoverRange = !selection.end && selection.start && hoverDate && 
                                 isDateInRange(cell.date, selection.start, hoverDate) && 
                                 !isStart && !isSameDay(cell.date, hoverDate);

            let baseClasses = "h-10 w-full flex items-center justify-center text-sm transition-all duration-200 cursor-pointer relative ";
            let bgClasses = "bg-transparent ";
            let roundClasses = "rounded-full "; 
            
            let textClasses = cell.isCurrentMonth ? "text-slate-700 font-medium " : "text-slate-300 ";

            if (isSelected) {
              bgClasses = "bg-blue-600 text-white font-bold shadow-md z-10 ";
              textClasses = "text-white "; 
            } else if (isInRange || isHoverRange) {
              bgClasses = "bg-blue-50 ";
              roundClasses = "rounded-none "; 
            } else if (cell.isCurrentMonth) {
              bgClasses = "hover:bg-slate-100 ";
            }

            return (
              <div 
                key={index} 
                className="relative w-full flex justify-center items-center"
                onMouseEnter={() => cell.isCurrentMonth && setHoverDate(cell.date)}
                onMouseLeave={() => cell.isCurrentMonth && setHoverDate(null)}
                onClick={() => cell.isCurrentMonth && handleDateClick(cell.date)}
              >
                {(isInRange || isHoverRange) && !isSelected && (
                  <div className="absolute inset-0 bg-blue-50" />
                )}
                {(isStart && (selection.end || hoverDate) && cell.date < (selection.end || hoverDate)) && (
                  <div className="absolute inset-y-0 right-0 w-1/2 bg-blue-50" />
                )}
                {(isEnd && selection.start && cell.date > selection.start) && (
                  <div className="absolute inset-y-0 left-0 w-1/2 bg-blue-50" />
                )}

                <button 
                  className={`${baseClasses} ${textClasses} ${bgClasses} ${roundClasses} w-10 relative transform transition-transform ${cell.isCurrentMonth ? 'active:scale-90 hover:scale-110 z-20' : ''}`}
                  disabled={!cell.isCurrentMonth}
                >
                  {cell.date.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today Button */}
      <div className="mt-auto pt-6 flex justify-end relative z-10 bg-white">
        <button 
          onClick={jumpToToday}
          className={`px-5 py-2 text-sm font-semibold text-slate-600 bg-slate-50 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-xl transition-all shadow-sm active:scale-95 ${
            isCurrentMonthView ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          Today
        </button>
      </div>

    </div>
  );
};

export default DateGrid;