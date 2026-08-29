import { Loader, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React,{ Suspense } from 'react'
import { Elevator } from '@/components/Models/Elevator'

export default function Elevator_() {
  return (
    <div className=' w-full h-full'>
        <Canvas >

        <OrbitControls target={[0, 0, 0]} enableZoom={false} rotateSpeed={0.5}/>
        <ambientLight intensity={2} />
        {/* <directionalLight 
            color={'#EEAA55'}
            position={[5, 5, 5]} 
            intensity={2.0}
        /> */}
    <Suspense fallback={null}>
        <Elevator position={[0, 0, 0]} />
        </Suspense>
        </Canvas>
        {/* Render Drei's ready-to-use loader sibling to Canvas */}
      <Loader
        containerStyles={{ background: '#0a0a0a' }}
        innerStyles={{ width: '200px', backgroundColor: '#262626' }}
        barStyles={{ backgroundColor: '#ffffff', height: '4px' }}
        dataStyles={{ color: '#a3a3a3', fontSize: '12px' }}
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
      />
    </div>
  )
}