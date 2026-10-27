'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type TextScale = 'sm' | 'md' | 'lg' | 'xl';

interface AccessibilityContextType {
  textScale: TextScale;
  setTextScale: (scale: TextScale) => void;
  increaseTextScale: () => void;
  decreaseTextScale: () => void;
  subtitlesEnabled: boolean;
  toggleSubtitles: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  isSpeaking: boolean;
  speakText: (text: string) => void;
  stopSpeech: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [textScale, setTextScaleState] = useState<TextScale>('md');
  const [subtitlesEnabled, setSubtitlesEnabled] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');

  // Load stored preferences on mount
  useEffect(() => {
    try {
      const storedScale = localStorage.getItem('valle_text_scale') as TextScale | null;
      if (storedScale && ['sm', 'md', 'lg', 'xl'].includes(storedScale)) {
        setTextScaleState(storedScale);
        applyTextScaleClass(storedScale);
      } else {
        applyTextScaleClass('md');
      }

      const storedSubs = localStorage.getItem('valle_subtitles');
      if (storedSubs === 'true') {
        setSubtitlesEnabled(true);
      }

      const storedContrast = localStorage.getItem('valle_contrast');
      if (storedContrast === 'true') {
        setHighContrast(true);
        document.documentElement.classList.add('high-contrast');
      }
    } catch (e) {
      console.warn('LocalStorage unavailable:', e);
    }
  }, []);

  const applyTextScaleClass = (scale: TextScale) => {
    const root = document.documentElement;
    root.classList.remove('text-scale-sm', 'text-scale-md', 'text-scale-lg', 'text-scale-xl');
    root.classList.add(`text-scale-${scale}`);
  };

  const setTextScale = (scale: TextScale) => {
    setTextScaleState(scale);
    applyTextScaleClass(scale);
    try {
      localStorage.setItem('valle_text_scale', scale);
    } catch {}
  };

  const increaseTextScale = () => {
    const scales: TextScale[] = ['sm', 'md', 'lg', 'xl'];
    const currentIndex = scales.indexOf(textScale);
    if (currentIndex < scales.length - 1) {
      setTextScale(scales[currentIndex + 1]);
    }
  };

  const decreaseTextScale = () => {
    const scales: TextScale[] = ['sm', 'md', 'lg', 'xl'];
    const currentIndex = scales.indexOf(textScale);
    if (currentIndex > 0) {
      setTextScale(scales[currentIndex - 1]);
    }
  };

  const toggleSubtitles = () => {
    setSubtitlesEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('valle_subtitles', String(next));
      } catch {}
      return next;
    });
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
      try {
        localStorage.setItem('valle_contrast', String(next));
      } catch {}
      return next;
    });
  };

  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speakText = useCallback(
    (text: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        alert('La síntesis de voz no está soportada en tu navegador.');
        return;
      }

      window.speechSynthesis.cancel();
      setIsSpeaking(true);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95; // Slightly slower for clarity
      utterance.pitch = 1.0;

      // Select Chilean or Spanish voice if available
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice =
        voices.find((v) => v.lang.toLowerCase().includes('es-cl')) ||
        voices.find((v) => v.lang.toLowerCase().startsWith('es'));

      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    []
  );

  return (
    <AccessibilityContext.Provider
      value={{
        textScale,
        setTextScale,
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
        setActiveSection,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
