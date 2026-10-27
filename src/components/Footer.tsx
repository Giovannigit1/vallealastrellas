'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/site';
import { Sparkles, Heart, ShieldCheck, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#120A09] text-[#EDE7DC] border-t border-[#3D2B26] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1F1513]">
                <Sparkles className="w-4 h-4 fill-current" aria-hidden="true" />
              </div>
              <span className="font-serif font-bold text-lg text-[#FDFBF7]">
                {SITE_CONFIG.shortName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#C5BCAC] max-w-md leading-relaxed">
              «Del valle a la mesa, de la mesa a las estrellas». Encuentro gastronómico de campo, producto con identidad territorial y astroturismo bajo los cielos más limpios del planeta.
            </p>
            <p className="text-xs text-[#9A8F7F]">
              📍 {SITE_CONFIG.location.address}, {SITE_CONFIG.location.commune}, Chile.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 text-xs sm:text-sm">
            <h4 className="font-serif font-bold text-[#D4AF37] tracking-wider uppercase text-xs">
              Navegación
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/#inicio" className="text-[#EDE7DC] hover:text-[#D4AF37] transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/#timeline" className="text-[#EDE7DC] hover:text-[#D4AF37] transition-colors">
                  Línea de 4 Horas
                </a>
              </li>
              <li>
                <a href="/#productos" className="text-[#EDE7DC] hover:text-[#D4AF37] transition-colors">
                  Productos Típicos
                </a>
              </li>
              <li>
                <a href="/#reservas" className="text-[#EDE7DC] hover:text-[#D4AF37] transition-colors">
                  Reservar Experiencia
                </a>
              </li>
              <li>
                <Link href="/recetario" className="text-[#EDE7DC] hover:text-[#D4AF37] transition-colors">
                  Recetario Digital
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Inclusion & Admin */}
          <div className="space-y-3 text-xs sm:text-sm">
            <h4 className="font-serif font-bold text-[#D4AF37] tracking-wider uppercase text-xs">
              Compromiso & Acceso
            </h4>
            <ul className="space-y-2 text-xs text-[#C5BCAC]">
              <li>✓ Cumplimiento WCAG 2.1 AA/AAA</li>
              <li>✓ Navegación por teclado y voz Web Speech</li>
              <li>✓ Subtítulos visuales para personas sordas</li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#281D1A] border border-[#3D2B26] hover:border-[#D4AF37]/50 text-[#D4AF37] transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Panel Interno (Demo)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#3D2B26] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9A8F7F]">
          <p>© 2026 {SITE_CONFIG.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Hecho con <Heart className="w-3 h-3 text-[#C05A3E] fill-current" aria-hidden="true" /> en el Valle del Elqui
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#281D1A] hover:bg-[#3D2B26] text-[#D4AF37] transition-colors"
              aria-label="Volver arriba"
              title="Volver al inicio de la página"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
