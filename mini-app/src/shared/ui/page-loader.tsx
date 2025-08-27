import { Loader2 } from "lucide-react";
import { cn } from '@/shared/tailwind';

type PageLoaderProps = {
  fullScreen?: boolean;
};

export const PageLoader = ({ fullScreen }: PageLoaderProps) => {
  return (
    <div className={cn(
      "flex items-center justify-center w-full h-full",
      fullScreen && "min-h-screen min-w-screen"
    )}>
      <Loader2 size={24} className="animate-spin text-gray-400" />
    </div>
  );
};