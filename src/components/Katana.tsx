'use client'; 

import { Circle, Html, OrbitControls, Stats, useProgress } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'; // Import THREE for types

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress.toFixed(0)} % loaded</Html>
}

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
    // 2. Wrap the Canvas inside a container with a defined height
    <div className='w-full h-full'>
      <Canvas camera={{ position: [0, 0, 50] }} shadows>
        <Suspense fallback={<Loader />}>
          <directionalLight
            position={[-1.3, 6.0, 4.4]}
            castShadow
            intensity={Math.PI * 1}
          />
          <directionalLight
            color={'red'}
            position={[1.3, -6.0, -4.4]}
            castShadow
            intensity={Math.PI * 1}
          />
          <ambientLight intensity={0.99} /> {/* Added ambient light for better visibility */}
          
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