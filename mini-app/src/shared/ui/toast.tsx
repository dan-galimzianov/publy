'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/shared/tailwind';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const toastStyles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

export function Toast({
  type,
  title,
  description,
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = toastIcons[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={cn(
      'fixed top-4 right-4 max-w-sm w-full p-4 border rounded-lg shadow-lg z-50 transition-all',
      toastStyles[type]
    )}>
      <div className="flex items-start">
        <Icon size={20} className="flex-shrink-0 mt-0.5 mr-3" />
        <div className="flex-1">
          <h4 className="font-medium text-sm">{title}</h4>
          {description && (
            <p className="text-sm mt-1 opacity-90">{description}</p>
          )}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="flex-shrink-0 ml-2 p-1 hover:opacity-70 transition-opacity"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

// Hook для управления toast'ами
export function useToast() {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const addToast = (toast: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = {
      ...toast,
      id,
      onClose: () => removeToast(id),
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const toast = {
    success: (title: string, description?: string) => 
      addToast({ type: 'success', title, description }),
    error: (title: string, description?: string) => 
      addToast({ type: 'error', title, description }),
    info: (title: string, description?: string) => 
      addToast({ type: 'info', title, description }),
  };

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toastProps => (
        <Toast key={toastProps.id} {...toastProps} />
      ))}
    </div>
  );

  return { toast, ToastContainer };
}
