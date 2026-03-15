import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOverdueTasks } from '../../hooks/useData';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, showSearch = true, showNotifications = true }) => {
  const navigate = useNavigate();
  const overdueTasks = useOverdueTasks();
  const overdueCount = overdueTasks?.length || 0;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white/80 px-4 py-3 pb-4 pt-safe shadow-sm backdrop-blur-lg dark:bg-[#1A1A2E]/80 dark:shadow-[#2D2D4A]/50">
      <div className="flex flex-col">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold tracking-tight text-[#1A1A2E] dark:text-[#F8F9FE]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm font-medium text-gray-500 dark:text-[#A0A0B2]"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {showSearch && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/search')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-[#252542] dark:text-gray-300 dark:hover:bg-[#2D2D4A]"
          >
            <Search className="h-5 w-5" />
          </motion.button>
        )}
        
        {showNotifications && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/search?filter=overdue')}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-[#252542] dark:text-gray-300 dark:hover:bg-[#2D2D4A]"
          >
            <Bell className="h-5 w-5" />
            {overdueCount > 0 && (
              <span className="absolute right-2 top-2 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#FF6B6B] ring-2 ring-white dark:ring-[#1A1A2E]" />
            )}
          </motion.button>
        )}
      </div>
    </header>
  );
};
