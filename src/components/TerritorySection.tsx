'use client';

import React from 'react';
import { VisualSubtitleBadge } from './VisualSubtitleBadge';
import { MapPin, Trees, SunMedium, Flame, Info } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';

const TERRITORY_COMMUNITIES = [
  {
    name: "Paihuano & Quebradas",
    role: "Crianceros y Huertos Tradicionales",
    detail: "Cultivo de papayas de altura, secado solar de higos y pastoreo caprino transhumante en laderas pedregosas.",
    icon: <Trees className="w-5 h-5 text-[#D4AF37]" />,
  },
  {
    name: "Pisco Elqui & Alcohuaz",
    role: "Cuna de la D.O. Pisquera",
    detail: "Destilación centenaria en alambiques de cobre y viñedos verticales con más de 300 días de sol al año.",
    icon: <Flame className="w-5 h-5 text-[#D4AF37]" />,
  },
  {
    name: "Vicuña & Mamalluca",
    role: "Capital Mundial de la Astronomía",
    detail: "La mayor concentración de observatorios científicos y comunitarios de América, pioneros en cocina solar.",
    icon: <SunMedium className="w-5 h-5 text-[#D4AF37]" />,
  },
];

export function TerritorySection() {
  return (
    <section
      id="vinculacion"
      className="py-24 bg-[#18100E] relative"
      aria-labelledby="territory-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Identidad & Comunidad</span>
          </div>
          <h2
            id="territory-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7] mb-4"
          >
            Vinculación Territorial
          </h2>
          <p className="text-sm sm:text-base text-[#EDE7DC]">
            Una alianza viva que articula la geografía elquina: desde las quebradas de pastoreo hasta las cumbres astronómicas.
          </p>

          <VisualSubtitleBadge sectionKey="territory" />

          {/* Demo Data Disclaimer Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#281D1A] border border-[#D4AF37]/40 text-xs text-[#C5BCAC]">
            <Info className="w-4 h-4 text-[#D4AF37] shrink-0" aria-hidden="true" />
            <span>{SITE_CONFIG.demo.disclaimer}</span>
          </div>
        </div>

        {/* 3 Territories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TERRITORY_COMMUNITIES.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#281D1A] border border-[#3D2B26] hover:border-[#D4AF37]/50 shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1F1513] border border-[#3D2B26] flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#FDFBF7] mb-2">
                {item.name}
              </h3>
              <p className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
                {item.role}
              </p>
              <p className="text-sm text-[#EDE7DC] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
