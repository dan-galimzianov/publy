'use client';

import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/shared/tailwind';
import type { PostFormatPrompt } from '@/shared/api/endpoints/generation';

interface FormatSelectorProps {
  formats: PostFormatPrompt[];
  selectedFormat?: PostFormatPrompt;
  onSelect: (format: PostFormatPrompt) => void;
  className?: string;
}

export function FormatSelector({
  formats,
  selectedFormat,
  onSelect,
  className,
}: FormatSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (format: PostFormatPrompt) => {
    onSelect(format);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left flex items-center justify-between"
      >
        <div>
          <div className="font-medium text-gray-900">
            {selectedFormat ? selectedFormat.name : 'Выберите формат поста'}
          </div>
          {selectedFormat && (
            <div className="text-sm text-gray-600 mt-1 line-clamp-2">
              {selectedFormat.text}
            </div>
          )}
        </div>
        <ChevronDown 
          size={20} 
          className={cn(
            "text-gray-400 transition-transform",
            isOpen && "transform rotate-180"
          )} 
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
            {formats.map((format) => (
              <button
                key={format.id}
                onClick={() => handleSelect(format)}
                className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {format.name}
                  </div>
                  <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {format.text}
                  </div>
                </div>
                {selectedFormat?.id === format.id && (
                  <Check size={16} className="text-green-600 mt-1 ml-2 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
