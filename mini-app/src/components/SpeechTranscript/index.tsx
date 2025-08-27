'use client';

import { useState, useEffect } from 'react';

interface SpeechTranscriptProps {
  transcript: string;
  interimTranscript: string;
  isRecording: boolean;
  isProcessing?: boolean;
}

export const SpeechTranscript = ({ 
  transcript, 
  interimTranscript, 
  isRecording,
  isProcessing = false
}: SpeechTranscriptProps) => {
  const [showInterim, setShowInterim] = useState(false);

  useEffect(() => {
    if (isRecording && interimTranscript) {
      setShowInterim(true);
    } else if (!isRecording && !isProcessing) {
      // Плавно скрываем промежуточный текст только если не обрабатываем
      const timer = setTimeout(() => setShowInterim(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isRecording, isProcessing, interimTranscript]);

  if (!isRecording && !isProcessing && !transcript && !interimTranscript && !showInterim) return null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Финальный текст */}
      {transcript && (
        <div className="mb-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-gray-800 leading-relaxed">
              {transcript}
            </p>
          </div>
        </div>
      )}

      {/* Промежуточный текст с анимацией */}
      {(isRecording || isProcessing || showInterim) && (
        <div className="relative">
          {interimTranscript ? (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 rounded-xl p-4 shadow-sm animate-in fade-in duration-300">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((dot) => (
                      <div
                        key={dot}
                        className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${dot * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic flex-1">
                  {interimTranscript}
                  <span className="inline-block w-0.5 h-5 bg-red-400 ml-1 animate-pulse" />
                </p>
              </div>
            </div>
          ) : (isRecording || isProcessing) ? (
            <div className="bg-gray-50 border border-gray-200/50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-center space-x-2 text-gray-500">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${dot * 0.1}s` }}
                    />
                  ))}
                </div>
                <span className="text-sm">{isProcessing ? "Обрабатываю..." : "Слушаю..."}</span>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
