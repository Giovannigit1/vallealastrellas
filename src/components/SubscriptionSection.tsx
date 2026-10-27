'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { subscribeAction } from '@/app/actions';
import { VisualSubtitleBadge } from './VisualSubtitleBadge';
import { CompanionType } from '@/types';
import {
  Mail,
  Sparkles,
  BookOpen,
  CheckCircle,
  Copy,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

const COMPANION_OPTIONS: { value: CompanionType; label: string }[] = [
  { value: 'pareja', label: 'En pareja' },
  { value: 'familia', label: 'Familia con niños' },
  { value: 'amigos', label: 'Grupo de amigos' },
  { value: 'solo', label: 'En solitario / Retiro' },
  { value: 'corporativo', label: 'Corporativo / Empresa' },
];

export function SubscriptionSection() {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companionType, setCompanionType] = useState<CompanionType>('pareja');
  const [honeypot, setHoneypot] = useState('');

  const [generatedCoupon, setGeneratedCoupon] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('companion_type', companionType);
    if (honeypot) formData.set('website_url', honeypot);

    startTransition(async () => {
      const res = await subscribeAction(formData);
      if (res.success && res.data) {
        setGeneratedCoupon(res.data.coupon_code);
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#D4AF37', '#F3E5AB', '#FFFFFF'],
          });
        } catch {}
      } else {
        setErrorMessage(res.error || 'Ocurrió un error al procesar tu suscripción.');
      }
    });
  };

  const handleCopyCoupon = () => {
    if (!generatedCoupon) return;
    navigator.clipboard.writeText(generatedCoupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="suscripcion"
      className="py-24 bg-[#18100E] relative overflow-hidden"
      aria-labelledby="subscription-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#281D1A] to-[#1F1513] border border-[#3D2B26] p-8 sm:p-12 shadow-2xl relative">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Comunidad Elquina</span>
            </div>

            <h2
              id="subscription-heading"
              className="font-serif text-3xl sm:text-4xl font-bold text-[#FDFBF7] mb-3"
            >
              Únete a Nuestra Mesa y Recibe un 15% de Descuento
            </h2>

            <p className="text-sm text-[#EDE7DC]">
              Suscríbete para recibir de inmediato tu código promocional exclusivo y acceder a nuestro{' '}
              <strong className="text-[#D4AF37]">Recetario Digital de Sabores del Valle</strong> (3 preparaciones campesinas exclusivas).
            </p>

            <VisualSubtitleBadge sectionKey="subscription" />
          </div>

          {/* Success Result */}
          {generatedCoupon ? (
            <div
              role="alert"
              aria-live="polite"
              className="p-8 rounded-2xl bg-[#1F1513] border-2 border-[#D4AF37] text-center animate-fade-in"
            >
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-[#D4AF37]" aria-hidden="true" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#FDFBF7] mb-2">
                ¡Bienvenido a la Comunidad!
              </h3>
              <p className="text-xs sm:text-sm text-[#EDE7DC] mb-6">
                Guarda tu cupón personal para aplicarlo al reservar tu experiencia de las 17:00 hrs:
              </p>

              {/* Coupon Box with Copy Button */}
              <div className="inline-flex items-center gap-3 p-3 px-5 rounded-xl bg-[#281D1A] border border-[#D4AF37] mb-8">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#D4AF37] tracking-widest">
                  {generatedCoupon}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCoupon}
                  className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#1F1513] text-xs font-bold transition-colors flex items-center gap-1.5"
                  aria-label="Copiar código de descuento al portapapeles"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
                </button>
              </div>

              {/* Recipe Book CTA */}
              <div className="p-6 rounded-2xl bg-[#281D1A]/80 border border-[#3D2B26] max-w-lg mx-auto text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-[#D4AF37] shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#FDFBF7]">
                      Recetario Digital de Sabores del Valle
                    </h4>
                    <p className="text-xs text-[#C5BCAC]">
                      3 recetas con papaya, queso de cabra y pisco de autor
                    </p>
                  </div>
                </div>

                <Link
                  href="/recetario"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-[#1F1513] font-bold text-xs shadow-md hover:scale-105 transition-all text-center shrink-0 flex items-center justify-center gap-1.5"
                >
                  <span>Abrir Recetario</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            /* Subscription Form */
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
              {errorMessage && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot field (hidden from screen, catches spam bots) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="sub-website">Website</label>
                <input
                  id="sub-website"
                  type="text"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="sub-name" className="block text-xs font-semibold text-[#EDE7DC] mb-1.5">
                    Tu Nombre *
                  </label>
                  <input
                    id="sub-name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Rodrigo Fuentes"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1F1513] border border-[#3D2B26] focus:border-[#D4AF37] text-[#FDFBF7] text-xs sm:text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="sub-email" className="block text-xs font-semibold text-[#EDE7DC] mb-1.5">
                    Correo Electrónico *
                  </label>
                  <input
                    id="sub-email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rodrigo@ejemplo.cl"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1F1513] border border-[#3D2B26] focus:border-[#D4AF37] text-[#FDFBF7] text-xs sm:text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="sub-companion" className="block text-xs font-semibold text-[#EDE7DC] mb-1.5">
                    ¿Con quién nos visitas? *
                  </label>
                  <select
                    id="sub-companion"
                    name="companion_type"
                    value={companionType}
                    onChange={(e) => setCompanionType(e.target.value as CompanionType)}
                    className="w-full px-4 py-3 rounded-xl bg-[#1F1513] border border-[#3D2B26] focus:border-[#D4AF37] text-[#FDFBF7] text-xs sm:text-sm focus:outline-none transition-colors"
                  >
                    {COMPANION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38F24] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#1F1513] font-bold text-xs sm:text-sm shadow-xl hover:shadow-[#D4AF37]/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all inline-flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isPending ? 'Generando Cupón...' : 'Obtener 15% Descuento y Recetario'}</span>
                </button>
                <p className="text-[11px] text-[#9A8F7F] mt-2">
                  🔒 Cero spam. Tu información se almacena de forma segura y solo se usa para fines de tu experiencia.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
