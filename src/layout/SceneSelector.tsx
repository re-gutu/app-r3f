'use client'

import React, { useRef, useEffect } from 'react';

export interface SceneSelectorProps {
  /** Array of scene titles to display */
  scenes: string[];
  /** The currently active scene */
  selectedScene: string;
  /** Callback fired when a scene is clicked */
  onSelectScene: (scene: string) => void;
  /** Optional height constraint (defaults to 500px) */
  height?: string;
  /** Optional additional CSS classes */
  className?: string;
}

const SceneSelector: React.FC<SceneSelectorProps> = ({
  scenes,
  selectedScene,
  onSelectScene,
  height = 'h-auto max-h-[500px]',
  className = ''
}) => {
  return (
    // The container uses a dark background to match the reference image.
    // 'no-scrollbar' is a custom utility often used to hide the scrollbar for a cleaner look.
    <div 
      className={` w-full max-w-sm md:max-w-md overflow-y-auto ${height} font-mono ${className}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hides scrollbar in Firefox/IE
    >
      <style>{`
        /* Hides scrollbar in Webkit browsers (Chrome, Safari) */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      <div className="flex flex-col py-10 px-8 no-scrollbar">
        {scenes.map((scene) => {
          const isSelected = scene === selectedScene;
          
          return (
            <button
              key={scene}
              onClick={() => onSelectScene(scene)}
              className={`
                group w-full text-left py-4 text-4xl md:text-xl font-medium tracking-tight transition-all duration-300 cursor-pointer
                border-y border-solid
                ${
                  isSelected
                    ? 'text-white border-white/20' // Highlighted state with subtle top/bottom borders
                    : 'text-[#4a4a4a] border-transparent hover:text-[#7a7a7a]' // Dimmed inactive state
                }
              `}
            >
              {scene}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SceneSelector;