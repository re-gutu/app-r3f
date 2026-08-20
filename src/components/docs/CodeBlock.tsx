'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export default function CodeBlock({
  code,
  language = 'tsx',
  title,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div
      className={cn(
        'group relative my-4 overflow-hidden rounded-xl border border-border/80 bg-neutral-950 text-neutral-100 shadow-sm font-mono text-[13px]',
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/90 px-4 py-2 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          {title ? (
            <span className="font-medium text-neutral-300 ml-2">{title}</span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-sans font-medium uppercase tracking-wider text-neutral-400 ml-2">
              <Terminal className="size-3 text-neutral-400" />
              {language}
            </span>
          )}
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className={cn(
            'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-sans font-medium transition-all',
            copied
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white'
          )}
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code viewport */}
      <div className="overflow-x-auto p-4 leading-relaxed font-mono">
        <pre tabIndex={0} className="focus:outline-none">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
