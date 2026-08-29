import {
  OrbitControls,
  Loader,
  Environment,
  Backdrop,
  CameraControls
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useState } from "react";
import { Porsche } from "@/components/Models/Porsche";

export default function Porsche_() {

  // 1. Reference to the CameraControls instance to trigger animations
  const controlsRef = useRef<any>(null);

  // 2. Track the active view for UI styling
  const [activeView, setActiveView] = useState(1);

  // 3. Define the views (Position of camera, and what it looks at)
  const views = [
    { id: 1, label: "View 1", position: [2.3, 1.2, 3.7], target: [0, 0, 0] }, // Front 3/4
    { id: 2, label: "View 2", position: [-1.5, 1.2, 3.5], target: [0, 0.5, 0] }, // Detail Zoom
    // {
    //   id: 3,
    //   label: "View 3",
    //   position: [0, 4.6, 0],
    //   target: [0, 0, 0],
    // }, // Top Profile
    {
      id: 3,
      label: "View 3",
      position: [-1.2, 0.717, -3.239],
      target: [0, 0.5, 0],
    }, // Side Profile
  ];

  const handleViewChange = (view: (typeof views)[0]) => {
    setActiveView(view.id);

    // Smoothly transition the camera
    // setLookAt( positionX, positionY, positionZ, targetX, targetY, targetZ, enableTransition )
    controlsRef.current?.setLookAt(...view.position, ...view.target, true);
  };

  return (
    <div className="relative w-full h-full">
      {/* HTML UI Overlay - Center Right Vertical Column */}
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
        {/* <OrbitControls target={[0, 0, 0]} enableZoom={false} enablePan={false} enableRotate={false}/> */}
        {/* <OrbitControls /> */}

        <CameraControls ref={controlsRef} />

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

        {/* 5. The Cyclorama. 
              - floor: height of the flat ground
              - segments: curve smoothness
              - scale: [width, height, depth] */}
        <Backdrop
          receiveShadow
          floor={2.5}
          segments={20}
          scale={[50, 10, 5]}
          position={[0, -0.08, -5]}
        >
          {/* Give the backdrop a dark grey studio finish */}
          <meshStandardMaterial color="#202020" roughness={1} />
        </Backdrop>

        <Suspense fallback={null}>
          <Porsche position={[0, 0, 0]} />
        </Suspense>
      </Canvas>

      {/* Render Drei's ready-to-use loader sibling to Canvas */}
      <Loader
        containerStyles={{ background: "#0a0a0a" }}
        innerStyles={{ width: "200px", backgroundColor: "#262626" }}
        barStyles={{ backgroundColor: "#ffffff", height: "4px" }}
        dataStyles={{ color: "#a3a3a3", fontSize: "12px" }}
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
      />
    </div>
  );
}
