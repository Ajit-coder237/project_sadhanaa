import React from 'react';
import { motion } from 'framer-motion';
import { cn } from './Button';

interface AnimatedCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  color?: string;
}

export const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  checked,
  onChange,
  className,
  color = '#00B894', // Success color
}) => {
  return (
    <motion.button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      whileTap={{ scale: 0.8 }}
      className={cn(
        'relative flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors duration-200',
        checked ? 'border-transparent' : 'border-gray-300 dark:border-gray-600',
        className
      )}
      style={{ backgroundColor: checked ? color : 'transparent' }}
    >
      <motion.svg
        initial={false}
        animate={checked ? 'checked' : 'unchecked'}
        className="h-4 w-4 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M20 6L9 17l-5-5"
          variants={{
            checked: { pathLength: 1, opacity: 1 },
            unchecked: { pathLength: 0, opacity: 0 },
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </motion.svg>
    </motion.button>
  );
};
