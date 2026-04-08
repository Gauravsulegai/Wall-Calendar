import React, { useState, useEffect } from 'react';

const NotesSection = ({ selection }) => {
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const getStorageKey = () => {
    if (!selection.start) return 'wall_calendar_notes_general';
    const dateStr = selection.start.toISOString().split('T')[0];
    return `wall_calendar_notes_${dateStr}`;
  };

  const storageKey = getStorageKey();

  useEffect(() => {
    try {
      const savedNote = localStorage.getItem(storageKey);
      setNote(savedNote || '');
      setIsSaved(false); 
    } catch (error) {
      console.error("Failed to load note from local storage:", error);
      setNote('');
    }
  }, [storageKey]);

  const handleSave = () => {
    try {
      localStorage.setItem(storageKey, note);
      setIsSaved(true);
      setNote(''); 
      setTimeout(() => setIsSaved(false), 2500);
    } catch (error) {
      console.error("Failed to save note to local storage:", error);
      alert("Unable to save note. Your browser's storage might be restricted.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800">Notes</h3>
      </div>
      
      <textarea
        // {/* CHANGED: h-32 is now h-24 to match your image */}
        className="w-full h-24 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm text-slate-700 bg-slate-50 transition-all shadow-inner"
        placeholder={selection.start ? "Add specific notes for this date..." : "Jot down general tasks or memos here..."}
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
          setIsSaved(false); 
        }}
        aria-label="Notes input area"
      />
      
      <div className="mt-5 flex items-center justify-start gap-4">
        <button 
          onClick={handleSave}
          className="px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-md active:scale-95 disabled:opacity-50"
          disabled={!note.trim() && !isSaved} 
        >
          Save Note
        </button>

        <span 
          className={`text-sm font-medium text-emerald-600 transition-opacity duration-300 ${isSaved ? 'opacity-100' : 'opacity-0'}`}
          aria-live="polite"
        >
          ✓ Saved successfully
        </span>
      </div>
    </div>
  );
};

export default NotesSection;