'use client';

import { LayoutPanelLeft, MessageSquare, Plus } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/shared/tailwind';

const navItems = [
  {
    icon: Plus,
    label: 'Создать',
    path: '/',
  },
  {
    icon: MessageSquare,
    label: 'Посты',
    path: '/posts',
  }
  // {
  //   icon: LayoutPanelLeft,
  //   label: 'Промпты',
  //   path: '/prompts',
  // },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="bg-white border-t border-gray-100 px-6 py-3">
      <div className="flex justify-center items-center gap-8 max-w-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                'flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 min-w-20',
                isActive
                  ? 'text-gray-900 bg-gray-50'
                  : 'text-gray-400 hover:text-gray-700'
              )}
            >
              <Icon size={20} strokeWidth={2} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}