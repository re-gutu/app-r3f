import { OrbitControls, Sky, CameraControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { Suspense, useRef } from 'react'
import { MechDrone } from '@/components/Models/Mech_drone'
import { MathUtils } from 'three';

function CameraRig() {
  const controlsRef = useRef<CameraControls | null>(null);

  useFrame((state, delta) => {
    if (!controlsRef.current) return;

    const baseX = 0;
    const baseY = 0;
    const baseZ = 5;
    const intensity = -2;

    const targetX = baseX + state.pointer.x * intensity;
    const targetY = baseY + state.pointer.y * intensity;

    const currentX = MathUtils.lerp(state.camera.position.x, targetX, delta * 4);
    const currentY = MathUtils.lerp(state.camera.position.y, targetY, delta * 4);

    controlsRef.current.setLookAt(
      currentX,
      currentY,
      baseZ,
      0,
      0,
      0,
      false,
    );
  });

  return (
    <CameraControls
      ref={controlsRef}
      mouseButtons={{
        left: 0, // CameraControlsImpl.ACTION.NONE
        middle: 0, // CameraControlsImpl.ACTION.NONE
        right: 0, // CameraControlsImpl.ACTION.NONE
        wheel: 0, // CameraControlsImpl.ACTION.NONE
      }}
      touches={{
        one: 0, // CameraControlsImpl.ACTION.NONE
        two: 0, // CameraControlsImpl.ACTION.NONE
        three: 0, // CameraControlsImpl.ACTION.NONE
      }}
    />
  );
}

function Experience() {
  return (
    <div className="w-full h-full">
      <Canvas>
        {/* <Sky /> */}
        <CameraRig />
        {/* <OrbitControls target={[0, 0.5, 0]} /> */}
        <ambientLight intensity={2} />
        <directionalLight
          color={"#EEAA55"}
          position={[5, 5, 5]}
          intensity={2.0}
        />
        {/* Keeping Suspense boundary with null fallback so global Drei loader handles loading */}
        <Suspense fallback={null}>
          <MechDrone position={[0, -1, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Experience