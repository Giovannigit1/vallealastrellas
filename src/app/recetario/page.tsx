'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AccessibilityProvider } from '@/components/AccessibilityContext';
import { AccessibilityBar } from '@/components/AccessibilityBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RECIPES_DATA } from '@/data/site';
import { BookOpen, Printer, Clock, Users, ChefHat, Sparkles, Wine, ArrowLeft } from 'lucide-react';

export default function RecetarioPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AccessibilityProvider>
      <div className="flex flex-col min-h-screen bg-[#1F1513]">
        <div className="print:hidden">
          <AccessibilityBar />
          <Navbar />
        </div>

        <main id="main-content" className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
          {/* Back button and Print Action */}
          <div className="print:hidden flex items-center justify-between gap-4 mb-8">
            <Link
              href="/"
              className="text-xs sm:text-sm text-[#C5BCAC] hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la experiencia principal</span>
            </Link>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#281D1A] hover:bg-[#3D2B26] border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              title="Descargar o imprimir recetario en PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Descargar / Imprimir PDF</span>
            </button>
          </div>

          {/* Book Title Banner */}
          <header className="text-center mb-16 pb-10 border-b border-[#3D2B26]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Recetario Digital de Sabores del Valle</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7] mb-4">
              Tres Secretos Culinarios del Elqui
            </h1>
            <p className="text-sm sm:text-base text-[#EDE7DC] max-w-2xl mx-auto leading-relaxed">
              Preparaciones emblemáticas nacidas en las cocinas de campo de Paihuano, Montegrande y Vicuña. Diseñadas para recrear la calidez del valle en tu propia mesa.
            </p>
          </header>

          {/* Recipes List */}
          <div className="space-y-16">
            {RECIPES_DATA.map((recipe, index) => (
              <article
                key={recipe.id}
                className="rounded-3xl bg-[#281D1A] border border-[#3D2B26] overflow-hidden shadow-2xl print:bg-white print:text-black print:border-gray-300 print:shadow-none"
              >
                {/* Image and Header */}
                <div className="relative h-72 sm:h-96 w-full bg-[#1F1513] print:h-48">
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#281D1A] via-transparent to-black/30 print:hidden"
                  />
                  <span className="absolute top-6 left-6 px-3 py-1 rounded-lg bg-[#1F1513]/90 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs font-bold">
                    Receta #{index + 1} · {recipe.heroProduct}
                  </span>
                </div>

                <div className="p-6 sm:p-10">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FDFBF7] print:text-black mb-1">
                    {recipe.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D4AF37] font-medium mb-4">
                    {recipe.subtitle}
                  </p>
                  <p className="text-sm text-[#EDE7DC] print:text-gray-800 leading-relaxed mb-6">
                    {recipe.description}
                  </p>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-[#1F1513] border border-[#3D2B26] print:border-gray-200 mb-8 text-xs text-[#EDE7DC] print:text-black">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      <strong>Tiempo:</strong> {recipe.prepTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#D4AF37]" />
                      <strong>Porciones:</strong> {recipe.servings}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ChefHat className="w-4 h-4 text-[#D4AF37]" />
                      <strong>Dificultad:</strong> {recipe.difficulty}
                    </span>
                  </div>

                  {/* 2-column layout: Ingredients and Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Ingredients */}
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#FDFBF7] print:text-black mb-3 pb-2 border-b border-[#3D2B26] print:border-gray-300">
                        Ingredientes
                      </h3>
                      <ul className="space-y-2 text-xs sm:text-sm text-[#EDE7DC] print:text-gray-800">
                        {recipe.ingredients.map((ing, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Preparation Steps */}
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#FDFBF7] print:text-black mb-3 pb-2 border-b border-[#3D2B26] print:border-gray-300">
                        Paso a Paso
                      </h3>
                      <ol className="space-y-3 text-xs sm:text-sm text-[#EDE7DC] print:text-gray-800">
                        {recipe.steps.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#1F1513] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                              {sIdx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Notes & Pairing */}
                  <div className="p-4 rounded-xl bg-[#1F1513] border-l-4 border-[#D4AF37] space-y-2 text-xs text-[#EDE7DC] print:text-gray-800">
                    <p className="flex items-start gap-2">
                      <Wine className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#FDFBF7] print:text-black">Maridaje sugerido:</strong> {recipe.pairing}
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#FDFBF7] print:text-black">Secreto del Chef:</strong> {recipe.chefNote}
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        <div className="print:hidden">
          <Footer />
        </div>
      </div>
    </AccessibilityProvider>
  );
}
