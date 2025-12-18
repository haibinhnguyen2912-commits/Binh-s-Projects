
import React from 'react';
import { VortexPosition, POSITION_MAP } from '../types';

interface InfoPanelProps {
  currentPosition: VortexPosition;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ currentPosition }) => {
  const config = POSITION_MAP[currentPosition];

  const getTranscript = () => {
    switch (currentPosition) {
      case VortexPosition.CENTER:
      case VortexPosition.INNER_EDGE:
        return `Let’s start with the water inside the vortex. At the center, the velocity is zero. This is similar to a hurricane or a tornado. As we move farther out from the center, the speed increases.\n\nIf we ignore the bulk rotation, we can see that a small disc of water is also rotating about its own center. This means that there is local rotation.`;
      case VortexPosition.OUTER_FLOW:
        return `But what about the flow outside the vortex? Clearly, there is still bulk rotation of the water. However, the small disc is not rotating at all about its own center. Therefore, there is no local rotation.\n\nIn other words, this velocity field has a curl of zero.`;
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full animate-pulse ${config.isRotational ? 'bg-orange-500' : 'bg-blue-400'}`}></div>
        <h2 className="text-xl font-bold tracking-tight">{config.label}</h2>
      </div>
      
      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 shadow-inner">
        <p className="text-sm text-slate-400 leading-relaxed italic">
          "{getTranscript()}"
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Curl State</span>
          <span className={`text-xs font-black uppercase px-2 py-0.5 rounded ${config.isRotational ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
            {config.isRotational ? 'Non-Zero Curl' : 'Zero Curl'}
          </span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-700 ${config.isRotational ? 'bg-orange-500 w-full' : 'bg-slate-700 w-0'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
