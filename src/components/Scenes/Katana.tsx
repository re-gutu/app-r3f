'use client'; 

import { OrbitControls, Sky, Stats } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// 1. Extract the model loading into its own component inside Suspense
function KatanaModel() {
  const gltf = useLoader(GLTFLoader, '/katana.glb')
  
  return (
    <primitive
      object={gltf.scene}
      position={[0, 0, 0]}
      scale={0.5}
    />
  );
}

const Scene: React.FC = () => {
  return (
    <div className='w-full h-full'>
      <Canvas camera={{ position: [0, 0, 50] }} shadows>
        <Suspense fallback={null}>
          <directionalLight
            position={[-1.3, 6.0, 4.4]}
            intensity={8}
          />
          <directionalLight
            color={'red'}
            position={[1.3, -6.0, -4.4]}
            intensity={5}
          />
          <ambientLight intensity={2} /> 
          <KatanaModel />
          {/* <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
            <meshStandardMaterial />
          </Circle> */}
          <OrbitControls target={[0, 0, 0]} />
          {/* <axesHelper args={[5]} /> */}
          <Stats />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;