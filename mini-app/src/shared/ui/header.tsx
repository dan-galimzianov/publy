'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/tailwind';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  className?: string;
}

export function Header({
  title,
  showBackButton = false,
  onBackClick,
  className,
}: HeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <div className={cn(
      "sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <button
              onClick={handleBackClick}
              className="p-2 -ml-2 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className={cn(
            "text-lg font-medium text-gray-900",
            showBackButton && "ml-2"
          )}>
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
