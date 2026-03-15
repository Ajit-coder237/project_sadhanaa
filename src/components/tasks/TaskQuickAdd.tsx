import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Send } from 'lucide-react';
import { Input } from '../ui/Input';
import { createTask } from '../../hooks/useData';

export const TaskQuickAdd: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    await createTask({
      title: title.trim(),
      priority: 4,
      status: 'todo',
      recurrence: 'none',
      sortOrder: 0,
      isArchived: 0,
      isFavorite: 0,
    });
    
    setTitle('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm transition-shadow dark:bg-[#252542] ${isFocused ? 'ring-2 ring-[#6C5CE7]' : 'border border-[#E8E8F0] dark:border-[#2D2D4A]'}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-[#1A1A2E] dark:text-gray-400">
        <Plus className="h-5 w-5" />
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Add a task..."
        className="flex-1 bg-transparent text-[#1A1A2E] placeholder-gray-400 focus:outline-none dark:text-[#F8F9FE]"
      />
      <motion.button
        type="submit"
        disabled={!title.trim()}
        whileTap={{ scale: 0.9 }}
        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${title.trim() ? 'bg-[#6C5CE7] text-white hover:bg-[#5A4CD1]' : 'bg-gray-100 text-gray-400 dark:bg-[#1A1A2E] dark:text-gray-600'}`}
      >
        <Send className="h-4 w-4" />
      </motion.button>
    </motion.form>
  );
};
