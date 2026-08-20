'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, BookOpen, Layers, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    name: 'Scenes',
    href: '/',
    icon: Layers,
  },
  {
    name: 'Docs',
    href: '/docs',
    icon: BookOpen,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname.startsWith('/scenes');
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-all">
      <div className="flex h-14 items-center px-4 md:px-6">

        {/* Left Aligned Main Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = isLinkActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group relative flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-150',
                  active
                    ? 'text-accent-foreground font-semibold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className={cn('size-4 transition-colors', active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
                <span>{item.name}</span>
                {active && (
                  <span className="absolute -bottom-[9px] left-3 right-3 h-[2px] rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Header Status / Info */}
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 border border-border/50 px-2.5 py-1 rounded-full">
            <Sparkles className="size-3 text-amber-500" />
            <span>Three.js + React 19</span>
          </div>
        </div>
      </div>
    </header>
  );
}
