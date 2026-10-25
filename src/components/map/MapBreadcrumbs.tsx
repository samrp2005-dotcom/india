import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ChevronRight, Home } from 'lucide-react';

export const MapBreadcrumbs: React.FC = () => {
  const { selectedState, selectedDistrict, setSelectedState, setSelectedDistrict, resetToNational } = useAppStore();

  return (
    <div className="absolute top-4 left-4 z-20 flex items-center space-x-1.5 px-3 py-1.5 rounded-lg glass-panel border border-border shadow-glass text-xs font-mono">
      <button
        onClick={resetToNational}
        className={`flex items-center space-x-1 text-text-muted hover:text-teal transition-colors ${
          !selectedState ? 'text-teal font-semibold' : ''
        }`}
      >
        <Home className="w-3.5 h-3.5" />
        <span>India</span>
      </button>

      {selectedState && (
        <>
          <ChevronRight className="w-3 h-3 text-text-muted" />
          <button
            onClick={() => setSelectedDistrict(null)}
            className={`hover:text-teal transition-colors truncate max-w-[140px] ${
              !selectedDistrict ? 'text-teal font-semibold' : 'text-text-secondary'
            }`}
          >
            {selectedState}
          </button>
        </>
      )}

      {selectedDistrict && (
        <>
          <ChevronRight className="w-3 h-3 text-text-muted" />
          <span className="text-coral font-semibold truncate max-w-[140px]">
            {selectedDistrict}
          </span>
        </>
      )}
    </div>
  );
};
