'use client';

import React, { useState, useEffect, useTransition } from 'react';
import confetti from 'canvas-confetti';
import { createReservationAction, checkDateAvailabilityAction } from '@/app/actions';
import { VisualSubtitleBadge } from './VisualSubtitleBadge';
import { SITE_CONFIG } from '@/data/site';
import { Reservation, CompanionType } from '@/types';
import {
  Calendar,
  Users,
  Clock,
  Sparkles,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Tag,
  ShieldCheck,
  Check,
} from 'lucide-react';

const COMPANION_OPTIONS: { value: CompanionType; label: string }[] = [
  { value: 'pareja', label: 'En pareja' },
  { value: 'familia', label: 'Familia con niños' },
  { value: 'amigos', label: 'Grupo de amigos' },
  { value: 'solo', label: 'En solitario / Retiro' },
  { value: 'corporativo', label: 'Celebración corporativa' },
];

const DIETARY_OPTIONS = [
  { id: 'alergico_celiaco', label: 'Menú para alérgicos / celíacos (sin gluten)' },
  { id: 'diabetico', label: 'Menú para diabéticos (sin azúcares refinados)' },
  { id: 'adulto_mayor_movilidad', label: 'Adulto mayor o persona con movilidad reducida (asiento preferencial)' },
  { id: 'menu_infantil', label: 'Menú infantil adaptado para niños' },
];

export function ReservationSection() {
  const [isPending, startTransition] = useTransition();

  const [date, setDate] = useState<string>('');
  const [minDate, setMinDate] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [companionType, setCompanionType] = useState<CompanionType>('pareja');
  const [dietaryNeeds, setDietaryNeeds] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [discountCode, setDiscountCode] = useState<string>('');

  // Availability state
  const [remainingSpots, setRemainingSpots] = useState<number>(12);
  const [checkingSpots, setCheckingSpots] = useState<boolean>(false);

  // Initialize dates safely on mount
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setMinDate(today.toISOString().split('T')[0]);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Submission state
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Check availability when date changes
  useEffect(() => {
    if (!date) return;
    let isCancelled = false;
    setCheckingSpots(true);
    checkDateAvailabilityAction(date)
      .then((data) => {
        if (!isCancelled) {
          setRemainingSpots(data.remaining);
          setCheckingSpots(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setRemainingSpots(12);
          setCheckingSpots(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [date]);

  const toggleDietaryNeed = (id: string) => {
    setDietaryNeeds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isCouponValid =
    discountCode.trim().toUpperCase() === SITE_CONFIG.experience.discountCouponDefault ||
    discountCode.trim().toUpperCase().startsWith('ELQUI15-');

  const basePrice = SITE_CONFIG.experience.basePriceCLP;
  const subtotal = basePrice * guests;
  const discountAmount = isCouponValid ? Math.round(subtotal * 0.15) : 0;
  const total = subtotal - discountAmount;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    const formData = new FormData();
    formData.set('date', date);
    formData.set('guests', String(guests));
    formData.set('companion_type', companionType);
    dietaryNeeds.forEach((d) => formData.append('dietary_needs', d));
    formData.set('name', name);
    formData.set('email', email);
    formData.set('phone', phone);
    if (comments) formData.set('comments', comments);
    if (discountCode) formData.set('discount_code', discountCode);

    startTransition(async () => {
      const res = await createReservationAction(formData);
      if (res.success && res.data) {
        setConfirmedReservation(res.data);
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#F3E5AB', '#FFFFFF', '#C05A3E'],
          });
        } catch {}
      } else {
        setErrorMessage(res.error || 'Ocurrió un problema al procesar la reserva.');
        if (res.fieldErrors) {
          setFieldErrors(res.fieldErrors);
        }
      }
    });
  };

  // WhatsApp Pre-filled Link Generator
  const generateWhatsAppUrl = () => {
    const rawNumber = SITE_CONFIG.demo.whatsappNumber;
    const msg = `Hola Valle a las Estrellas, me gustaría coordinar una reserva para la experiencia de las 17:00 hrs.%0A%0A` +
      `📅 Fecha: ${date}%0A` +
      `👥 Personas: ${guests}%0A` +
      `👤 Nombre: ${encodeURIComponent(name || 'Visitante')}%0A` +
      `📞 Teléfono: ${encodeURIComponent(phone || 'Por confirmar')}%0A` +
      (discountCode ? `🏷️ Cupón: ${encodeURIComponent(discountCode)}%0A` : '') +
      `¿Tienen cupos disponibles?`;

    return `https://wa.me/${rawNumber}?text=${msg}`;
  };

  return (
    <section
      id="reservas"
      className="py-24 bg-[#140C0B] relative overflow-hidden"
      aria-labelledby="reservas-heading"
    >
      {/* Background starlight accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 blur-3xl rounded-full"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reserva de Experiencia en Vivo</span>
          </div>

          <h2
            id="reservas-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7] mb-4"
          >
            Asegura Tu Mesa Bajo las Estrellas
          </h2>

          <p className="text-sm sm:text-base text-[#EDE7DC]">
            Jornada exclusiva diaria de 17:00 a 21:00 hrs. Limitada a un máximo estricto de 12 comensales por noche para preservar la intimidad astronómica.
          </p>

          <VisualSubtitleBadge sectionKey="reservations" />
        </div>

        {/* Successful Confirmation View */}
        {confirmedReservation ? (
          <div
            role="alert"
            aria-live="polite"
            className="p-8 md:p-12 rounded-3xl bg-[#281D1A] border-2 border-[#D4AF37] shadow-2xl text-center max-w-2xl mx-auto animate-fade-in"
          >
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-[#D4AF37]" aria-hidden="true" />
            </div>

            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#D4AF37]">
              ¡Reserva Confirmada con Éxito!
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FDFBF7] mt-1 mb-2">
              Te Esperamos en el Valle del Elqui
            </h3>

            <p className="text-sm text-[#EDE7DC] mb-6">
              Hemos registrado tu lugar para la experiencia de las 17:00 a las 21:00 hrs.
            </p>

            {/* Public Booking Code Display */}
            <div className="p-4 rounded-xl bg-[#1F1513] border border-[#3D2B26] mb-6">
              <span className="text-xs text-[#C5BCAC] block mb-1">Código Único de Reserva:</span>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#D4AF37] tracking-widest">
                {confirmedReservation.code}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-left text-xs bg-[#1F1513]/60 p-4 rounded-xl border border-[#3D2B26] mb-8">
              <div>
                <span className="text-[#C5BCAC] block">Fecha:</span>
                <strong className="text-[#FDFBF7]">{confirmedReservation.date} (17:00 hrs)</strong>
              </div>
              <div>
                <span className="text-[#C5BCAC] block">Comensales:</span>
                <strong className="text-[#FDFBF7]">{confirmedReservation.guests} personas</strong>
              </div>
              <div>
                <span className="text-[#C5BCAC] block">Titular:</span>
                <strong className="text-[#FDFBF7]">{confirmedReservation.name}</strong>
              </div>
              <div>
                <span className="text-[#C5BCAC] block">Descuento aplicado:</span>
                <strong className="text-[#D4AF37]">
                  {confirmedReservation.discount_applied ? '15% Descuento Activo' : 'Tarifa Normal'}
                </strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmar por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setConfirmedReservation(null)}
                className="px-6 py-3.5 rounded-xl bg-[#3D2B26] hover:bg-[#4D3730] text-[#EDE7DC] text-xs sm:text-sm font-medium transition-all"
              >
                Hacer Otra Reserva
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <div className="rounded-3xl bg-[#281D1A]/95 border border-[#3D2B26] shadow-2xl p-6 sm:p-10 md:p-12">
            {errorMessage && (
              <div
                role="alert"
                className="mb-8 p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-sm flex items-center gap-3 animate-fade-in"
              >
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Date & Party Size */}
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#1F1513] text-xs font-mono font-bold flex items-center justify-center">
                    1
                  </span>
                  <span>Selección de Fecha y Comensales</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {/* Date Input */}
                  <div>
                    <label
                      htmlFor="res-date"
                      className="block text-xs font-semibold text-[#EDE7DC] mb-2"
                    >
                      Fecha de Experiencia (17:00 hrs) *
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      name="date"
                      value={date}
                      min={minDate || undefined}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      aria-describedby="date-help"
                      className="w-full px-4 py-3 rounded-xl bg-[#1F1513] border border-[#3D2B26] focus:border-[#D4AF37] text-[#FDFBF7] text-sm focus:outline-none transition-colors"
                    />
                    <div id="date-help" className="mt-1.5 flex items-center justify-between text-[11px]">
                      <span className="text-[#C5BCAC]">
                        {checkingSpots ? 'Verificando cupos...' : `Cupos disponibles: `}
                        <strong className="text-[#D4AF37]">{remainingSpots} de 12</strong>
                      </span>
                    </div>
                    {fieldErrors.date && (
                      <p className="text-red-400 text-xs mt-1">{fieldErrors.date}</p>
                    )}
                  </div>

                  {/* Guests Input (1 to 12) */}
                  <div>
                    <label
                      htmlFor="res-guests"
                      className="block text-xs font-semibold text-[#EDE7DC] mb-2"
                    >
                      Número de Personas (1 a 12) *
                    </label>
                    <select
                      id="res-guests"
                      name="guests"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-[#1F1513] border border-[#3D2B26] focus:border-[#D4AF37] text-[#FDFBF7] text-sm focus:outline-none transition-colors"
                    >
                      {Array.from({ length: Math.min(12, remainingSpots || 12) }, (_, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'persona' : 'personas'}
                          </option>
                        )
                      )}
                    </select>
                    <p className="text-[11px] text-[#C5BCAC] mt-1.5">
                      Máximo 12 comensales por grupo/jornada
                    </p>
                    {fieldErrors.guests && (
                      <p className="text-red-400 text-xs mt-1">{fieldErrors.guests}</p>
                    )}
                  </div>

                  {/* Companion Type */}
                  <div>
                    <label
                      htmlFor="res-companion"
                      className="block text-xs font-semibold text-[#EDE7DC] mb-2"
                    >
                      ¿Con quién nos visitas? *
                    </label>
                    <select
                      id="res-companion"
                      name="companion_type"
                      value={companionType}
                      onChange={(e) => setCompanionType(e.target.value as CompanionType)}
                      className="w-full px-4 py-3 rounded-xl bg-[#1F1513] border border-[#3D2B26] focus:border-[#D4AF37] text-[#FDFBF7] text-sm focus:outline-none transition-colors"
                    >
                      {COMPANION_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-[#C5BCAC] mt-1.5">Nos permite personalizar tu mesa</p>
                  </div>
                </div>
              </div>

              {/* Step 2: Inclusivity & Special Dietary Needs Checklist */}
              <div className="pt-6 border-t border-[#3D2B26]">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#D4AF37] mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#1F1513] text-xs font-mono font-bold flex items-center justify-center">
                    2
                  </span>
                  <span>Inclusión y Necesidades Alimentarias (Checklist)</span>
                </h3>
                <p className="text-xs text-[#C5BCAC] mb-4">
                  Adaptamos los 4 tiempos del banquete y el acceso sin costo adicional:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DIETARY_OPTIONS.map((item) => {
                    const isChecked = dietaryNeeds.includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isChecked
                            ? 'bg-[#1F1513] border-[#D4AF37] text-[#FDFBF7]'
                            : 'bg-[#1F1513]/60 border-[#3D2B26] text-[#EDE7DC] hover:border-[#D4AF37]/40'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleDietaryNeed(item.id)}
                          className="mt-1 h-4 w-4 rounded border-[#3D2B26] text-[#D4AF37] focus:ring-[#D4AF37] bg-[#1F1513]"
                        />
                        <span className="text-xs leading-relaxed">{item.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Contact Details */}
              <div className="pt-6 border-t border-[#3D2B26]">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#1F1513] text-xs font-mono font-bold flex items-center justify-center">
                    3
                  </span>
                  <span>Datos de Contacto del Titular</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="res-name"
                      className="block text-xs font-semibold text-[#EDE7DC] mb-2"
                    >
                      Nombre y Apellido *
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Marcela Rojas"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#1F1513] border border-[#3D2B26] focus:border-[#D4AF37] text-[#FDFBF7] text-sm focus:outline-none transition-colors"
                    />
                    {fieldErrors.name && (
                      <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="res-email"
                      className="block text-xs font-semibold text-[#EDE7DC] mb-2"
                    >
                      Correo Electrónico *
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marcela@ejemplo.cl"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#1F1513] border border-[#3D2B26] focus:border-[#D4AF37] text-[#FDFBF7] text-sm focus:outline-none transition-colors"
                    />
                    {fieldErrors.email && (
                      <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="res-phone"
                      className="block text-xs font-semibold text-[#EDE7DC] mb-2"
                    >
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+56 9 8765 4321"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#1F1513] border border-[#3D2B26] focus:border-[#D4AF37] text-[#FDFBF7] text-sm focus:outline-none transition-colors"
                    />
                    {fieldErrors.phone && (
                      <p className="text-red-400 text-xs mt-1">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="res-comments"
                    className="block text-xs font-semibold text-[#EDE7DC] mb-2"
                  >
                    Comentarios, ocasión especial o notas para el chef (Opcional)
                  </label>
                  <textarea
                    id="res-comments"
                    name="comments"
                    rows={2}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Cumpleaños, aniversario, traslados desde Vicuña..."
                    className="w-full px-4 py-3 rounded-xl bg-[#1F1513] border border-[#3D2B26] focus:border-[#D4AF37] text-[#FDFBF7] text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Step 4: Discount Coupon & Price Breakdown */}
              <div className="pt-6 border-t border-[#3D2B26]">
                <div className="p-6 rounded-2xl bg-[#1F1513] border border-[#3D2B26] flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Coupon Input */}
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="res-coupon"
                      className="block text-xs font-semibold text-[#D4AF37] mb-2 flex items-center gap-1.5"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>¿Tienes cupón de descuento del 15%?</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="res-coupon"
                        type="text"
                        name="discount_code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                        placeholder="Ej. VALLE15 o tu código"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#281D1A] border border-[#3D2B26] focus:border-[#D4AF37] text-[#D4AF37] font-mono text-xs uppercase focus:outline-none"
                      />
                    </div>
                    {isCouponValid ? (
                      <p className="text-xs text-emerald-400 mt-1.5 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>¡Cupón válido! 15% de descuento aplicado al total.</span>
                      </p>
                    ) : discountCode ? (
                      <p className="text-xs text-amber-400 mt-1.5">
                        Ingresa un cupón válido (prueba con VALLE15 o suscríbete abajo).
                      </p>
                    ) : null}
                  </div>

                  {/* Pricing Total */}
                  <div className="text-left md:text-right">
                    <p className="text-xs text-[#C5BCAC]">
                      Tarifa ({guests} {guests === 1 ? 'persona' : 'personas'} · 4 tiempos + astroturismo):
                    </p>
                    {isCouponValid && (
                      <p className="text-xs text-[#C05A3E] line-through">
                        ${subtotal.toLocaleString('es-CL')} CLP
                      </p>
                    )}
                    <p className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                      ${total.toLocaleString('es-CL')}{' '}
                      <span className="text-xs font-sans text-[#EDE7DC]">CLP</span>
                    </p>
                    <p className="text-[11px] text-[#9A8F7F]">
                      Incluye maridaje, cata sensorial y sesión guiada de telescopio.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#281D1A] hover:bg-[#3D2B26] text-[#EDE7DC] border border-[#3D2B26] hover:border-[#D4AF37]/50 font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Reservar por WhatsApp</span>
                </a>

                <button
                  type="submit"
                  disabled={isPending || remainingSpots < guests}
                  className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38F24] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#1F1513] font-bold text-sm tracking-wide shadow-xl hover:shadow-[#D4AF37]/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {isPending ? 'Confirmando Reserva...' : 'Confirmar Reserva en Vivo'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
