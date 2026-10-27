'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Reservation, Subscriber } from '@/types';
import { adminLogoutAction } from '@/app/actions';
import {
  Calendar,
  Users,
  Mail,
  Database,
  Download,
  LogOut,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Tag,
} from 'lucide-react';

interface AdminDashboardClientProps {
  initialReservations: Reservation[];
  initialSubscribers: Subscriber[];
  storageMode: 'supabase' | 'local';
}

export function AdminDashboardClient({
  initialReservations,
  initialSubscribers,
  storageMode,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'reservas' | 'suscriptores'>('reservas');
  const [searchQuery, setSearchQuery] = useState('');

  const totalGuests = initialReservations.reduce((sum, r) => sum + r.guests, 0);

  const filteredReservations = initialReservations.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.code.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.date.includes(q)
    );
  });

  const filteredSubscribers = initialSubscribers.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.coupon_code.toLowerCase().includes(q)
    );
  });

  const handleExportData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      storageMode,
      totalReservations: initialReservations.length,
      totalGuests,
      totalSubscribers: initialSubscribers.length,
      reservations: initialReservations,
      subscribers: initialSubscribers,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `valle-alastrellas-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Top Bar with Navigation and Logout */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#3D2B26]">
        <div>
          <Link
            href="/"
            className="text-xs text-[#C5BCAC] hover:text-[#D4AF37] flex items-center gap-1.5 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la experiencia en vivo</span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FDFBF7] flex items-center gap-3">
            <span>Panel de Control</span>
            <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
              Demo Mode
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportData}
            className="px-4 py-2 rounded-xl bg-[#281D1A] hover:bg-[#3D2B26] border border-[#3D2B26] text-[#EDE7DC] text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Exportar JSON</span>
          </button>

          <button
            type="button"
            onClick={async () => {
              await adminLogoutAction();
              window.location.reload();
            }}
            className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-200 text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Storage status */}
        <div className="p-5 rounded-2xl bg-[#1F1513] border border-[#3D2B26]">
          <div className="flex items-center justify-between text-xs text-[#C5BCAC] mb-2">
            <span>Motor de Almacenamiento</span>
            <Database className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                storageMode === 'supabase' ? 'bg-emerald-400' : 'bg-amber-400'
              } animate-pulse`}
            />
            <span className="font-serif font-bold text-lg text-[#FDFBF7]">
              {storageMode === 'supabase' ? 'Supabase Postgres' : 'Adaptador Local'}
            </span>
          </div>
          <p className="text-[11px] text-[#9A8F7F] mt-1">
            {storageMode === 'supabase' ? 'Sincronizado en la nube' : 'Infallible Local Fallback'}
          </p>
        </div>

        {/* Total Reservations */}
        <div className="p-5 rounded-2xl bg-[#1F1513] border border-[#3D2B26]">
          <div className="flex items-center justify-between text-xs text-[#C5BCAC] mb-2">
            <span>Reservas Confirmadas</span>
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <p className="font-serif font-bold text-3xl text-[#D4AF37]">
            {initialReservations.length}
          </p>
          <p className="text-[11px] text-[#9A8F7F] mt-1">Experiencias a las 17:00 hrs</p>
        </div>

        {/* Total Guests */}
        <div className="p-5 rounded-2xl bg-[#1F1513] border border-[#3D2B26]">
          <div className="flex items-center justify-between text-xs text-[#C5BCAC] mb-2">
            <span>Comensales Totales</span>
            <Users className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <p className="font-serif font-bold text-3xl text-[#FDFBF7]">
            {totalGuests}
          </p>
          <p className="text-[11px] text-[#9A8F7F] mt-1">Límite 12 por noche</p>
        </div>

        {/* Total Subscribers */}
        <div className="p-5 rounded-2xl bg-[#1F1513] border border-[#3D2B26]">
          <div className="flex items-center justify-between text-xs text-[#C5BCAC] mb-2">
            <span>Suscriptores con Cupón</span>
            <Mail className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <p className="font-serif font-bold text-3xl text-[#D4AF37]">
            {initialSubscribers.length}
          </p>
          <p className="text-[11px] text-[#9A8F7F] mt-1">15% de descuento emitido</p>
        </div>
      </div>

      {/* Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex rounded-xl bg-[#1F1513] p-1 border border-[#3D2B26]">
          <button
            type="button"
            onClick={() => setActiveTab('reservas')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'reservas'
                ? 'bg-[#D4AF37] text-[#1F1513] shadow'
                : 'text-[#EDE7DC] hover:text-[#D4AF37]'
            }`}
          >
            Reservas ({initialReservations.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('suscriptores')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'suscriptores'
                ? 'bg-[#D4AF37] text-[#1F1513] shadow'
                : 'text-[#EDE7DC] hover:text-[#D4AF37]'
            }`}
          >
            Suscriptores ({initialSubscribers.length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#9A8F7F] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por código, nombre, correo..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1F1513] border border-[#3D2B26] focus:border-[#D4AF37] text-xs text-[#FDFBF7] focus:outline-none"
          />
        </div>
      </div>

      {/* Active Tab Table */}
      {activeTab === 'reservas' ? (
        <div className="rounded-2xl bg-[#1F1513] border border-[#3D2B26] overflow-x-auto shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#281D1A] text-[#D4AF37] font-mono uppercase text-[11px] border-b border-[#3D2B26]">
              <tr>
                <th className="p-4">Código</th>
                <th className="p-4">Fecha (17:00)</th>
                <th className="p-4">Comensales</th>
                <th className="p-4">Titular</th>
                <th className="p-4">Contacto</th>
                <th className="p-4">Requerimientos</th>
                <th className="p-4">Cupón</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D2B26]/60 text-[#EDE7DC]">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#9A8F7F]">
                    No se encontraron reservas que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                filteredReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-[#281D1A]/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#D4AF37] whitespace-nowrap">
                      {res.code}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{res.date}</span>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-[#FDFBF7]">
                      {res.guests} {res.guests === 1 ? 'persona' : 'personas'}
                      <span className="block text-[10px] font-normal text-[#C5BCAC]">
                        ({res.companion_type})
                      </span>
                    </td>
                    <td className="p-4">
                      <strong className="block text-[#FDFBF7]">{res.name}</strong>
                      {res.comments && (
                        <span className="text-[11px] text-[#C5BCAC] italic block max-w-xs truncate">
                          "{res.comments}"
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-[11px]">
                      <div>{res.email}</div>
                      <div className="text-[#9A8F7F]">{res.phone}</div>
                    </td>
                    <td className="p-4">
                      {res.dietary_needs && res.dietary_needs.length > 0 ? (
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {res.dietary_needs.map((d, dIdx) => (
                            <span
                              key={dIdx}
                              className="px-1.5 py-0.5 rounded bg-[#3D2B26] text-[#D4AF37] text-[10px]"
                            >
                              {d.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[#9A8F7F] text-[11px]">Estándar</span>
                      )}
                    </td>
                    <td className="p-4">
                      {res.discount_applied ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold">
                          -15% ({res.discount_code})
                        </span>
                      ) : (
                        <span className="text-[#9A8F7F] text-[11px]">—</span>
                      )}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[10px] font-bold flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Confirmada</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Subscribers Table */
        <div className="rounded-2xl bg-[#1F1513] border border-[#3D2B26] overflow-x-auto shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#281D1A] text-[#D4AF37] font-mono uppercase text-[11px] border-b border-[#3D2B26]">
              <tr>
                <th className="p-4">Nombre</th>
                <th className="p-4">Correo</th>
                <th className="p-4">Compañía</th>
                <th className="p-4">Cupón Emitido</th>
                <th className="p-4">Fecha Registro</th>
                <th className="p-4">Aviso Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D2B26]/60 text-[#EDE7DC]">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#9A8F7F]">
                    No se encontraron suscriptores.
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#281D1A]/50 transition-colors">
                    <td className="p-4 font-bold text-[#FDFBF7]">{sub.name}</td>
                    <td className="p-4 text-[#C5BCAC]">{sub.email}</td>
                    <td className="p-4 capitalize">{sub.companion_type}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-[#281D1A] border border-[#D4AF37]/50 text-[#D4AF37] font-mono font-bold text-xs">
                        {sub.coupon_code}
                      </span>
                    </td>
                    <td className="p-4 text-[#9A8F7F]">
                      {new Date(sub.created_at).toLocaleDateString('es-CL')}
                    </td>
                    <td className="p-4">
                      {sub.notified ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold">
                          ✓ Despachado
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-[#3D2B26] text-[#C5BCAC] text-[10px]">
                          Pendiente / Local
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
