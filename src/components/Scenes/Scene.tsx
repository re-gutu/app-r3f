'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

function Cube() {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={active ? 1.25 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry />
      {/* <meshStandardMaterial
        color={hovered ? '#3f9fff' : '#996699'}
        roughness={0.5}
      /> */}
      <meshNormalMaterial />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 5]} intensity={1} color={"green"} />
        <Cube />
      </Canvas>
    </div>
  );
}
