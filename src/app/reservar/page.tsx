import React from 'react';
import type { Metadata } from 'next';
import { AccessibilityProvider } from '@/components/AccessibilityContext';
import { AccessibilityBar } from '@/components/AccessibilityBar';
import { Navbar } from '@/components/Navbar';
import { ReservationSection } from '@/components/ReservationSection';
import { FloatingChatbot } from '@/components/FloatingChatbot';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Reservar Experiencia Gastronómica',
  description: 'Reserva tu lugar en la experiencia diaria de 17:00 a 21:00 hrs en el Valle del Elqui. Máximo 12 comensales por día.',
};

export default function ReservarPage() {
  return (
    <AccessibilityProvider>
      <div className="flex flex-col min-h-screen">
        <AccessibilityBar />
        <Navbar />
        <main id="main-content" className="flex-1 pt-8 pb-16">
          <ReservationSection />
        </main>
        <FloatingChatbot />
        <Footer />
      </div>
    </AccessibilityProvider>
  );
}
