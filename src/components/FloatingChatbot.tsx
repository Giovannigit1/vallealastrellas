'use client';

import React, { useState, useEffect } from 'react';
import { CHATBOT_FAQ, SITE_CONFIG } from '@/data/site';
import { WeatherData } from '@/types';
import { MessageSquare, X, Sparkles, CloudSun, Compass, ShieldCheck, MessageCircle } from 'lucide-react';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  isWeather?: boolean;
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: '¡Hola! Soy Chani, tu guía virtual del Valle del Elqui. ¿En qué te puedo orientar hoy?',
    },
  ]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);

  // Fetch weather when needed
  useEffect(() => {
    if (isOpen && !weather) {
      setLoadingWeather(true);
      fetch('/api/weather')
        .then((res) => res.json())
        .then((data: WeatherData) => {
          setWeather(data);
          setLoadingWeather(false);
        })
        .catch(() => {
          setLoadingWeather(false);
        });
    }
  }, [isOpen, weather]);

  const handleSelectOption = (item: (typeof CHATBOT_FAQ)[0]) => {
    // User message
    const userMsg: ChatMessage = { sender: 'user', text: item.label };

    // Bot response
    let botMsg: ChatMessage;
    if (item.id === 'tiempo-cielo') {
      const weatherText = weather
        ? `En este momento en Vicuña tenemos ${weather.temperature}°C (sensación ${weather.apparentTemperature}°C) con condición "${weather.skyCondition}" y viento de ${weather.windSpeed} km/h. La visibilidad estelar estimada es ${weather.isObservingRecommended ? 'EXCELENTE para telescopio' : 'buena'}. (Dato meteorológico referencial de Open-Meteo).`
        : `${item.answer} Las noches en el valle suelen ser cristalinas con más de 300 días despejados al año.`;
      botMsg = { sender: 'bot', text: weatherText, isWeather: true };
    } else {
      botMsg = { sender: 'bot', text: item.answer };
    }

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <>
      {/* Floating Trigger Button: Black with gold border */}
      <aside aria-label="Asistente virtual de consulta">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Cerrar asistente virtual Chani' : 'Abrir asistente virtual Chani'}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-[#1F1513] border-2 border-[#D4AF37] text-[#D4AF37] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="font-serif font-bold text-xs sm:text-sm tracking-wide text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors">
            Chani · Guía Elqui
          </span>
        </button>
      </aside>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Asistente virtual Chani"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] max-h-[520px] rounded-3xl bg-[#1F1513] border-2 border-[#D4AF37] shadow-2xl flex flex-col overflow-hidden animate-fade-in"
        >
          {/* Header */}
          <div className="p-4 bg-[#281D1A] border-b border-[#3D2B26] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1F1513] border border-[#D4AF37] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-[#FDFBF7]">
                  Chani · Guía del Valle
                </h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Respuestas inmediatas en vivo
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-[#C5BCAC] hover:text-[#D4AF37] hover:bg-[#1F1513] transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[300px] text-xs leading-relaxed"
            aria-live="polite"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-[#D4AF37] text-[#1F1513] font-medium rounded-br-none'
                      : 'bg-[#281D1A] border border-[#3D2B26] text-[#EDE7DC] rounded-bl-none'
                  }`}
                >
                  {msg.isWeather && (
                    <div className="flex items-center gap-1.5 text-[#D4AF37] font-bold mb-1">
                      <CloudSun className="w-3.5 h-3.5" />
                      <span>Condiciones Astronómicas en Vicuña:</span>
                    </div>
                  )}
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Menu Options (3 options) */}
          <div className="p-3 bg-[#18100E] border-t border-[#3D2B26] space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-[#9A8F7F] font-semibold block px-1">
              Consultas Rápidas Disponibles:
            </span>
            <div className="flex flex-col gap-1.5">
              {CHATBOT_FAQ.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectOption(item)}
                  className="w-full text-left px-3 py-2 rounded-xl bg-[#281D1A] hover:bg-[#3D2B26] border border-[#3D2B26] hover:border-[#D4AF37]/50 text-xs text-[#FDFBF7] transition-all flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <Compass className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                </button>
              ))}

              <a
                href={`https://wa.me/${SITE_CONFIG.demo.whatsappNumber}?text=Hola%20Valle%20a%20las%20Estrellas,%20tengo%20una%20consulta%20especial%20sobre%20la%20experiencia`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-3 py-2 mt-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Hablar por WhatsApp (+56 9 4044 3293)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
