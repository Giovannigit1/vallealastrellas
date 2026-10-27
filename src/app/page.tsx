import React from 'react';
import { AccessibilityProvider } from '@/components/AccessibilityContext';
import { AccessibilityBar } from '@/components/AccessibilityBar';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TimelineSection } from '@/components/TimelineSection';
import { ProductsSection } from '@/components/ProductsSection';
import { AboutSection } from '@/components/AboutSection';
import { TerritorySection } from '@/components/TerritorySection';
import { RestaurantsSection } from '@/components/RestaurantsSection';
import { ReservationSection } from '@/components/ReservationSection';
import { SubscriptionSection } from '@/components/SubscriptionSection';
import { TriviaSection } from '@/components/TriviaSection';
import { ContactSection } from '@/components/ContactSection';
import { FloatingChatbot } from '@/components/FloatingChatbot';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <AccessibilityProvider>
      <div className="flex flex-col min-h-screen">
        {/* Persistent, visible accessibility toolbar */}
        <AccessibilityBar />

        {/* Fixed Navigation header */}
        <Navbar />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
          {/* Hero Section */}
          <Hero />

          {/* 1. Timeline of 4 hours (17:00 to 21:00) */}
          <TimelineSection />

          {/* 2. Signature Products with Tasting Notes */}
          <ProductsSection />

          {/* 3. About Us & Heritage */}
          <AboutSection />

          {/* 4. Territorial Linkage */}
          <TerritorySection />

          {/* 5. Allied Culinary Spaces */}
          <RestaurantsSection />

          {/* 6. Live Reservations */}
          <ReservationSection />

          {/* 7. Community Subscription & Digital Recipe Book */}
          <SubscriptionSection />

          {/* 8. Accessible Trivia */}
          <TriviaSection />

          {/* 9. Contact & Map */}
          <ContactSection />
        </main>

        {/* Floating Chatbot Guide */}
        <FloatingChatbot />

        {/* Footer */}
        <Footer />
      </div>
    </AccessibilityProvider>
  );
}
