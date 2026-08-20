'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DocsSidebar from '@/components/docs/DocsSidebar';
import CodeBlock from '@/components/docs/CodeBlock';
import { r3fDocs } from '@/lib/docs-data';
import {
  BookOpen,
  Box,
  FileCode,
  Lightbulb,
  ChevronRight,
} from 'lucide-react';

export default function DocsPage() {
  const [activeSectionId, setActiveSectionId] = useState<string>('project-setup');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id], div[id^="concept-"]');
      const scrollPosition = window.scrollY + 120;

      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop;
        const height = (section as HTMLElement).offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPosition >= top && scrollPosition < top + height && id) {
          setActiveSectionId(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col lg:flex-row">
      {/* Left Sidebar (Documentation Navigation Index) */}
      <DocsSidebar activeId={activeSectionId} />

      {/* Main Centered Documentation Article Content */}
      <main className="flex-1 min-w-0 py-8 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        {/* Page Hero Header */}
        <header className="pb-8 mb-8 border-b border-border/60">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              <BookOpen className="size-3.5" />
              Documentation
            </span>
            <span className="text-xs text-muted-foreground">• Version 1.0</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            {r3fDocs.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {r3fDocs.description}
          </p>
        </header>

        {/* Sections Content Stream */}
        <div className="space-y-14">
          {/* Section 1: Project Setup */}
          <section id="project-setup" className="scroll-mt-20">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Project Setup
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mt-2 mb-4 leading-relaxed">
              Run the following commands in your terminal to initialize your project with Next.js App Router and install Three.js dependencies:
            </p>

            <CodeBlock
              title="Terminal Commands"
              language="bash"
              code={`npx create-next-app@latest my-r3f-project --typescript --tailwind --app\ncd my-r3f-project\nnpm install three @react-three/fiber @types/three`}
            />

            <div className="mt-6 rounded-xl border border-border/80 bg-card/60 p-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1.5">
                <FileCode className="size-4 text-primary" />
                Update next.config.ts
              </h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Update <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[11px]">next.config.ts</code> to ensure Three.js modules are transpiled correctly by Next.js:
              </p>
              <CodeBlock
                title="next.config.ts"
                language="typescript"
                code={`import type { NextConfig } from 'next';\n\nconst nextConfig: NextConfig = {\n  transpilePackages: ['three'],\n};\n\nexport default nextConfig;`}
              />
            </div>
          </section>

          {/* Section 2: Building the Scene */}
          <section id="building-the-scene" className="scroll-mt-20">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="size-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Building the Scene
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mt-2 mb-4 leading-relaxed">
              Create <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">components/Scene.tsx</code>. This file defines your 3D objects, animations via <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">useFrame</code>, pointer events, and the Canvas container:
            </p>

            <CodeBlock
              title="components/Scene.tsx"
              language="tsx"
              code={`'use client';\nimport { Canvas, useFrame } from '@react-three/fiber';\nimport { useRef, useState } from 'react';\nimport { Mesh } from 'three';\n\nfunction Box() {\n  const ref = useRef<Mesh>(null);\n  const [hovered, setHover] = useState(false);\n\n  useFrame((_, delta) => {\n    if (ref.current) {\n      ref.current.rotation.y += delta;\n    }\n  });\n\n  return (\n    <mesh\n      ref={ref}\n      onPointerOver={() => setHover(true)}\n      onPointerOut={() => setHover(false)}\n    >\n      <boxGeometry args={[1, 1, 1]} />\n      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />\n    </mesh>\n  );\n}\n\nexport default function Scene() {\n  return (\n    <div className="h-[400px] w-full">\n      <Canvas camera={{ position: [0, 0, 5] }}>\n        <ambientLight intensity={0.5} />\n        <pointLight position={[10, 10, 10]} />\n        <Box />\n      </Canvas>\n    </div>\n  );\n}`}
            />
          </section>

          {/* Section 3: Core R3F Concepts */}
          <section id="core-concepts" className="scroll-mt-20">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="size-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Quick Reference: Core R3F Concepts
              </h2>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 mb-6 text-xs text-foreground/90 leading-relaxed flex items-start gap-2.5">
              <Lightbulb className="size-4 text-primary shrink-0 mt-0.5" />
              <div>
                In React Three Fiber, standard Three.js classes become declarative JSX components. You do <strong>not</strong> need to manually create instances like <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[11px]">new THREE.Scene()</code> or manually call render loops.
              </div>
            </div>

            {/* Subsections Grid / List */}
            <div className="space-y-8">
              {/* Concept: Canvas */}
              <div id="concept-canvas" className="scroll-mt-24 rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="size-2 rounded-full bg-indigo-500" />
                  <h3 className="text-lg font-bold text-foreground">
                    Canvas (The Scene)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                  The entry point that sets up the Scene, Camera, and WebGL Renderer automatically.
                </p>
                <CodeBlock
                  title="Canvas Usage"
                  language="tsx"
                  code={`<Canvas camera={{ position: [0, 0, 5] }}>\n  {/* 3D Content & Lights */}\n</Canvas>`}
                />
                <div className="mt-3 bg-muted/40 rounded-lg p-3">
                  <span className="text-xs font-semibold text-foreground block mb-1.5">
                    Key Props:
                  </span>
                  <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside">
                    <li><strong className="text-foreground">shadows:</strong> enables WebGL shadow map calculation</li>
                    <li><strong className="text-foreground">camera:</strong> configuration object (<code className="font-mono text-[11px]">position</code>, <code className="font-mono text-[11px]">fov</code>, <code className="font-mono text-[11px]">near</code>, <code className="font-mono text-[11px]">far</code>)</li>
                    <li><strong className="text-foreground">gl:</strong> WebGLRenderer options (e.g. antialias, alpha, powerPreference)</li>
                    <li><strong className="text-foreground">dpr:</strong> pixel ratio bounds (e.g. <code className="font-mono text-[11px]">[1, 2]</code>)</li>
                  </ul>
                </div>
              </div>

              {/* Concept: Mesh */}
              <div id="concept-mesh" className="scroll-mt-24 rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="size-2 rounded-full bg-cyan-500" />
                  <h3 className="text-lg font-bold text-foreground">
                    Mesh (The 3D Object)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                  A container that combines a geometry (shape) and a material (appearance/look).
                </p>
                <CodeBlock
                  title="Mesh Declaration"
                  language="tsx"
                  code={`<mesh position={[0, 1, 0]} rotation={[0, Math.PI / 4, 0]}>\n  <boxGeometry />\n  <meshStandardMaterial />\n</mesh>`}
                />
                <div className="mt-3 bg-muted/40 rounded-lg p-3">
                  <span className="text-xs font-semibold text-foreground block mb-1.5">
                    Common Properties:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                    <div>• <strong className="text-foreground">position:</strong> [x, y, z] coordinate vector</div>
                    <div>• <strong className="text-foreground">rotation:</strong> [x, y, z] Euler angles in radians</div>
                    <div>• <strong className="text-foreground">scale:</strong> [x, y, z] or scalar value</div>
                    <div>• <strong className="text-foreground">visible:</strong> boolean visibility toggle</div>
                  </div>
                </div>
              </div>

              {/* Concept: Geometry */}
              <div id="concept-geometry" className="scroll-mt-24 rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <h3 className="text-lg font-bold text-foreground">
                    Geometry (The Shape)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                  Defines the mathematical vertices, triangles, UV coordinates, and faces of your object.
                </p>
                <CodeBlock
                  title="Geometry Example"
                  language="tsx"
                  code={`<sphereGeometry args={[1, 32, 32]} />`}
                />
                <div className="mt-3 bg-muted/40 rounded-lg p-3">
                  <span className="text-xs font-semibold text-foreground block mb-1.5">
                    Common Geometry Types:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-background border border-border px-2.5 py-1 rounded-md font-mono text-[11px]">boxGeometry</span>
                    <span className="bg-background border border-border px-2.5 py-1 rounded-md font-mono text-[11px]">sphereGeometry</span>
                    <span className="bg-background border border-border px-2.5 py-1 rounded-md font-mono text-[11px]">planeGeometry</span>
                    <span className="bg-background border border-border px-2.5 py-1 rounded-md font-mono text-[11px]">torusGeometry</span>
                    <span className="bg-background border border-border px-2.5 py-1 rounded-md font-mono text-[11px]">cylinderGeometry</span>
                  </div>
                </div>
              </div>

              {/* Concept: Material */}
              <div id="concept-material" className="scroll-mt-24 rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="size-2 rounded-full bg-orange-500" />
                  <h3 className="text-lg font-bold text-foreground">
                    Material (The Appearance)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                  Controls how the mesh surface interacts with light, reflections, shadows, roughness, and color.
                </p>
                <CodeBlock
                  title="Material Example"
                  language="tsx"
                  code={`<meshStandardMaterial color="orange" roughness={0.5} metalness={0.1} />`}
                />
                <div className="mt-3 bg-muted/40 rounded-lg p-3">
                  <span className="text-xs font-semibold text-foreground block mb-1.5">
                    Common Types:
                  </span>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• <strong className="text-foreground">meshBasicMaterial:</strong> unlit material (unaffected by scene lights)</li>
                    <li>• <strong className="text-foreground">meshStandardMaterial:</strong> physically-based rendering (PBR) with roughness/metalness</li>
                    <li>• <strong className="text-foreground">meshPhysicalMaterial:</strong> advanced PBR with clearcoat, transmission, and sheen</li>
                    <li>• <strong className="text-foreground">meshNormalMaterial:</strong> maps normal vectors to RGB colors</li>
                  </ul>
                </div>
              </div>

              {/* Concept: Camera */}
              <div id="concept-camera" className="scroll-mt-24 rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="size-2 rounded-full bg-purple-500" />
                  <h3 className="text-lg font-bold text-foreground">
                    Camera (The Viewpoint)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                  The viewpoint through which the user perceives and navigates the 3D scene.
                </p>
                <CodeBlock
                  title="Camera Configuration"
                  language="tsx"
                  code={`<PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />`}
                />
                <div className="mt-3 bg-muted/40 rounded-lg p-3">
                  <span className="text-xs font-semibold text-foreground block mb-1.5">
                    Common Variations:
                  </span>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>• <strong className="text-foreground">PerspectiveCamera:</strong> standard 3D camera mimicking human vision with depth perspective.</p>
                    <p>• <strong className="text-foreground">OrthographicCamera:</strong> 2D/Isometric style camera without perspective vanishing points.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Integration */}
          <section id="nextjs-integration" className="scroll-mt-20 pb-12">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="size-8 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Integration with Next.js
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mt-2 mb-4 leading-relaxed">
              In your page, use dynamic imports with <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">ssr: false</code> to prevent hydration errors when mounting WebGL contexts:
            </p>

            <CodeBlock
              title="app/page.tsx"
              language="tsx"
              code={`'use client';\n\nimport dynamic from 'next/dynamic';\n\nconst Scene = dynamic(() => import('@/components/Scene'), { ssr: false });\n\nexport default function Home() {\n  return (\n    <main className="container mx-auto p-6">\n      <Scene />\n    </main>\n  );\n}`}
            />

            <div className="mt-6 flex items-center justify-between rounded-xl border border-border/80 bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Box className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    Explore the Live Scene
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Test the interactive 3D cube scene on the Scenes page.
                  </p>
                </div>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary text-primary-foreground px-3.5 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-xs"
              >
                <span>View Scenes</span>
                <ChevronRight className="size-3.5" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
