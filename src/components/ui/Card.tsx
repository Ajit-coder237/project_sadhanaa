import React from 'react';
import { cn } from './Button';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, onPress, ...props }, ref) => {
    const Component = onPress ? motion.button : motion.div;
    
    return (
      <Component
        ref={ref as any}
        onClick={onPress}
        whileTap={onPress ? { scale: 0.98 } : undefined}
        className={cn(
          'rounded-2xl bg-white dark:bg-[#252542] shadow-sm border border-[#E8E8F0] dark:border-[#2D2D4A] p-4 transition-colors',
          onPress && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2A2A4A] active:bg-gray-100 dark:active:bg-[#1A1A2E]',
          className
        )}
        {...props as any}
      >
        {children}
      </Component>
    );
  }
);
Card.displayName = 'Card';
