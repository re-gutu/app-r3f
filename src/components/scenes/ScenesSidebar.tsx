'use client';

import React from 'react';
import { Box, Sparkles, Layers, PlayCircle, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { availableScenes, SceneItem } from '@/lib/scenes-data';

interface ScenesSidebarProps {
  selectedSceneId: string;
  onSelectScene: (scene: SceneItem) => void;
}

export default function ScenesSidebar({
  selectedSceneId,
  onSelectScene,
}: ScenesSidebarProps) {
  return (
    <aside className="w-full lg:w-72 shrink-0 border-r border-border/60 bg-sidebar/50 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] overflow-y-auto p-4 lg:py-6 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Sidebar Header */}
        <div className="">
          
        </div>

        {/* Scene List */}
        <div className="space-y-2">
          {availableScenes.map((scene) => {
            const isSelected = selectedSceneId === scene.id;

            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => onSelectScene(scene)}
                className={cn(
                  'w-full text-left p-3.5 transition-all duration-150 cursor-pointer',
                  isSelected
                    ? 'text-card-foreground border-l border-primary/50'
                    : 'hover:bg-card/80 text-muted-foreground'
                )}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'size-7 rounded-lg flex items-center justify-center transition-colors',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      <Box className="size-4" />
                    </div>
                    <div>
                      <h3
                        className={cn(
                          'text-sm font-semibold tracking-tight',
                          isSelected ? 'text-foreground' : 'text-foreground/80'
                        )}
                      >
                        {scene.name}
                      </h3>
                      <span className="text-[11px] text-muted-foreground block">
                        {scene.category}
                      </span>
                    </div>
                  </div>
                </div>

              </button>
            );
          })}
        </div>

        {/* Future Scene Extension Placeholder */}
        <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-3.5 text-center">
          <div className="flex justify-center mb-1.5">
            <PlusCircle className="size-4 text-muted-foreground/60" />
          </div>
          <p className="text-xs font-medium text-muted-foreground">More scenes coming soon</p>
          
        </div>
      </div>
    </aside>
  );
}
