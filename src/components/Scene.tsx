'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import type { Mesh } from 'three';

function Cube() {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate the cube on every frame
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      cursor="pointer"
    >
      {/* Constructor args: [width, height, depth] */}
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={hovered ? 'hotpink' : '#3b82f6'}
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="w-full h-[calc(100vh-3.5rem)] relative bg-muted overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Cube />
      </Canvas>
    </div>
  );
}