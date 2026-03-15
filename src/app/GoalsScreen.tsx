import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { useGoals, useHabits, logHabit, useHabitLogs } from '../hooks/useData';
import { CircularProgress } from '../components/ui/CircularProgress';
import { Plus, Target, Activity, CheckCircle2, Circle } from 'lucide-react';
import { format, subDays, isSameDay } from 'date-fns';
import confetti from 'canvas-confetti';

export const GoalsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'goals' | 'habits'>('goals');
  const goals = useGoals();
  const habits = useHabits();
  const today = new Date().toISOString().split('T')[0];

  const handleLogHabit = async (habitId: number) => {
    await logHabit(habitId, today, 1);
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#00B894', '#00CEFF']
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] pb-24 dark:bg-[#0D0D1A]">
      <Header title="Goals & Habits" />
      
      <div className="mx-auto max-w-md p-4">
        <div className="mb-6 flex rounded-xl bg-gray-100 p-1 dark:bg-[#252542]">
          <button
            onClick={() => setActiveTab('goals')}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${activeTab === 'goals' ? 'bg-white text-[#1A1A2E] shadow-sm dark:bg-[#1A1A2E] dark:text-[#F8F9FE]' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Goals
          </button>
          <button
            onClick={() => setActiveTab('habits')}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${activeTab === 'habits' ? 'bg-white text-[#1A1A2E] shadow-sm dark:bg-[#1A1A2E] dark:text-[#F8F9FE]' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Habits
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'goals' ? (
            <motion.div
              key="goals"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {goals?.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm dark:bg-[#252542]"
                >
                  <div className="absolute bottom-0 left-0 top-0 w-1.5" style={{ backgroundColor: goal.color }} />
                  
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pl-2">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-[#1A1A2E] dark:text-gray-300">
                          {goal.category}
                        </span>
                        {goal.status === 'completed' && (
                          <span className="rounded-full bg-[#00B894]/10 px-2 py-0.5 text-xs font-medium text-[#00B894]">
                            Completed
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-[#1A1A2E] dark:text-[#F8F9FE]">{goal.title}</h3>
                      {goal.targetDate && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-[#A0A0B2]">
                          Target: {format(new Date(goal.targetDate), 'MMM d, yyyy')}
                        </p>
                      )}
                      {goal.milestones && goal.milestones.length > 0 && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          {goal.milestones.filter(m => m.done).length} of {goal.milestones.length} milestones
                        </p>
                      )}
                    </div>
                    
                    <CircularProgress progress={goal.progress} size={50} strokeWidth={5} color={goal.color}>
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{goal.progress}%</span>
                    </CircularProgress>
                  </div>
                </motion.div>
              ))}
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-transparent p-4 text-gray-500 transition-colors hover:border-[#6C5CE7] hover:bg-[#6C5CE7]/5 hover:text-[#6C5CE7] dark:border-[#2D2D4A] dark:text-gray-400 dark:hover:border-[#6C5CE7] dark:hover:bg-[#6C5CE7]/10"
              >
                <Plus className="h-5 w-5" />
                <span className="font-medium">Add Goal</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="habits"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {habits?.map((habit, index) => (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl bg-white p-4 shadow-sm dark:bg-[#252542]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-2xl dark:bg-[#1A1A2E]">
                        {habit.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1A1A2E] dark:text-[#F8F9FE]">{habit.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-[#A0A0B2]">
                          <span className="text-orange-500">🔥</span>
                          <span>{habit.streak} day streak</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleLogHabit(habit.id!)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-[#00B894] dark:bg-[#1A1A2E] dark:hover:bg-[#2D2D4A]"
                    >
                      <CheckCircle2 className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    {[6, 5, 4, 3, 2, 1, 0].map(daysAgo => {
                      const date = format(subDays(new Date(), daysAgo), 'yyyy-MM-dd');
                      const isToday = daysAgo === 0;
                      // In a real app, we'd query habitLogs for each date. For UI demo:
                      const isDone = false; 
                      
                      return (
                        <div key={daysAgo} className="flex flex-col items-center gap-1">
                          <span className={`text-[10px] ${isToday ? 'font-bold text-[#1A1A2E] dark:text-white' : 'text-gray-400'}`}>
                            {format(subDays(new Date(), daysAgo), 'EEEEE')}
                          </span>
                          <div
                            className={`h-6 w-6 rounded-full border-2 ${isDone ? 'border-transparent' : 'border-gray-200 dark:border-gray-600'} ${isToday && !isDone ? 'border-dashed border-[#6C5CE7]' : ''}`}
                            style={{ backgroundColor: isDone ? habit.color : 'transparent' }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-transparent p-4 text-gray-500 transition-colors hover:border-[#6C5CE7] hover:bg-[#6C5CE7]/5 hover:text-[#6C5CE7] dark:border-[#2D2D4A] dark:text-gray-400 dark:hover:border-[#6C5CE7] dark:hover:bg-[#6C5CE7]/10"
              >
                <Plus className="h-5 w-5" />
                <span className="font-medium">Add Habit</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
