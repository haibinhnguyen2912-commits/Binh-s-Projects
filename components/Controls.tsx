
import React from 'react';
import { VortexPosition, POSITION_MAP } from '../types';

interface ControlsProps {
  currentPosition: VortexPosition;
  setPosition: (pos: VortexPosition) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const Controls: React.FC<ControlsProps> = ({ currentPosition, setPosition, isPlaying, setIsPlaying }) => {
  const positions = Object.values(VortexPosition);
  const currentIndex = positions.indexOf(currentPosition);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value, 10);
    setPosition(positions[index]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Orbit Position</label>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors border border-slate-700"
          >
            <i className={`fas ${isPlaying ? 'fa-pause text-blue-400' : 'fa-play text-green-400 ml-1'}`}></i>
          </button>
        </div>
        
        <div className="relative pt-6">
          <input
            type="range"
            min="0"
            max="2"
            step="1"
            value={currentIndex}
            onChange={handleSliderChange}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between mt-4">
            {positions.map((pos, idx) => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                className={`text-[10px] font-bold uppercase transition-all flex flex-col items-center gap-1 ${
                  currentPosition === pos ? 'text-blue-400 scale-110' : 'text-slate-600'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mb-1 ${currentPosition === pos ? 'bg-blue-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]' : 'bg-slate-700'}`}></div>
                {idx === 0 ? 'Center' : idx === 1 ? 'Inner' : 'Outer'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
           <span className="block text-[10px] text-slate-500 font-bold uppercase">Flow Type</span>
           <span className="text-xs font-semibold">
              {currentIndex < 2 ? 'Rotational' : 'Irrotational'}
           </span>
        </div>
        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
           <span className="block text-[10px] text-slate-500 font-bold uppercase">Velocity</span>
           <span className="text-xs font-semibold">
              {currentIndex === 0 ? 'Minimal' : currentIndex === 1 ? 'Maximum' : 'Low (1/r)'}
           </span>
        </div>
      </div>
    </div>
  );
};

export default Controls;
