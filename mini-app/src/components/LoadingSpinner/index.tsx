'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner = ({ 
  size = 'md', 
  className = '' 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-500 animate-spin"></div>
      <div 
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-300 animate-spin" 
        style={{ animationDirection: 'reverse', animationDuration: '2s' }}
      ></div>
    </div>
  );
};
