import { Environment, Backdrop, CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useState } from "react";
import { Porsche } from "@/components/Models/Porsche";

export default function Porsche_() {
  const controlsRef = useRef<any>(null);
  const [activeView, setActiveView] = useState(1);

  const views = [
    { id: 1, label: "View 1", position: [2.3, 1.2, 3.7], target: [0, 0, 0] },
    { id: 2, label: "View 2", position: [-1.5, 1.2, 3.5], target: [0, 0.5, 0] },
    {
      id: 3,
      label: "View 3",
      position: [-1.2, 0.717, -3.239],
      target: [0, 0.5, 0],
    },
  ];

  const handleViewChange = (view: (typeof views)[0]) => {
    setActiveView(view.id);
    controlsRef.current?.setLookAt(...view.position, ...view.target, true);
  };

  return (
    <div className="relative w-full h-full bg-neutral-950">
      {/* UI Overlay */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => handleViewChange(view)}
            className={`px-6 py-3 text-sm tracking-wide text-white transition-colors duration-500 ${
              activeView === view.id
                ? "bg-black/80"
                : "bg-black/40 hover:bg-black/60"
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>

      <Canvas shadows camera={{ position: [2.3, 1.2, 3.7], fov: 45 }}>
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
        <ambientLight intensity={0.5} />

        <directionalLight
          position={[1, 0.5, -2.5]}
          intensity={3}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight
          position={[5, 10, 3]}
          intensity={3}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        <Environment preset="studio" />

        <Backdrop
          receiveShadow
          floor={2.5}
          segments={20}
          scale={[50, 10, 5]}
          position={[0, -0.08, -5]}
        >
          <meshStandardMaterial color="#202020" roughness={1} />
        </Backdrop>

        {/* Removed local <Loader/>, keeping only the Suspense boundary */}
        <Suspense fallback={null}>
          <Porsche position={[0, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
