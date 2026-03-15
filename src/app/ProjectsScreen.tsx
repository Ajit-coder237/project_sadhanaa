import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { useProjects, useTasks } from '../hooks/useData';
import { CircularProgress } from '../components/ui/CircularProgress';
import { Plus, ChevronRight, LayoutList, LayoutGrid } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { PROJECT_ICONS } from '../utils/constants';

export const ProjectsScreen: React.FC = () => {
  const projects = useProjects();
  const tasks = useTasks();
  const { viewMode, setViewMode } = useAppStore();

  const getProjectStats = (projectId: number) => {
    const projectTasks = tasks?.filter(t => t.projectId === projectId) || [];
    const completed = projectTasks.filter(t => t.status === 'done').length;
    const total = projectTasks.length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, progress };
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] pb-24 dark:bg-[#0D0D1A]">
      <Header title="Projects" />
      
      <div className="mx-auto max-w-md p-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-[#252542]">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-white text-[#1A1A2E] shadow-sm dark:bg-[#1A1A2E] dark:text-[#F8F9FE]' : 'text-gray-500 dark:text-gray-400'}`}
            >
              <LayoutList className="h-4 w-4" />
              List
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${viewMode === 'kanban' ? 'bg-white text-[#1A1A2E] shadow-sm dark:bg-[#1A1A2E] dark:text-[#F8F9FE]' : 'text-gray-500 dark:text-gray-400'}`}
            >
              <LayoutGrid className="h-4 w-4" />
              Kanban
            </button>
          </div>
          
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6C5CE7] text-white shadow-sm transition-transform hover:scale-105 active:scale-95">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {viewMode === 'list' ? (
          <div className="space-y-4">
            <AnimatePresence>
              {projects?.map((project, index) => {
                const stats = getProjectStats(project.id!);
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-[#252542]"
                  >
                    <div className="absolute bottom-0 left-0 top-0 w-1.5" style={{ backgroundColor: project.color }} />
                    
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 dark:bg-[#1A1A2E]">
                      <span className="text-2xl" style={{ color: project.color }}>
                        {project.icon === 'briefcase' ? '💼' : project.icon === 'user' ? '👤' : project.icon === 'heart' ? '❤️' : '📁'}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#1A1A2E] dark:text-[#F8F9FE]">{project.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-[#A0A0B2]">{stats.total} tasks</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <CircularProgress progress={stats.progress} size={40} strokeWidth={4} color={project.color}>
                        <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{stats.progress}%</span>
                      </CircularProgress>
                      <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-transparent p-4 text-gray-500 transition-colors hover:border-[#6C5CE7] hover:bg-[#6C5CE7]/5 hover:text-[#6C5CE7] dark:border-[#2D2D4A] dark:text-gray-400 dark:hover:border-[#6C5CE7] dark:hover:bg-[#6C5CE7]/10"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Add Project</span>
            </motion.button>
          </div>
        ) : (
          <div className="flex h-[60vh] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white dark:border-[#2D2D4A] dark:bg-[#252542]">
            <div className="text-center">
              <LayoutGrid className="mx-auto mb-2 h-8 w-8 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400">Kanban view coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
