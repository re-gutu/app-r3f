// src/app/page.tsx (or your Home.tsx path)
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "@react-three/drei";
import SceneSelector from "@/layout/SceneSelector";
import SceneDetails from "@/layout/SceneDetails";

type SceneName =  "Elevator" | "Porsche" |"Robot" | "Katana" | "Cube";

const SCENE_COMPONENTS = {
  Porsche: dynamic(() => import("@/components/Scenes/Porsche"), { ssr: false }),
  Elevator: dynamic(() => import("@/components/Scenes/Elevator"), {
    ssr: false,
  }),
  Robot: dynamic(() => import("@/components/Scenes/Experience"), {
    ssr: false,
  }),
  Katana: dynamic(() => import("@/components/Scenes/Katana"), { ssr: false }),
  Cube: dynamic(() => import("@/components/Scenes/Scene"), { ssr: false }),
};

const SCENES = Object.keys(SCENE_COMPONENTS) as SceneName[];

export default function Home() {
  const [selectedScene, setSelectedScene] = useState<SceneName>("Porsche");
  const SelectedScene = SCENE_COMPONENTS[selectedScene];

  return (
    <main className="w-full h-screen relative overflow-hidden bg-neutral-950">
      {/* 1. AnimatePresence handles the smooth unmounting of the old scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedScene} // Changing the key triggers the animation
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <SelectedScene />
        </motion.div>
      </AnimatePresence>

      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 pointer-events-auto">
        <SceneSelector
          scenes={SCENES}
          selectedScene={selectedScene}
          onSelectScene={(scene) => setSelectedScene(scene as SceneName)}
        />
      </div>

      <div className="absolute right-6 md:right-12 bottom-6 md:bottom-12 z-10 pointer-events-auto">
        <SceneDetails selectedScene={selectedScene} />
      </div>

      {/* 2. Global Loader prevents race conditions across scene swaps */}
      <Loader
        containerStyles={{ background: "#0a0a0a" }}
        innerStyles={{ width: "200px", backgroundColor: "#262626" }}
        barStyles={{ backgroundColor: "#ffffff", height: "4px" }}
        dataStyles={{ color: "#a3a3a3", fontSize: "12px" }}
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
      />
    </main>
  );
}
