'use client';

import React from 'react';
import { useAccessibility } from './AccessibilityContext';
import { Volume2, Square, Eye, Captions, ZoomIn, ZoomOut } from 'lucide-react';
import { SECTION_SUBTITLES } from '@/data/site';

export function AccessibilityBar() {
  const {
    textScale,
    increaseTextScale,
    decreaseTextScale,
    subtitlesEnabled,
    toggleSubtitles,
    highContrast,
    toggleHighContrast,
    isSpeaking,
    speakText,
    stopSpeech,
    activeSection,
  } = useAccessibility();

  const handleSpeechToggle = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      // Find summary text for active section or general introduction
      const sectionData = SECTION_SUBTITLES[activeSection] || SECTION_SUBTITLES['hero'];
      const textToRead = `${sectionData.title}. ${sectionData.bullets.join('. ')}. Experiencia gastronómica en el Valle del Elqui, Chile.`;
      speakText(textToRead);
    }
  };

  return (
    <aside
      aria-label="Barra de Accesibilidad e Inclusión Universal"
      className="sticky top-0 z-50 bg-[#160E0C]/95 backdrop-blur-md border-b border-[#3D2B26] text-[#EDE7DC] px-4 py-2 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
        {/* Left: Accessibility Label */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" aria-hidden="true" />
          <span className="font-semibold text-[#D4AF37] hidden sm:inline">Accesibilidad:</span>
          <span className="text-[#C5BCAC] text-xs">Ajustes de visualización y voz</span>
        </div>

        {/* Right: Controls Group */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Text Scaling A- / A+ */}
          <div className="flex items-center bg-[#281D1A] rounded-lg border border-[#3D2B26] p-0.5" role="group" aria-label="Escala de texto">
            <button
              type="button"
              onClick={decreaseTextScale}
              disabled={textScale === 'sm'}
              className="px-2 py-1 text-xs font-bold hover:text-[#D4AF37] disabled:opacity-40 disabled:hover:text-inherit rounded transition-colors flex items-center gap-1"
              aria-label="Disminuir tamaño de letra"
              title="Disminuir tamaño de letra"
            >
              <ZoomOut className="w-3.5 h-3.5" aria-hidden="true" />
              <span>A-</span>
            </button>
            <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#1F1513] text-[#D4AF37] rounded">
              {textScale.toUpperCase()}
            </span>
            <button
              type="button"
              onClick={increaseTextScale}
              disabled={textScale === 'xl'}
              className="px-2 py-1 text-xs font-bold hover:text-[#D4AF37] disabled:opacity-40 disabled:hover:text-inherit rounded transition-colors flex items-center gap-1"
              aria-label="Aumentar tamaño de letra"
              title="Aumentar tamaño de letra"
            >
              <span>A+</span>
              <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Web Speech API Read aloud */}
          <button
            type="button"
            onClick={handleSpeechToggle}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
              isSpeaking
                ? 'bg-[#C05A3E] text-white border-[#C05A3E] animate-pulse shadow-md'
                : 'bg-[#281D1A] text-[#EDE7DC] border-[#3D2B26] hover:border-[#D4AF37] hover:text-[#D4AF37]'
            }`}
            aria-live="polite"
            aria-pressed={isSpeaking}
            title={isSpeaking ? 'Detener lectura en voz alta' : 'Escuchar resumen de la sección en voz alta'}
          >
            {isSpeaking ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                <span>Detener Voz</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                <span>Escuchar</span>
              </>
            )}
          </button>

          {/* Subtitles for Deaf Persons (Visual summary toggle) */}
          <button
            type="button"
            onClick={toggleSubtitles}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
              subtitlesEnabled
                ? 'bg-[#D4AF37] text-[#1F1513] font-bold border-[#D4AF37] shadow-sm'
                : 'bg-[#281D1A] text-[#EDE7DC] border-[#3D2B26] hover:border-[#D4AF37] hover:text-[#D4AF37]'
            }`}
            aria-pressed={subtitlesEnabled}
            title="Mostrar u ocultar resúmenes visuales para personas con discapacidad auditiva"
          >
            <Captions className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Subtítulos Visuales (🤟)</span>
          </button>

          {/* High Contrast Toggle */}
          <button
            type="button"
            onClick={toggleHighContrast}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
              highContrast
                ? 'bg-yellow-400 text-black font-bold border-yellow-300'
                : 'bg-[#281D1A] text-[#EDE7DC] border-[#3D2B26] hover:border-[#D4AF37] hover:text-[#D4AF37]'
            }`}
            aria-pressed={highContrast}
            title="Alternar modo de alto contraste para baja visión"
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Alto Contraste</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
