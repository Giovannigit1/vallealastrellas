'use client';

import React from 'react';
import Image from 'next/image';
import { PRODUCTS_SHOWCASE } from '@/data/site';
import { VisualSubtitleBadge } from './VisualSubtitleBadge';
import { Sparkles, Wine, Compass } from 'lucide-react';

export function ProductsSection() {
  return (
    <section
      id="productos"
      className="py-24 bg-[#18100E] relative"
      aria-labelledby="products-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Patrimonio Gastronómico</span>
          </div>
          <h2
            id="products-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7] mb-4"
          >
            Tesoros con Identidad Elquina
          </h2>
          <p className="text-sm sm:text-base text-[#EDE7DC]">
            Ingredientes nacidos del sol implacable, la pureza de las aguas de deshielo cordillerano y la herencia de manos campesinas.
          </p>

          <VisualSubtitleBadge sectionKey="products" />
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS_SHOWCASE.map((product) => (
            <article
              key={product.id}
              className="group rounded-2xl bg-[#281D1A] border border-[#3D2B26] hover:border-[#D4AF37]/60 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container with Next.js Image */}
              <div className="relative h-60 w-full overflow-hidden bg-[#1F1513]">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#281D1A] via-transparent to-black/30"
                />
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-[#1F1513]/90 backdrop-blur-sm border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold">
                  {product.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#C05A3E] font-bold">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors mt-1 mb-3">
                    {product.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#EDE7DC] leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#3D2B26] space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-[#C5BCAC]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="text-[#EDE7DC]">Sensorial:</strong> {product.sensoryNotes}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-[#C5BCAC]">
                    <Wine className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="text-[#EDE7DC]">Maridaje sugerido:</strong> {product.pairing}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[#9A8F7F] pt-1">
                    <Compass className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span className="text-[11px]">Origen: {product.producer}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
