'use client';

import { useEffect, useState } from 'react';
import { Mic } from 'lucide-react';

interface VoiceWaveAnimationProps {
  isRecording: boolean;
  isStopping?: boolean;
  size?: number;
}

export const VoiceWaveAnimation = ({ 
  isRecording, 
  isStopping = false,
  size = 120 
}: VoiceWaveAnimationProps) => {
  const [waveHeights, setWaveHeights] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording && !isStopping) {
      // Немедленно устанавливаем начальные высоты
      setWaveHeights(Array.from({ length: 5 }, () => Math.random() * 40 + 10));
      
      // Запускаем интервал для обновления анимации
      interval = setInterval(() => {
        const newHeights = Array.from({ length: 5 }, () => 
          Math.random() * 40 + 10
        );
        setWaveHeights(newHeights);
      }, 150);
    } else if (isStopping || (!isRecording && waveHeights.length > 0)) {
      // Плавно уменьшаем высоты волн перед полной остановкой
      const fadeOutInterval = setInterval(() => {
        setWaveHeights(prev => {
          const newHeights = prev.map(height => Math.max(0, height - 5));
          const allZero = newHeights.every(h => h === 0);
          
          if (allZero) {
            clearInterval(fadeOutInterval);
            setWaveHeights([]);
            return [];
          }
          
          return newHeights;
        });
      }, 50);
      
      // Очищаем через максимум 1 секунду
      setTimeout(() => {
        clearInterval(fadeOutInterval);
        setWaveHeights([]);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isStopping, waveHeights.length]);

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Основной круг с микрофоном */}
      <div 
        className={`
          relative z-10 rounded-full flex items-center justify-center transition-all duration-300
          ${isRecording 
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }
        `}
        style={{ width: size * 0.5, height: size * 0.5 }}
      >
        <Mic className="w-6 h-6" />
      </div>

      {/* Анимированные волны */}
      {isRecording && (
        <>
          {/* Пульсирующие круги */}
          <div className="absolute inset-0">
            {[1, 2, 3].map((ring, index) => (
              <div
                key={ring}
                className={`
                  absolute inset-0 rounded-full border-2 border-red-400/30
                  animate-ping
                `}
                style={{
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>

          {/* Анимированные волны */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-end space-x-1">
              {waveHeights.map((height, index) => (
                <div
                  key={index}
                  className="bg-red-400/60 rounded-full transition-all duration-150 ease-out"
                  style={{
                    width: '3px',
                    height: `${height}px`,
                    transform: `translateY(${(40 - height) / 2}px)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Дополнительные волны по кругу */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }).map((_, index) => {
              const angle = (index * 45) * (Math.PI / 180);
              const radius = size * 0.35;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div
                  key={index}
                  className="absolute w-1 bg-red-400/40 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 20 + 10}px`,
                    left: '50%',
                    top: '50%',
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: '1s',
                  }}
                />
              );
            })}
          </div>
        </>
      )}

      {/* Градиентный фон при записи */}
      {isRecording && (
        <div 
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, rgba(239, 68, 68, 0.1) 50%, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
};
