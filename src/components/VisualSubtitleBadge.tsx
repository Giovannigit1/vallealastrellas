'use client';

import React from 'react';
import { useAccessibility } from './AccessibilityContext';
import { SECTION_SUBTITLES } from '@/data/site';
import { Captions, Sparkles } from 'lucide-react';

interface VisualSubtitleBadgeProps {
  sectionKey: keyof typeof SECTION_SUBTITLES;
}

export function VisualSubtitleBadge({ sectionKey }: VisualSubtitleBadgeProps) {
  const { subtitlesEnabled } = useAccessibility();
  const data = SECTION_SUBTITLES[sectionKey];

  if (!subtitlesEnabled || !data) return null;

  return (
    <div
      role="region"
      aria-label={`Resumen visual accesible para personas sordas: ${data.title}`}
      className="my-4 p-4 rounded-xl bg-[#281D1A]/95 border-2 border-[#D4AF37] shadow-xl text-[#FDFBF7] animate-fade-in"
    >
      <div className="flex items-center gap-2 mb-2 text-[#D4AF37] font-semibold text-sm">
        <Captions className="w-4 h-4" aria-hidden="true" />
        <span>Resumen Visual Accesible (🤟):</span>
        <span className="text-xs text-[#EDE7DC] font-normal">| {data.title}</span>
      </div>
      <ul className="space-y-1.5 text-xs sm:text-sm text-[#EDE7DC]">
        {data.bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
