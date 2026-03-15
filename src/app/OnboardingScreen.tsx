import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { Button } from '../components/ui/Button';

const slides = [
  {
    icon: '📋',
    title: 'Organize Everything',
    subtitle: 'Capture tasks, set priorities, and never miss a deadline',
  },
  {
    icon: '🎯',
    title: 'Achieve Your Goals',
    subtitle: 'Set goals, track milestones, and watch your progress grow',
  },
  {
    icon: '⚡',
    title: 'Build Great Habits',
    subtitle: 'Create daily habits, maintain streaks, and transform your life',
  },
];

export const OnboardingScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { setHasCompletedOnboarding } = useAppStore();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setHasCompletedOnboarding(true);
      navigate('/today');
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-between bg-gradient-to-br from-[#F8F9FE] to-[#E8E8F0] p-6 dark:from-[#0D0D1A] dark:to-[#1A1A2E]">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-white text-6xl shadow-xl dark:bg-[#252542]">
              {slides[currentSlide].icon}
            </div>
            <h1 className="mb-4 text-3xl font-bold text-[#1A1A2E] dark:text-[#F8F9FE]">
              {slides[currentSlide].title}
            </h1>
            <p className="max-w-xs text-lg text-gray-600 dark:text-[#A0A0B2]">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-sm pb-safe">
        <div className="mb-8 flex justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-8 bg-[#6C5CE7]' : 'w-2 bg-gray-300 dark:bg-gray-600'}`}
            />
          ))}
        </div>
        <Button onClick={handleNext} size="lg" className="w-full">
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
