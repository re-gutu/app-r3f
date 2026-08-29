import { OrbitControls, Environment, Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React,{ Suspense } from 'react'
import { MechDrone } from '@/components/Models/Mech_drone'

function Experience() {
  return (
    <div className=' w-full h-full'>
        <Canvas >

        <OrbitControls target={[0, 0.5, 0]}/>
        <ambientLight intensity={2} />
        <directionalLight 
            color={'#EEAA55'}
            position={[5, 5, 5]} 
            intensity={2.0}
        />
    <Suspense fallback={null}>
        <MechDrone position={[0, -1, 0]}/>
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

export default Experience