import React from 'react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getReservations, getSubscribers, getStorageMode } from '@/lib/storage';
import { AdminDashboardClient } from './AdminDashboardClient';
import { ShieldCheck, Lock } from 'lucide-react';
import { adminLoginAction } from '@/app/actions';

export const metadata: Metadata = {
  title: 'Panel de Administración (Demo)',
  description: 'Gestión interna de reservas y suscriptores para demostración en vivo.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  const isAuthenticated = session?.value === 'authenticated_valle';

  if (!isAuthenticated) {
    return <AdminLoginForm />;
  }

  const reservations = await getReservations();
  const subscribers = await getSubscribers();
  const storageMode = getStorageMode();

  return (
    <div className="min-h-screen bg-[#140C0B] text-[#FDFBF7] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <AdminDashboardClient
          initialReservations={reservations}
          initialSubscribers={subscribers}
          storageMode={storageMode}
        />
      </div>
    </div>
  );
}

function AdminLoginForm() {
  return (
    <div className="min-h-screen bg-[#140C0B] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#1F1513] border-2 border-[#D4AF37] shadow-2xl text-center">
        <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-[#D4AF37]" />
        </div>

        <h1 className="font-serif text-2xl font-bold text-[#FDFBF7] mb-1">
          Panel de Administración
        </h1>
        <p className="text-xs text-[#C5BCAC] mb-6">
          Acceso protegido para demostración en vivo de reservas y suscriptores.
        </p>

        <form
          action={async (formData: FormData) => {
            'use server';
            const pass = formData.get('password')?.toString() || '';
            await adminLoginAction(pass);
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="admin-pass" className="block text-xs font-semibold text-[#EDE7DC] mb-1.5 text-left">
              Contraseña de Acceso (Demo)
            </label>
            <input
              id="admin-pass"
              type="password"
              name="password"
              placeholder="Ingresa la contraseña (defecto: elqui2026)"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#281D1A] border border-[#3D2B26] focus:border-[#D4AF37] text-[#FDFBF7] text-sm focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#1F1513] font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Ingresar al Panel</span>
          </button>
        </form>

        <p className="text-[11px] text-[#9A8F7F] mt-4">
          💡 Contraseña predeterminada de prueba: <code className="text-[#D4AF37] font-mono">elqui2026</code>
        </p>
      </div>
    </div>
  );
}
