import { OrbitControls, Loader, Environment, Backdrop } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React,{ Suspense } from 'react'
import { Porsche } from '@/components/Models/Porsche'

function Porsche_() {
  return (
    <div className=" w-full h-full">
      <Canvas shadows camera={{ position: [4, 1.5, 5], fov: 45 }}>
        {/* <OrbitControls target={[0, 0, 0]} enableZoom={false} enablePan={false} enableRotate={false}/> */}
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 10, 3]}
          intensity={1}
          castShadow
          shadow-mapSize={[512, 512]}
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
          scale={[32, 10, 5]}
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

export default Porsche_