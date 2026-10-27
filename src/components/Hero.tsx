'use client';

import React, { useEffect, useState } from 'react';
import { StarfieldCanvas } from './StarfieldCanvas';
import { VisualSubtitleBadge } from './VisualSubtitleBadge';
import { Sparkles, Calendar, Clock, Users, ArrowDown, CloudSun } from 'lucide-react';
import { WeatherData } from '@/types';
import { SITE_CONFIG } from '@/data/site';

export function Hero() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch('/api/weather')
      .then((res) => res.json())
      .then((data: WeatherData) => setWeather(data))
      .catch(() => {});
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#140C0B] via-[#1F1513] to-[#0B132B] pt-12 pb-20"
      aria-label="Presentación principal de la experiencia"
    >
      {/* Interactive canvas starfield */}
      <StarfieldCanvas />

      {/* Warm sunset atmospheric glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#C05A3E]/20 via-[#D4AF37]/15 to-transparent blur-3xl rounded-full opacity-70"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Weather snapshot chip */}
        {weather && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#281D1A]/90 border border-[#D4AF37]/40 text-xs text-[#EDE7DC] mb-6 backdrop-blur-sm shadow-md animate-fade-in">
            <CloudSun className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            <span>
              Hoy en Vicuña:{' '}
              <strong className="text-[#D4AF37]">{weather.temperature}°C</strong> ·{' '}
              {weather.skyCondition} ({weather.isObservingRecommended ? 'Cielo óptimo' : 'Nubosidad'})
            </span>
          </div>
        )}

        {/* Visual subtitle badge for deaf visitors */}
        <VisualSubtitleBadge sectionKey="hero" />

        {/* Territory origin badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Valle del Elqui · Experiencia Exclusiva Diaria</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#FDFBF7] leading-[1.1] mb-6 max-w-4xl mx-auto">
          Del valle a la mesa, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#E5C158] bg-clip-text text-transparent">
            de la mesa a las estrellas
          </span>
        </h1>

        {/* Lead Narrative */}
        <p className="text-base sm:text-lg md:text-xl text-[#EDE7DC] max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Un encuentro gastronómico de campo al atardecer, cata sensorial de frutos nativos y banquete en 4 tiempos maridado bajo los cielos astronómicos más puros del mundo.
        </p>

        {/* Key Experience Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10 text-left">
          <div className="p-3 rounded-xl bg-[#281D1A]/80 border border-[#3D2B26] backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider">Horario</span>
            </div>
            <p className="text-sm font-semibold text-[#FDFBF7]">17:00 a 21:00 hrs</p>
            <p className="text-[11px] text-[#C5BCAC]">4 horas continuas</p>
          </div>

          <div className="p-3 rounded-xl bg-[#281D1A]/80 border border-[#3D2B26] backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
              <Users className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider">Intimidad</span>
            </div>
            <p className="text-sm font-semibold text-[#FDFBF7]">Máximo 12 cupos</p>
            <p className="text-[11px] text-[#C5BCAC]">Por cada jornada diaria</p>
          </div>

          <div className="p-3 rounded-xl bg-[#281D1A]/80 border border-[#3D2B26] backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider">Banquete</span>
            </div>
            <p className="text-sm font-semibold text-[#FDFBF7]">4 Tiempos de Autor</p>
            <p className="text-[11px] text-[#C5BCAC]">Maridaje D.O. Pisco y vinos</p>
          </div>

          <div className="p-3 rounded-xl bg-[#281D1A]/80 border border-[#3D2B26] backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider">Telescopio</span>
            </div>
            <p className="text-sm font-semibold text-[#FDFBF7]">Astroturismo Pro</p>
            <p className="text-[11px] text-[#C5BCAC]">Relato diaguita y cosmos</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#reservas"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38F24] text-[#1F1513] font-bold text-sm tracking-wide shadow-xl hover:shadow-[#D4AF37]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Reservar Mi Lugar (17:00 hrs)</span>
          </a>

          <a
            href="#timeline"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#281D1A]/90 hover:bg-[#3D2B26] text-[#EDE7DC] border border-[#3D2B26] hover:border-[#D4AF37]/50 font-medium text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Conocer la Línea de Tiempo</span>
            <ArrowDown className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
