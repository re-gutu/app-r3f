'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SceneSelector from '@/layout/SceneSelector';
import SceneDetails from '@/layout/SceneDetails';

type SceneName = 'Porsche' | 'Elevator' | 'Robot' | 'Katana' | 'Cube';

const SCENE_COMPONENTS = {
  Porsche: dynamic(() => import('@/components/Scenes/Porsche'), { ssr: false }),
  Elevator: dynamic(() => import('@/components/Scenes/Elevator'), { ssr: false }),
  Robot: dynamic(() => import('@/components/Scenes/Experience'), { ssr: false }),
  Katana: dynamic(() => import('@/components/Scenes/Katana'), { ssr: false }),
  Cube: dynamic(() => import('@/components/Scenes/Scene'), { ssr: false }),
};

const SCENES = Object.keys(SCENE_COMPONENTS) as SceneName[];

export default function Home() {
  const [selectedScene, setSelectedScene] = useState<SceneName>('Porsche');
  const SelectedScene = SCENE_COMPONENTS[selectedScene];

  return (
    <main className="w-full h-screen relative overflow-hidden bg-none">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <SelectedScene />
      </div>

      {/* Center-Left Scene Selector Overlay */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 pointer-events-auto">
        <SceneSelector
          scenes={SCENES}
          selectedScene={selectedScene}
          onSelectScene={(scene) => setSelectedScene(scene as SceneName)}
        />
      </div>

      {/* Bottom-Right Scene Details Overlay */}
      <div className="absolute right-6 md:right-12 bottom-6 md:bottom-12 z-10 pointer-events-auto">
        <SceneDetails selectedScene={selectedScene} />
      </div>
    </main>
  );
}