import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from './Button';

interface FABProps {
  onClick: () => void;
  isOpen?: boolean;
  className?: string;
}

export const FAB: React.FC<FABProps> = ({ onClick, isOpen, className }) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: isOpen ? 0 : [0, -3, 0],
        rotate: isOpen ? 45 : 0,
      }}
      transition={{
        y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
        rotate: { type: 'spring', stiffness: 200, damping: 15 },
      }}
      className={cn(
        'absolute -top-6 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#00CEFF] text-white shadow-lg shadow-[#6C5CE7]/30 transition-shadow hover:shadow-xl hover:shadow-[#6C5CE7]/40 focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:ring-offset-2 dark:focus:ring-offset-[#1A1A2E]',
        className
      )}
    >
      <Plus className="h-7 w-7" strokeWidth={2.5} />
    </motion.button>
  );
};
