'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, Calendar, ShieldCheck } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';
import { SITE_CONFIG } from '@/data/site';

const NAV_ITEMS = [
  { label: 'Inicio', href: '/#inicio', id: 'inicio' },
  { label: 'Productos', href: '/#productos', id: 'productos' },
  { label: 'Sobre Nosotros', href: '/#sobre-nosotros', id: 'about' },
  { label: 'Territorio', href: '/#vinculacion', id: 'territory' },
  { label: 'Restaurantes', href: '/#restaurantes', id: 'restaurants' },
  { label: 'Suscripción', href: '/#suscripcion', id: 'subscription' },
  { label: 'Trivia', href: '/#trivia', id: 'trivia' },
  { label: 'Contacto', href: '/#contacto', id: 'contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setActiveSection } = useAccessibility();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-[41px] z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1F1513]/95 backdrop-blur-md shadow-2xl border-b border-[#3D2B26]/80'
          : 'bg-[#1F1513]/80 backdrop-blur-sm border-b border-[#3D2B26]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo / Brand Name */}
          <Link
            href="/"
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label={`${SITE_CONFIG.name} - Ir al inicio`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C6D15] p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#1F1513] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" aria-hidden="true" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm sm:text-base md:text-lg font-bold tracking-wide text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors leading-tight">
                Valle a las Estrellas
              </span>
              <span className="text-[10px] text-[#C5BCAC] tracking-wider uppercase">
                Valle del Elqui · Chile
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-5 text-xs font-medium text-[#EDE7DC]"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className="hover:text-[#D4AF37] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D4AF37] hover:after:w-full after:transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA: Reservar & Admin */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-[#C5BCAC] hover:text-[#D4AF37] text-xs px-2.5 py-1.5 rounded border border-[#3D2B26] hover:border-[#D4AF37]/50 transition-colors flex items-center gap-1.5"
              title="Panel de administración (Demo)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
              <span>Admin</span>
            </Link>

            <a
              href="/#reservas"
              onClick={() => handleNavClick('reservations')}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#1F1513] font-bold text-xs px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Reservar</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="/#reservas"
              onClick={() => handleNavClick('reservations')}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-[#1F1513] font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reservar</span>
            </a>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#EDE7DC] hover:text-[#D4AF37] hover:bg-[#281D1A] transition-colors"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="lg:hidden bg-[#1F1513] border-b border-[#3D2B26] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.id)}
              className="block px-3 py-2.5 rounded-md text-sm font-medium text-[#FDFBF7] hover:bg-[#281D1A] hover:text-[#D4AF37] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#3D2B26] flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="text-xs text-[#C5BCAC] hover:text-[#D4AF37] flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Panel Admin (Demo)</span>
            </Link>
            <Link
              href="/recetario"
              onClick={() => setIsOpen(false)}
              className="text-xs text-[#D4AF37] font-medium"
            >
              📖 Recetario Digital
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
