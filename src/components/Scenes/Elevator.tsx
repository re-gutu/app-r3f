import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { Elevator } from '@/components/Models/Elevator'

export default function Elevator_() {
  return (
    <div className='w-full h-full'>
      <Canvas>
        <OrbitControls target={[0, 0, 0]} enableZoom={false} rotateSpeed={0.5} />
        <ambientLight intensity={2} />
        {/* <directionalLight 
            color={'#EEAA55'}
            position={[5, 5, 5]} 
            intensity={2.0}
        /> */}
        {/* Keeping Suspense boundary with null fallback so global Drei loader handles loading */}
        <Suspense fallback={null}>
          <Elevator position={[0, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  )
}