import { OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React,{ Suspense } from 'react'
import { MechDrone } from '@/components/Models/Mech_drone'

function Experience() {
  return (
    <div className=' w-full h-full'>
        <Canvas >

        <OrbitControls target={[0, 0, 0]}/>
        <ambientLight intensity={2} />
        <directionalLight 
            color={'#EEAA55'}
            position={[5, 5, 5]} 
            intensity={2.0}
        />
    <Suspense fallback={null}>
        <MechDrone position={[0, -0.5, 0]} />
        </Suspense>
        </Canvas>
    </div>
  )
}

export default Experience