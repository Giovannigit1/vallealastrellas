'use client';

import React from 'react';
import { ALLIED_RESTAURANTS, SITE_CONFIG } from '@/data/site';
import { VisualSubtitleBadge } from './VisualSubtitleBadge';
import { Utensils, MapPin, Sparkles, Tag } from 'lucide-react';

export function RestaurantsSection() {
  return (
    <section
      id="restaurantes"
      className="py-24 bg-[#1F1513] relative"
      aria-labelledby="restaurants-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
            <Utensils className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Red Gastronómica del Valle</span>
          </div>
          <h2
            id="restaurants-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7] mb-4"
          >
            Restaurantes & Espacios Aliados
          </h2>
          <p className="text-sm sm:text-base text-[#EDE7DC]">
            Comedores de campo, cocinas solares y terrazas bajo las estrellas que comparten nuestra visión de hospitalidad elquina.
          </p>

          <VisualSubtitleBadge sectionKey="restaurants" />

          <p className="mt-2 text-xs text-[#C5BCAC]">
            {SITE_CONFIG.demo.disclaimer}
          </p>
        </div>

        {/* Allied Restaurants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALLIED_RESTAURANTS.map((rest) => (
            <div
              key={rest.id}
              className="p-6 rounded-2xl bg-[#281D1A] border border-[#3D2B26] hover:border-[#D4AF37]/60 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-medium">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{rest.locality}</span>
                  </div>
                  {rest.isDemo && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#3D2B26] text-[#C5BCAC] flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" />
                      <span>DEMO</span>
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors mb-2">
                  {rest.name}
                </h3>

                <p className="text-xs font-semibold text-[#C05A3E] mb-3">
                  {rest.specialty}
                </p>

                <p className="text-xs text-[#EDE7DC] leading-relaxed">
                  {rest.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#3D2B26] flex items-center gap-1.5 text-[11px] text-[#C5BCAC]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                <span>Alianza territorial activa</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
