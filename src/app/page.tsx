'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ScenesSidebar from '@/components/scenes/ScenesSidebar';
import { availableScenes, SceneItem } from '@/lib/scenes-data';
import { Sparkles, Layers, Info, MousePointerClick, RefreshCw } from 'lucide-react';

// Dynamic import with SSR disabled for Three.js canvas
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full flex-col items-center justify-center text-muted-foreground">
      <RefreshCw className="size-6 animate-spin text-primary mb-3" />
      <p className="text-sm font-medium">Initializing 3D WebGL Canvas...</p>
    </div>
  ),
});

export default function ScenesPage() {
  const [currentScene, setCurrentScene] = useState<SceneItem>(availableScenes[0]);

  return (
    <div className="flex max-h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Left Sidebar for Scene Selector */}
      <ScenesSidebar
        selectedSceneId={currentScene.id}
        onSelectScene={setCurrentScene}
      />

      {/* Main 3D Canvas Stage */}
      <main className="flex-1 w-full h-full">
        {/* Scene Header */}
        
        {/* 3D Canvas Viewport */}
        <div className="h-full">
          {/* Overlay HUD indicators */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
            <div className="text- font-medium text-white/90">
              <span>{currentScene.name}</span>
            </div>
          </div>

          {/* Render Scene */}
          <div className="h w-full">
            <Scene />
          </div>

          {/* Bottom HUD overlay */}
          
        </div>

        {/* Scene Info & Feature Checklist */}
       
      </main>
    </div>
  );
}