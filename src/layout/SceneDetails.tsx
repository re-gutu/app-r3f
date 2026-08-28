'use client';

import React from 'react';

export interface SceneDetailsProps {
  /** Currently selected scene name */
  selectedScene: string;
  /** Optional custom styling classes */
  className?: string;
}

interface SceneInfo {
  why: string;
  assetCredit?: {
    title: string;
    author?: string;
    license?: string;
    url?: string;
  } | string;
}

const SCENE_INFO_MAP: Record<string, SceneInfo> = {
  Porsche: {
    why: 'UI camera controls',
    assetCredit: {
      title: 'Porsche GT3 RS',
      author: 'Black Snow',
      license: 'CC-BY-4.0',
      url: 'https://sketchfab.com/3d-models/porsche-gt3-rs-e738eae819c34d19a31dd066c45e0f3d',
    },
  },
  Elevator: {
    why: "Customizing Drei's camera control",
    assetCredit: {
      title: 'Elevator in Berlin',
      author: 'Azad Balabanian',
      license: 'CC-BY-4.0',
      url: 'https://sketchfab.com/3d-models/elevator-in-berlin-realitiesio-7c759a68446c4bf3b109bfa9cea974ae',
    },
  },
  Robot: {
    why: 'Importing a glb asset with animation',
    assetCredit: {
      title: 'Mech Drone',
      author: 'Willy Decarpentrie',
      license: 'CC-BY-4.0',
      url: 'https://sketchfab.com/3d-models/mech-drone-8d06874aac5246c59edb4adbe3606e0e',
    },
  },
  Katana: {
    why: 'Importing an external glb asset',
    assetCredit: {
      title: 'Katana GLB',
    },
  },
  Cube: {
    why: 'Initializing first 3D r3f project with nextjs',
    assetCredit: {
      title: 'Procedural Mesh (Three.js)',
    },
  },
};

const SceneDetails: React.FC<SceneDetailsProps> = ({
  selectedScene,
  className = '',
}) => {
  const details = SCENE_INFO_MAP[selectedScene];

  if (!details) return null;

  return (
    <div
      className={`text-right font-mono bg-black/40 border-r border-white/20 pr-4 pl-5 py-3 max-w-xs md:max-w-sm ${className}`}
    >
      <p className="text-xs md:text-sm text-neutral-200 leading-snug">
        {details.why}
      </p>
      {details.assetCredit && (
        <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
          {typeof details.assetCredit === 'string' ? (
            details.assetCredit
          ) : details.assetCredit.url ? (
            <a
              href={details.assetCredit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-200 transition-colors"
            >
              {details.assetCredit.title}
              {details.assetCredit.author && ` · ${details.assetCredit.author}`}
              {details.assetCredit.license && ` (${details.assetCredit.license})`}
            </a>
          ) : (
            <span>
              {details.assetCredit.title}
              {details.assetCredit.author && ` · ${details.assetCredit.author}`}
              {details.assetCredit.license && ` (${details.assetCredit.license})`}
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default SceneDetails;

