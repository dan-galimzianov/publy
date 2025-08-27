'use client';

import { LucideIcon } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/shared/tailwind';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center px-6 py-12 text-center",
      className
    )}>
      {Icon && (
        <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <Icon size={24} className="text-gray-400" />
        </div>
      )}
      
      <h2 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h2>
      
      <p className="text-gray-600 text-sm mb-8 leading-relaxed max-w-sm">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-gray-900 hover:bg-gray-800 text-white border-0 rounded-lg h-12 px-6"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
