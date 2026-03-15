import React from 'react';
import { cn } from './Button';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = '#6C5CE7', className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        className
      )}
      style={{
        backgroundColor: `${color}20`, // 20% opacity
        color: color,
      }}
    >
      {children}
    </span>
  );
};

interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({ children, selected, onClick, icon, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
        selected
          ? 'bg-[#6C5CE7] text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-[#2D2D4A] dark:text-gray-300 dark:hover:bg-[#3A3A5A]',
        className
      )}
    >
      {icon && <span className={cn('h-4 w-4', selected ? 'text-white' : 'text-gray-500 dark:text-gray-400')}>{icon}</span>}
      {children}
    </button>
  );
};
