import React from 'react';

const CalendarBinding = () => {
  // Create 26 ring locations across the top
  const rings = Array.from({ length: 26 });

  return (
    <div className="absolute -top-6 left-0 w-full flex justify-center items-center z-50 pointer-events-none select-none px-4 sm:px-8">

      {/* Center Hanger Hook */}
      <div className="absolute -top-5 w-12 h-12 flex flex-col items-center z-0">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shadow-sm mb-1"></div>
        <div className="w-6 h-8 border-[3px] border-slate-700 rounded-t-full border-b-0 shadow-sm relative"></div>
      </div>

      {/* The Horizontal Spine Wire running through the loops */}
      <div className="absolute top-3 left-6 right-6 h-1.5 bg-gradient-to-b from-slate-800 to-slate-600 rounded-full shadow-sm z-0"></div>

      {/* The Twin-Loop Rings */}
      <div className="w-full flex justify-between relative z-10">
        {rings.map((_, i) => (
          <div 
            key={i} 
            className={`relative flex justify-center w-6 ${
              (i === 12 || i === 13) ? 'opacity-0' : 'opacity-100' // Hide the middle two for the hanger hook
            }`}
          >
            {/* Twin Wires ONLY (Punch holes removed) */}
            <div className="flex gap-[2px]">
              <div className="w-[3px] h-10 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 rounded-full shadow-[2px_0_3px_rgba(0,0,0,0.4)] border-[0.5px] border-slate-500"></div>
              <div className="w-[3px] h-10 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 rounded-full shadow-[2px_0_3px_rgba(0,0,0,0.4)] border-[0.5px] border-slate-500"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarBinding;