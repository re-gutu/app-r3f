'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SceneSelector from '@/layout/SceneSelector';

const KatanaScene = dynamic(() => import('@/components/Katana'), {
  ssr: false,
});

const CubeScene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
});

const SCENES = ['Katana', 'Cube'];

export default function Home() {
  const [selectedScene, setSelectedScene] = useState<string>('Katana');

  return (
    <main className="w-full h-screen relative overflow-hidden bg-black">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
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