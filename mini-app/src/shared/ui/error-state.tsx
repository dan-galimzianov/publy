'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/shared/tailwind';

interface ErrorStateProps {
  title?: string;
  description?: string;
  showRetryButton?: boolean;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Что-то пошло не так',
  description = 'Произошла ошибка. Попробуйте перезагрузить страницу.',
  showRetryButton = true,
  onRetry,
  className,
}: ErrorStateProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center px-6 py-12 text-center",
      className
    )}>
      <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
        <AlertCircle size={24} className="text-red-500" />
      </div>
      
      <h2 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h2>
      
      <p className="text-gray-600 text-sm mb-8 leading-relaxed max-w-sm">
        {description}
      </p>
      
      {showRetryButton && (
        <Button
          onClick={handleRetry}
          className="bg-gray-900 hover:bg-gray-800 text-white border-0 rounded-lg h-12 px-6"
        >
          <RefreshCw size={16} className="mr-2" />
          Попробовать снова
        </Button>
      )}
    </div>
  );
}
