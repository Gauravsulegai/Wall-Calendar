import React from 'react';
import { useCalendarState } from '../../hooks/useCalendarState';
import DateGrid from './DateGrid';
import HeroImage from './HeroImage';
import NotesSection from '../Notes/NotesSection';
import CalendarBinding from './CalendarBinding';

const CalendarWidget = () => {
  const calendarState = useCalendarState();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-8 pt-16">
      
      {/* PARENT WRAPPER: Handles the relative positioning. 
        Notice that `overflow-hidden` has been REMOVED from this div! 
      */}
      <div className="relative max-w-5xl w-full drop-shadow-2xl">
        
        {/* The Binding now sits fully on top without getting clipped */}
        <CalendarBinding />

        {/* CHILD WRAPPER: The actual white card. 
          `overflow-hidden` is placed here so it only masks the image and notes, NOT the binding.
        */}
        <div className="bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden border border-slate-200/50">
          
          <div className="w-full md:w-2/5 flex flex-col border-r border-slate-100">
            <div className="h-48 md:h-64 sm:h-56">
              <HeroImage month={calendarState.currentDate.getMonth()} />
            </div>
            <div className="flex-grow p-6 sm:p-8 bg-white">
              <NotesSection selection={calendarState.selection} />
            </div>
          </div>

          <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-10 pt-10">
             <DateGrid {...calendarState} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;