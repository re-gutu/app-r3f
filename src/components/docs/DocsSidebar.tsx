'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronRight,
  Bookmark,
  Sparkles,
  Layers,
  Box,
  Terminal,
  FileCode,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { r3fDocs } from '@/lib/docs-data';

interface DocsSidebarProps {
  activeId?: string;
}

export default function DocsSidebar({ activeId }: DocsSidebarProps) {
  // Store expanded state of sections with children
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'core-concepts': true,
  });

  const toggleSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getSectionIcon = (id: string) => {
    switch (id) {
      case 'project-setup':
        return Terminal;
      case 'building-the-scene':
        return Box;
      case 'core-concepts':
        return Layers;
      case 'nextjs-integration':
        return FileCode;
      default:
        return Bookmark;
    }
  };

  return (
    <aside className="w-full lg:w-72 shrink-0 border-r border-border/60 bg-sidebar/50 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] overflow-y-auto p-4 lg:py-6">
      

      <nav className="space-y-1.5" aria-label="Documentation Navigation">
        {r3fDocs.sections.map((section) => {
          const hasSubsections = section.subsections && section.subsections.length > 0;
          const isExpanded = !!expandedSections[section.id];
          const isCurrent = activeId === section.id;
          const Icon = getSectionIcon(section.id);

          return (
            <div key={section.id} className="space-y-1">
              {/* Section Header Row */}
              <div
                className={cn(
                  'group flex items-center justify-between rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
                  isCurrent
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'
                )}
              >
                <Link
                  href={`#${section.id}`}
                  className="flex items-center gap-2.5 flex-1 min-w-0"
                >
                  <Icon className={cn('size-4 shrink-0', isCurrent ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
                  <span className="truncate">{section.title}</span>
                </Link>

                {/* Collapsible toggle button if section has subsections */}
                {hasSubsections && (
                  <button
                    type="button"
                    onClick={(e) => toggleSection(section.id, e)}
                    aria-label={`Toggle ${section.title} subsections`}
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors ml-1"
                  >
                    {isExpanded ? (
                      <ChevronDown className="size-3.5" />
                    ) : (
                      <ChevronRight className="size-3.5" />
                    )}
                  </button>
                )}
              </div>

              {/* Collapsible Subsections list */}
              {hasSubsections && isExpanded && (
                <div className="ml-5 pl-3 border-l border-border/60 space-y-1 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  {section.subsections!.map((sub) => {
                    const isSubCurrent = activeId === sub.id;
                    return (
                      <Link
                        key={sub.id}
                        href={`#${sub.id}`}
                        className={cn(
                          'block rounded-md px-2.5 py-1.5 text-xs transition-colors truncate',
                          isSubCurrent
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground'
                        )}
                      >
                        {sub.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Docs Footer Info Box */}
      <div className="">
        
      </div>
    </aside>
  );
}
