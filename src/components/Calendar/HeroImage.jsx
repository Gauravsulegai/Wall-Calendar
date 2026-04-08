import React from 'react';

const monthImages = [
  "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?w=800&q=80", // Jan
  "https://images.unsplash.com/photo-1478719059408-592965723cbc?w=800&q=80", // Feb (Fixed: Snowy Pine Trees)
  "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80", // Mar
  "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=800&q=80", // Apr
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", // May
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", // Jun
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80", // Jul
  "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80", // Aug
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80", // Sep 
  "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=800&q=80", // Oct
  "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=800&q=80", // Nov
  "https://images.unsplash.com/photo-1517260739337-6799d239ce83?w=800&q=80"  // Dec
];

const monthTitles = [
  "Winter Wonderland",    // Jan
  "Frost & Pines",        // Feb
  "Spring Awakening",     // Mar
  "April Showers",        // Apr
  "Mountain Peaks",       // May
  "Summer Shores",        // Jun
  "Endless Summer",       // Jul
  "Golden Rays",          // Aug
  "Lush Wilderness",      // Sep
  "Autumn Colors",        // Oct
  "Late Harvest",         // Nov
  "Cozy Winters"          // Dec
];

const HeroImage = ({ month = 0 }) => {
  return (
    <div className="relative w-full h-full bg-slate-200 overflow-hidden group">
      <img
        src={monthImages[month]}
        alt="Monthly seasonal landscape"
        className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8">
        <span className="text-white/80 text-xs font-semibold tracking-widest uppercase mb-1">
          Featured
        </span>
        <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-wide drop-shadow-md transition-all duration-500">
          {monthTitles[month]}
        </h2>
      </div>
    </div>
  );
};

export default HeroImage;