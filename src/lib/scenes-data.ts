export interface SceneItem {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  camera: {
    position: [number, number, number];
    fov?: number;
  };
  lightingInfo: string;
  interactiveFeatures: string[];
}

export const availableScenes: SceneItem[] = [
  {
    id: "interactive-cube",
    name: "Interactive Cube",
    description:
      "A dynamic 3D cube with continuous frame rotation, pointer hover color transition (hotpink / royalblue), and click-to-scale interaction.",
    category: "Basic Geometries",
    tags: ["Geometry", "Materials", "useFrame", "Pointer Events"],
    camera: {
      position: [0, 0, 5],
      fov: 60,
    },
    lightingInfo: "Ambient Light (0.5) + Directional Light [10, 10, 5] (1.0)",
    interactiveFeatures: [
      "Continuous smooth rotation via useFrame delta",
      "Hover over mesh to change color dynamically",
      "Click mesh to toggle scale (1x <-> 1.5x)",
    ],
  },
];
