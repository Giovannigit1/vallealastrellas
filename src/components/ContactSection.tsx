'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/data/site';
import { VisualSubtitleBadge } from './VisualSubtitleBadge';
import { MapPin, Phone, Mail, MessageCircle, ChevronDown, Clock, Info } from 'lucide-react';

const FAQS = [
  {
    q: '¿Se requiere experiencia previa en astronomía?',
    a: 'Ninguna. La sesión de astroturismo está diseñada para todo público, combinando divulgación científica accesible con relatos de constelaciones y cosmovisión diaguita.',
  },
  {
    q: '¿Qué ocurre en caso de nubosidad o lluvia inesperada?',
    a: 'El Valle del Elqui cuenta con más de 300 noches despejadas al año. En el excepcional caso de nubosidad densa, la cena a 4 tiempos se complementa con una cata sensorial guiada en barrica y proyección astronómica digital interactiva en domo interior, o bien reprogramación sin costo.',
  },
  {
    q: '¿Tienen traslados desde Vicuña o La Serena?',
    a: 'Sí. Puedes coordinar servicio de transfer privado o compartido desde el centro de Vicuña o La Serena al momento de confirmar tu reserva.',
  },
  {
    q: '¿Los niños pueden participar en la experiencia?',
    a: '¡Por supuesto! Contamos con menú infantil adaptado y actividades didácticas con telescopios diseñadas especialmente para ellos.',
  },
];

export function ContactSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="contacto"
      className="py-24 bg-[#18100E] relative"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Atención Personalizada</span>
          </div>
          <h2
            id="contact-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7] mb-4"
          >
            Ubicación y Contacto
          </h2>
          <p className="text-sm sm:text-base text-[#EDE7DC]">
            Estamos esperándote en las faldas de la cordillera elquina. Escríbenos o llámanos para resolver cualquier consulta.
          </p>

          <VisualSubtitleBadge sectionKey="contact" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info Card */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-[#281D1A] border border-[#3D2B26] shadow-xl space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#FDFBF7]">
                Refugio Valle a las Estrellas
              </h3>

              <div className="space-y-4 text-sm text-[#EDE7DC]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="block text-[#FDFBF7]">Dirección:</strong>
                    <span>{SITE_CONFIG.location.address}</span>
                    <span className="block text-xs text-[#C5BCAC]">
                      {SITE_CONFIG.location.commune}, {SITE_CONFIG.location.region}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="block text-[#FDFBF7]">Horario de la Experiencia:</strong>
                    <span>Diaria de 17:00 a 21:00 hrs (Puntual)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="block text-[#FDFBF7]">Teléfono de Reservas (Demo):</strong>
                    <span>{SITE_CONFIG.demo.phoneDisplay}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="block text-[#FDFBF7]">Correo de Contacto (Demo):</strong>
                    <span>{SITE_CONFIG.demo.email}</span>
                  </div>
                </div>
              </div>

              {/* Demo notice */}
              <div className="p-3.5 rounded-xl bg-[#1F1513] border border-[#3D2B26] text-xs text-[#C5BCAC] flex items-center gap-2">
                <Info className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{SITE_CONFIG.demo.disclaimer}</span>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${SITE_CONFIG.demo.whatsappNumber}?text=Hola,%20deseo%20consultar%20por%20la%20experiencia%20Del%20Valle%20a%20la%20Mesa`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Conversar Directo por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: FAQs Accordion */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFBF7] mb-4">
              Preguntas Frecuentes
            </h3>

            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#281D1A] border border-[#3D2B26] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-[#FDFBF7] hover:text-[#D4AF37] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#D4AF37] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#EDE7DC] leading-relaxed border-t border-[#3D2B26]/60 pt-3 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
