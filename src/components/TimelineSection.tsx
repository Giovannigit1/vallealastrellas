'use client';

import React from 'react';
import { TIMELINE_MILESTONES } from '@/data/site';
import { VisualSubtitleBadge } from './VisualSubtitleBadge';
import { Sun, Leaf, UtensilsCrossed, Sparkles, CheckCircle2 } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Sun: <Sun className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />,
  Leaf: <Leaf className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />,
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />,
};

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="py-24 bg-[#1F1513] relative overflow-hidden"
      aria-labelledby="timeline-heading"
    >
      {/* Decorative ambient gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 w-96 h-96 bg-[#D4AF37]/5 blur-3xl rounded-full"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
            <span>La Experiencia en 4 Horas</span>
          </div>
          <h2
            id="timeline-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7] mb-4"
          >
            Del Sol Poniente a la Noche Profunda
          </h2>
          <p className="text-sm sm:text-base text-[#EDE7DC]">
            Un recorrido cronológico y sensorial diseñado para conectar con la tierra, las cosechas y la inmensidad del cielo elquino (17:00 a 21:00 hrs).
          </p>

          <VisualSubtitleBadge sectionKey="timeline" />
        </div>

        {/* Timeline Path & Cards */}
        <div className="relative">
          {/* Vertical Center Line for Desktop / Left Line for Mobile */}
          <div
            aria-hidden="true"
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#D4AF37] via-[#C05A3E] to-[#1C2541] -translate-x-1/2"
          />

          <div className="space-y-12">
            {TIMELINE_MILESTONES.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={milestone.time}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Badge with Time */}
                  <div
                    aria-hidden="true"
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-[#281D1A] border-2 border-[#D4AF37] shadow-lg z-20"
                  >
                    {ICON_MAP[milestone.icon] || <Sparkles className="w-5 h-5 text-[#D4AF37]" />}
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card */}
                  <div
                    className={`pl-16 md:pl-0 w-full md:w-1/2 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <div className="p-6 rounded-2xl bg-[#281D1A]/90 border border-[#3D2B26] hover:border-[#D4AF37]/50 shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                      <div
                        className={`flex items-center gap-3 mb-2 ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#1F1513] font-bold text-xs tracking-wider font-mono">
                          {milestone.time} HRS
                        </span>
                        <span className="text-xs text-[#C5BCAC] font-medium">
                          {milestone.subtitle}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors mb-3">
                        {milestone.title}
                      </h3>

                      <p className="text-sm text-[#EDE7DC] leading-relaxed mb-4">
                        {milestone.description}
                      </p>

                      <ul
                        className={`space-y-1.5 text-xs text-[#C5BCAC] ${
                          isEven ? 'md:items-end' : 'md:items-start'
                        } flex flex-col`}
                      >
                        {milestone.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-2">
                            <CheckCircle2
                              className="w-3.5 h-3.5 text-[#D4AF37] shrink-0"
                              aria-hidden="true"
                            />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
