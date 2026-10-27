'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TRIVIA_QUESTIONS } from '@/data/site';
import { VisualSubtitleBadge } from './VisualSubtitleBadge';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';

export function TriviaSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const currentQuestion = TRIVIA_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    const isCorrect = idx === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setAnnouncement(`¡Correcto! ${currentQuestion.explanation}`);
      try {
        confetti({
          particleCount: 30,
          spread: 45,
          origin: { y: 0.8 },
          colors: ['#D4AF37', '#F3E5AB'],
        });
      } catch {}
    } else {
      const correctText = currentQuestion.options[currentQuestion.correctIndex];
      setAnnouncement(`Incorrecto. La respuesta correcta era: ${correctText}. ${currentQuestion.explanation}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < TRIVIA_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
      setAnnouncement('');
    } else {
      setCompleted(true);
      setAnnouncement(`Has completado la trivia con un puntaje de ${score + (selectedOption === currentQuestion.correctIndex ? 1 : 0)} de ${TRIVIA_QUESTIONS.length}.`);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setCompleted(false);
    setAnnouncement('Trivia reiniciada.');
  };

  return (
    <section
      id="trivia"
      className="py-24 bg-[#1F1513] relative"
      aria-labelledby="trivia-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Screen Reader live status announcement */}
        <div aria-live="polite" className="sr-only">
          {announcement}
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Desafío Interactivo y Accesible</span>
          </div>
          <h2
            id="trivia-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7] mb-4"
          >
            Trivia del Valle del Elqui
          </h2>
          <p className="text-sm text-[#EDE7DC]">
            Pon a prueba tu conocimiento sobre astronomía, frutos nativos, pisco de altura y cosmovisión diaguita.
          </p>

          <VisualSubtitleBadge sectionKey="trivia" />
        </div>

        {/* Card Container */}
        <div className="rounded-3xl bg-[#281D1A] border border-[#3D2B26] p-6 sm:p-10 shadow-2xl relative">
          {completed ? (
            /* Completed Screen */
            <div className="text-center py-6 animate-fade-in" role="region" aria-label="Resultado final de la trivia">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-[#D4AF37]" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FDFBF7] mb-2">
                ¡Trivia Completada!
              </h3>
              <p className="text-sm text-[#EDE7DC] mb-6">
                Obtuviste{' '}
                <strong className="text-2xl text-[#D4AF37] font-serif font-bold">
                  {score}
                </strong>{' '}
                de {TRIVIA_QUESTIONS.length} respuestas correctas.
              </p>

              <div className="p-4 rounded-xl bg-[#1F1513] border border-[#3D2B26] max-w-md mx-auto mb-8">
                <p className="text-xs text-[#C5BCAC] mb-1">Tu regalo por participar:</p>
                <p className="text-sm font-semibold text-[#D4AF37]">
                  Usa el cupón <code className="font-mono bg-[#281D1A] px-2 py-0.5 rounded border border-[#D4AF37]/40">VALLE15</code> en tu reserva para 15% de descuento.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#reservas"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-[#1F1513] font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all text-center"
                >
                  Ir a Reservar con mi Descuento
                </a>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-6 py-3 rounded-xl bg-[#3D2B26] hover:bg-[#4D3730] text-[#EDE7DC] font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Jugar Nuevamente</span>
                </button>
              </div>
            </div>
          ) : (
            /* Active Question Screen */
            <div>
              {/* Question progress and category */}
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#3D2B26]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1F1513] border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs font-bold">
                    Pregunta {currentIndex + 1} de {TRIVIA_QUESTIONS.length}
                  </span>
                  <span className="text-xs text-[#C5BCAC] hidden sm:inline">
                    · {currentQuestion.category}
                  </span>
                </div>
                <div className="text-xs text-[#EDE7DC] font-mono">
                  Puntaje: <strong className="text-[#D4AF37]">{score}</strong>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#1F1513] h-2 rounded-full overflow-hidden mb-6" aria-hidden="true">
                <div
                  className="bg-gradient-to-r from-[#D4AF37] to-[#C05A3E] h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / TRIVIA_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFBF7] mb-6 leading-snug">
                {currentQuestion.question}
              </h3>

              {/* Options Grid */}
              <div
                role="radiogroup"
                aria-label={`Opciones para la pregunta ${currentIndex + 1}`}
                className="space-y-3 mb-6"
              >
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;

                  let optionStyles = 'bg-[#1F1513] border-[#3D2B26] text-[#EDE7DC] hover:border-[#D4AF37]/60';
                  if (hasAnswered) {
                    if (isCorrect) {
                      optionStyles = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optionStyles = 'bg-red-950/60 border-red-500 text-red-200';
                    } else {
                      optionStyles = 'bg-[#1F1513]/40 border-[#3D2B26]/40 text-[#9A8F7F] opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyles = 'bg-[#1F1513] border-[#D4AF37] text-[#D4AF37]';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optionStyles}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#281D1A] border border-[#3D2B26] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {hasAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Pedagogical Explanation Box */}
              {hasAnswered && (
                <div
                  role="region"
                  aria-label="Explicación pedagógica"
                  className="p-4 rounded-xl bg-[#1F1513] border-l-4 border-[#D4AF37] text-xs sm:text-sm text-[#EDE7DC] leading-relaxed mb-6 animate-fade-in"
                >
                  <p className="font-bold text-[#D4AF37] mb-1">
                    {selectedOption === currentQuestion.correctIndex ? '¡Excelente deducción!' : 'Sabías que...'}
                  </p>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Next Button */}
              {hasAnswered && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#1F1513] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <span>
                      {currentIndex === TRIVIA_QUESTIONS.length - 1 ? 'Ver Resultado Final' : 'Siguiente Pregunta'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
