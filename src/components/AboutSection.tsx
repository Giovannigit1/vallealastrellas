'use client';

import React from 'react';
import Image from 'next/image';
import { VisualSubtitleBadge } from './VisualSubtitleBadge';
import { Sparkles, Quote, Shield, HeartHandshake } from 'lucide-react';

export function AboutSection() {
  return (
    <section
      id="sobre-nosotros"
      className="py-24 bg-[#1F1513] relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Narrative */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Nuestra Historia y Filosofía</span>
            </div>

            <h2
              id="about-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7] mb-6 leading-tight"
            >
              Donde la Tierra Diaguita Dialoga con el Cosmos
            </h2>

            <VisualSubtitleBadge sectionKey="about" />

            <div className="space-y-4 text-sm sm:text-base text-[#EDE7DC] leading-relaxed">
              <p>
                Nacimos de un pacto entre familias campesinas, crianceros de quebrada y astrónomos residentes del Valle del Elqui. Creemos que la alta cocina no debe desarraigarse del suelo que la nutre, ni la ciencia del cielo debe aislarse de la poesía campesina.
              </p>
              <p>
                Cada plato que servimos a las brasas rescata técnicas prehispánicas de cocción lenta y conservación con mieles nativas, rindiendo homenaje a la generosidad de este oasis regado por el Río Claro y el Río Turbio.
              </p>
            </div>

            {/* Gabriela Mistral quote box */}
            <div className="mt-8 p-6 rounded-2xl bg-[#281D1A] border-l-4 border-[#D4AF37] relative">
              <Quote className="w-8 h-8 text-[#D4AF37]/30 absolute top-4 right-4" aria-hidden="true" />
              <blockquote className="italic font-serif text-base sm:text-lg text-[#FDFBF7] mb-2">
                «Tengo de mi valle dos cosas: la cordillera y el cielo; la cordillera me enseñó la perseverancia y el cielo me enseñó a mirar lo eterno.»
              </blockquote>
              <cite className="not-italic text-xs text-[#D4AF37] font-semibold tracking-wider">
                — Gabriela Mistral, nacida en Vicuña, Valle del Elqui
              </cite>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-sm text-[#FDFBF7]">Cielos Protegidos</h3>
                  <p className="text-xs text-[#C5BCAC]">
                    Compromiso activo con la preservación contra la contaminación lumínica.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-sm text-[#FDFBF7]">Comercio Ético</h3>
                  <p className="text-xs text-[#C5BCAC]">
                    Trato directo y precio justo con crianceros y recolectores locales.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Evocative Vineyard & Observatory Image */}
          <div className="relative">
            <div className="relative h-[480px] w-full rounded-3xl overflow-hidden border border-[#3D2B26] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
                alt="Paisaje crepuscular entre montañas y viñedos del Valle del Elqui"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#1F1513] via-transparent to-black/20"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#1F1513]/90 backdrop-blur-md border border-[#D4AF37]/30 text-xs text-[#EDE7DC]">
                <p className="font-serif font-bold text-sm text-[#D4AF37] mb-0.5">Refugio Elqui</p>
                <p className="text-[#C5BCAC]">Paihuano, Coquimbo · 1.300 msnm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
