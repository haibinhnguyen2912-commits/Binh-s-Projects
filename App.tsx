
import React, { useState } from 'react';
import { VortexPosition } from './types';
import VortexCanvas from './components/VortexCanvas';
import InfoPanel from './components/InfoPanel';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [position, setPosition] = useState<VortexPosition>(VortexPosition.CENTER);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center p-4">
      {/* 1200x800 Centered Container */}
      <div className="w-[1200px] h-[800px] max-w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row bg-slate-950 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.7)] border border-white/5 relative">
        
        {/* Main Simulation Area */}
        <div className="flex-1 relative h-full overflow-hidden">
          <VortexCanvas 
            selectedPosition={position} 
            isPlaying={isPlaying} 
          />
          
          {/* Overlay Labels */}
          <div className="absolute top-8 left-8 pointer-events-none">
            <h1 className="text-4xl font-black tracking-tighter text-blue-400 drop-shadow-lg">
              VORTEX <span className="text-white">CURL</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium mt-1 tracking-wider uppercase opacity-80">Local vs. Bulk Rotation</p>
          </div>
        </div>

        {/* Control & Info Sidebar */}
        <aside className="w-full md:w-96 glass-panel p-8 flex flex-col gap-8 z-10 border-l border-white/5 shadow-[-20px_0_40px_rgba(0,0,0,0.3)]">
          <InfoPanel currentPosition={position} />
          
          <div className="mt-auto space-y-8">
            <Controls 
              currentPosition={position} 
              setPosition={setPosition}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default App;
