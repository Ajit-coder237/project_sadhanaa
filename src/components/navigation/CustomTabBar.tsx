import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Folder, Plus, Flag, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';

export const CustomTabBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setQuickAddVisible } = useAppStore();

  const tabs = [
    { id: 'today', icon: Calendar, label: 'Today', path: '/today' },
    { id: 'projects', icon: Folder, label: 'Projects', path: '/projects' },
    { id: 'fab', icon: Plus, label: '', path: '' }, // Placeholder for FAB
    { id: 'goals', icon: Flag, label: 'Goals', path: '/goals' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 pb-safe pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] backdrop-blur-lg dark:bg-[#1A1A2E]/80 dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      <div className="mx-auto flex max-w-md items-center justify-around px-4">
        {tabs.map((tab) => {
          if (tab.id === 'fab') {
            return (
              <motion.button
                key={tab.id}
                onClick={() => setQuickAddVisible(true)}
                whileTap={{ scale: 0.9 }}
                className="relative -top-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#00CEFF] text-white shadow-lg shadow-[#6C5CE7]/30 transition-shadow hover:shadow-xl hover:shadow-[#6C5CE7]/40 focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:ring-offset-2 dark:focus:ring-offset-[#1A1A2E]"
              >
                <Plus className="h-7 w-7" strokeWidth={2.5} />
              </motion.button>
            );
          }

          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;

          return (
            <motion.button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center justify-center gap-1 p-2"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  color: isActive ? '#6C5CE7' : '#A0A0B2',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              <motion.span
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 5,
                  height: isActive ? 'auto' : 0,
                }}
                className="text-[10px] font-medium text-[#6C5CE7]"
              >
                {tab.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
