import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/common/Header';
import { useTasks, useHabits, useGoals } from '../hooks/useData';
import { CircularProgress } from '../components/ui/CircularProgress';
import { Settings, Download, Trash2, Clock, CheckCircle2, Flame, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { format, subDays } from 'date-fns';

export const ProfileScreen: React.FC = () => {
  const tasks = useTasks();
  const habits = useHabits();
  const goals = useGoals();

  const completedTasks = tasks?.filter(t => t.status === 'done').length || 0;
  const totalTasks = tasks?.length || 0;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const activeGoals = goals?.filter(g => g.status === 'active').length || 0;
  const bestStreak = habits?.reduce((max, h) => Math.max(max, h.bestStreak), 0) || 0;

  // Mock data for the chart
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    return {
      name: format(date, 'EEE'),
      completed: Math.floor(Math.random() * 10) + 1, // Mock data
    };
  });

  return (
    <div className="min-h-screen bg-[#F8F9FE] pb-24 dark:bg-[#0D0D1A]">
      <Header title="Your Progress" showSearch={false} showNotifications={false} />
      
      <div className="mx-auto max-w-md space-y-4 p-4">
        
        {/* Profile Header */}
        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-[#252542]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#00CEFF] text-2xl font-bold text-white shadow-md">
            U
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1A1A2E] dark:text-[#F8F9FE]">User</h2>
            <p className="text-sm text-gray-500 dark:text-[#A0A0B2]">Productivity Score: 85/100</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-[#252542]">
            <div className="mb-2 flex items-center gap-2 text-gray-500 dark:text-[#A0A0B2]">
              <CheckCircle2 className="h-5 w-5 text-[#00B894]" />
              <span className="text-sm font-medium">Tasks Done</span>
            </div>
            <p className="text-2xl font-bold text-[#1A1A2E] dark:text-[#F8F9FE]">{completedTasks}</p>
          </div>
          
          <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-[#252542]">
            <div className="mb-2 flex items-center gap-2 text-gray-500 dark:text-[#A0A0B2]">
              <Flame className="h-5 w-5 text-[#FFA502]" />
              <span className="text-sm font-medium">Best Streak</span>
            </div>
            <p className="text-2xl font-bold text-[#1A1A2E] dark:text-[#F8F9FE]">{bestStreak} days</p>
          </div>
          
          <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-[#252542]">
            <div className="mb-2 flex items-center gap-2 text-gray-500 dark:text-[#A0A0B2]">
              <Target className="h-5 w-5 text-[#6C5CE7]" />
              <span className="text-sm font-medium">Active Goals</span>
            </div>
            <p className="text-2xl font-bold text-[#1A1A2E] dark:text-[#F8F9FE]">{activeGoals}</p>
          </div>
          
          <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-[#252542]">
            <div className="mb-2 flex items-center gap-2 text-gray-500 dark:text-[#A0A0B2]">
              <Clock className="h-5 w-5 text-[#00CEFF]" />
              <span className="text-sm font-medium">Focus Time</span>
            </div>
            <p className="text-2xl font-bold text-[#1A1A2E] dark:text-[#F8F9FE]">12h 30m</p>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-[#252542]">
          <h3 className="mb-4 text-lg font-bold text-[#1A1A2E] dark:text-[#F8F9FE]">Tasks Completed This Week</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last7Days}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A0A0B2', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="completed" radius={[4, 4, 0, 0]}>
                  {last7Days.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 6 ? '#6C5CE7' : '#E8E8F0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-white shadow-sm dark:bg-[#252542]">
          <button className="flex w-full items-center gap-3 border-b border-gray-100 p-4 transition-colors hover:bg-gray-50 dark:border-[#2D2D4A] dark:hover:bg-[#2A2A4A]">
            <Settings className="h-5 w-5 text-gray-500 dark:text-[#A0A0B2]" />
            <span className="font-medium text-[#1A1A2E] dark:text-[#F8F9FE]">Settings</span>
          </button>
          <button className="flex w-full items-center gap-3 border-b border-gray-100 p-4 transition-colors hover:bg-gray-50 dark:border-[#2D2D4A] dark:hover:bg-[#2A2A4A]">
            <Download className="h-5 w-5 text-gray-500 dark:text-[#A0A0B2]" />
            <span className="font-medium text-[#1A1A2E] dark:text-[#F8F9FE]">Export Data</span>
          </button>
          <button className="flex w-full items-center gap-3 p-4 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20">
            <Trash2 className="h-5 w-5 text-[#FF6B6B]" />
            <span className="font-medium text-[#FF6B6B]">Clear Completed Tasks</span>
          </button>
        </div>

      </div>
    </div>
  );
};
