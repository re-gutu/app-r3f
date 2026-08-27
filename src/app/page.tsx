'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SceneSelector from '@/layout/SceneSelector';

const KatanaScene = dynamic(() => import('@/components/Scenes/Katana'), {
  ssr: false,
});

const CubeScene = dynamic(() => import('@/components/Scenes/Scene'), {
  ssr: false,
});

const ExperienceScene = dynamic(() => import('@/components/Scenes/Experience'), {
  ssr: false,
});

const SCENES = ['Robot' , 'Katana', 'Cube' ];

export default function Home() {
  const [selectedScene, setSelectedScene] = useState<string>('Robot');

  return (
    <main className="w-full h-screen relative overflow-hidden bg-none">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        {selectedScene === 'Robot' && <ExperienceScene />}
        {selectedScene === 'Katana' && <KatanaScene />}
        {selectedScene === 'Cube' && <CubeScene />}
      </div>

      {/* Center-Left Scene Selector Overlay */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 pointer-events-auto">
        <SceneSelector
          scenes={SCENES}
          selectedScene={selectedScene}
          onSelectScene={(scene) => setSelectedScene(scene)}
        />
      </div>
    </main>
  );
}