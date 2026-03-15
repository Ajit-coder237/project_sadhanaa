import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Check, Calendar } from 'lucide-react';

interface SwipeableRowProps {
  children: React.ReactNode;
  onComplete?: () => void;
  onReschedule?: () => void;
}

export const SwipeableRow: React.FC<SwipeableRowProps> = ({ children, onComplete, onReschedule }) => {
  const x = useMotionValue(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Background colors based on drag direction
  const background = useTransform(
    x,
    [-100, 0, 100],
    ['#00CEFF', '#F8F9FE', '#00B894'] // Blue for left (reschedule), Green for right (complete)
  );

  const opacity = useTransform(x, [-50, 0, 50], [1, 0, 1]);
  const scale = useTransform(x, [-100, -50, 0, 50, 100], [1.2, 0.5, 0, 0.5, 1.2]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 80 && onComplete) {
      // Swipe right to complete
      setIsCompleted(true);
      animate(x, window.innerWidth, { duration: 0.3 }).then(() => {
        onComplete();
      });
    } else if (info.offset.x < -80 && onReschedule) {
      // Swipe left to reschedule
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
      onReschedule();
    } else {
      // Snap back
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
    }
  };

  if (isCompleted) {
    return null; // Or animate height to 0
  }

  return (
    <div className="relative overflow-hidden rounded-2xl mb-3">
      <motion.div
        className="absolute inset-0 flex items-center justify-between px-6"
        style={{ background }}
      >
        <motion.div style={{ opacity: x.get() > 0 ? opacity : 0, scale: x.get() > 0 ? scale : 0 }} className="text-white">
          <Check className="h-6 w-6" strokeWidth={3} />
        </motion.div>
        <motion.div style={{ opacity: x.get() < 0 ? opacity : 0, scale: x.get() < 0 ? scale : 0 }} className="text-white">
          <Calendar className="h-6 w-6" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="relative z-10 bg-white dark:bg-[#1A1A2E]"
      >
        {children}
      </motion.div>
    </div>
  );
};
