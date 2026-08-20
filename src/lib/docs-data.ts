export interface DocSubsection {
  id: string;
  title: string;
  description?: string;
  code?: string;
  language?: string;
  props?: string[];
  types?: string[];
}

export interface DocSection {
  id: string;
  title: string;
  badge?: string;
  description?: string;
  subsections?: DocSubsection[];
  code?: string;
  language?: string;
  extraCode?: {
    title?: string;
    code: string;
    language?: string;
    description?: string;
  };
}

export interface DocPage {
  title: string;
  subtitle: string;
  description: string;
  sections: DocSection[];
}

export const r3fDocs: DocPage = {
  title: "R3F + Next.js Quickstart Guide",
  subtitle: "React Three Fiber Recap & Reference",
  description:
    "A comprehensive quickstart and core concept reference for building declarative 3D web experiences using React Three Fiber (R3F) in Next.js.",
  sections: [
    {
      id: "project-setup",
      title: "1. Project Setup",
      badge: "Getting Started",
      description: "Initialize your project with Next.js and install the required Three.js and React Three Fiber packages.",
      code: `npx create-next-app@latest my-r3f-project --typescript --tailwind --app\ncd my-r3f-project\nnpm install three @react-three/fiber @types/three`,
      language: "bash",
      extraCode: {
        title: "Update next.config.ts",
        description: "Ensure Three.js modules are transpiled correctly by Next.js bundler:",
        code: `import type { NextConfig } from 'next';\n\nconst nextConfig: NextConfig = {\n  transpilePackages: ['three'],\n};\n\nexport default nextConfig;`,
        language: "typescript",
      },
    },
    {
      id: "building-the-scene",
      title: "2. Building the Scene",
      badge: "Component",
      description:
        "Create a dedicated 3D scene component (e.g. components/Scene.tsx). This file defines your 3D meshes, frame loops, and the Canvas viewport:",
      code: `'use client';\nimport { Canvas, useFrame } from '@react-three/fiber';\nimport { useRef, useState } from 'react';\nimport type { Mesh } from 'three';\n\nfunction Box() {\n  const ref = useRef<Mesh>(null);\n  const [hovered, setHover] = useState(false);\n\n  // Animate the cube rotation on every frame\n  useFrame((_, delta) => {\n    if (ref.current) {\n      ref.current.rotation.y += delta;\n    }\n  });\n\n  return (\n    <mesh\n      ref={ref}\n      onPointerOver={() => setHover(true)}\n      onPointerOut={() => setHover(false)}\n    >\n      <boxGeometry args={[1, 1, 1]} />\n      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />\n    </mesh>\n  );\n}\n\nexport default function Scene() {\n  return (\n    <div className="h-[400px] w-full">\n      <Canvas camera={{ position: [0, 0, 5] }}>\n        <ambientLight intensity={0.5} />\n        <pointLight position={[10, 10, 10]} />\n        <Box />\n      </Canvas>\n    </div>\n  );\n}`,
      language: "tsx",
    },
    {
      id: "core-concepts",
      title: "3. Quick Reference: Core R3F Concepts",
      badge: "Cheat Sheet",
      description:
        "In R3F, standard Three.js classes become declarative JSX components. You do not need to manually instantiate classes like new THREE.Scene().",
      subsections: [
        {
          id: "concept-canvas",
          title: "Canvas (The Scene)",
          description:
            "The entry point that sets up the Scene, Camera, and WebGL Renderer automatically.",
          code: `<Canvas camera={{ position: [0, 0, 5] }}>\n  {/* 3D Content */}\n</Canvas>`,
          language: "tsx",
          props: [
            "shadows: enables WebGL shadow map calculation",
            "camera: initial camera configuration ({ position, fov, near, far })",
            "gl: custom WebGLRenderer options (e.g. antialias, alpha, powerPreference)",
            "dpr: pixel ratio clamping ([1, 2]) for high-DPI displays",
          ],
        },
        {
          id: "concept-mesh",
          title: "Mesh (The 3D Object)",
          description:
            "A container component that combines a geometry (shape) and a material (appearance).",
          code: `<mesh position={[0, 1, 0]} rotation={[0, Math.PI / 4, 0]}>\n  <boxGeometry />\n  <meshStandardMaterial />\n</mesh>`,
          language: "tsx",
          props: [
            "position: [x, y, z] coordinate offset",
            "rotation: [x, y, z] Euler angles in radians",
            "scale: [x, y, z] or uniform scalar number",
            "visible: boolean to toggle rendering",
          ],
        },
        {
          id: "concept-geometry",
          title: "Geometry (The Shape)",
          description:
            "Defines the mathematical vertices, normals, UV coordinates, and faces of your 3D object.",
          code: `<sphereGeometry args={[1, 32, 32]} />`,
          language: "tsx",
          types: [
            "boxGeometry args={[width, height, depth]}",
            "sphereGeometry args={[radius, widthSegments, heightSegments]}",
            "planeGeometry args={[width, height]}",
            "torusGeometry args={[radius, tube, radialSegments, tubularSegments]}",
            "cylinderGeometry args={[radiusTop, radiusBottom, height, radialSegments]}",
          ],
        },
        {
          id: "concept-material",
          title: "Material (The Appearance)",
          description:
            "Controls how the mesh surface responds to light, reflections, transparency, and color.",
          code: `<meshStandardMaterial color="orange" roughness={0.5} metalness={0.1} />`,
          language: "tsx",
          types: [
            "meshBasicMaterial: unlit material, ignores light sources",
            "meshStandardMaterial: physically based rendering (PBR) with roughness and metalness",
            "meshPhysicalMaterial: advanced PBR with clearcoat, transmission, and sheen",
            "meshNormalMaterial: maps normal vectors to RGB colors, great for debugging",
          ],
        },
        {
          id: "concept-camera",
          title: "Camera (The Viewpoint)",
          description:
            "The viewpoint through which the user views and interacts with the 3D scene.",
          code: `<PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />`,
          language: "tsx",
          types: [
            "PerspectiveCamera: standard 3D camera mimicking human vision with depth perspective",
            "OrthographicCamera: 2D/Isometric style camera without perspective distortion",
          ],
        },
      ],
    },
    {
      id: "nextjs-integration",
      title: "4. Integration with Next.js",
      badge: "SSR & Hydration",
      description:
        "In Next.js App Router pages, use dynamic imports with ssr: false to prevent hydration mismatch errors since WebGL relies on browser-only APIs (window/canvas).",
      code: `'use client';\n\nimport dynamic from 'next/dynamic';\n\n// Dynamically load the Scene with SSR disabled\nconst Scene = dynamic(() => import('@/components/Scene'), {\n  ssr: false,\n  loading: () => (\n    <div className="h-[400px] w-full flex items-center justify-center bg-neutral-900 text-neutral-400 rounded-xl">\n      Loading 3D Canvas...\n    </div>\n  ),\n});\n\nexport default function Home() {\n  return (\n    <main className="container mx-auto p-6">\n      <Scene />\n    </main>\n  );\n}`,
      language: "tsx",
    },
  ],
};
