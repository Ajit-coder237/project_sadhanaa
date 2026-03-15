import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/common/Header';
import { useTasks, useProjects, useGoals } from '../hooks/useData';
import { TaskCard } from '../components/tasks/TaskCard';
import { Search, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const SearchScreen: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialFilter = queryParams.get('filter') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(initialFilter || 'all');
  
  const tasks = useTasks();
  const projects = useProjects();
  const goals = useGoals();

  const filteredTasks = tasks?.filter(t => {
    if (activeFilter === 'overdue') {
      return t.dueDate && new Date(t.dueDate) < new Date(new Date().toISOString().split('T')[0]) && t.status !== 'done';
    }
    if (!searchQuery) return false;
    return t.title.toLowerCase().includes(searchQuery.toLowerCase());
  }) || [];

  return (
    <div className="min-h-screen bg-[#F8F9FE] pb-24 dark:bg-[#0D0D1A]">
      <Header title="Search" showSearch={false} />
      
      <div className="mx-auto max-w-md space-y-4 p-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, projects, goals..."
            autoFocus
            className="block w-full rounded-xl border-gray-300 bg-white py-3 pl-10 pr-10 text-gray-900 shadow-sm focus:border-[#6C5CE7] focus:ring-[#6C5CE7] dark:border-[#2D2D4A] dark:bg-[#1A1A2E] dark:text-white dark:placeholder-gray-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'tasks', 'projects', 'goals', 'overdue'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${activeFilter === filter ? 'bg-[#6C5CE7] text-white' : 'bg-gray-100 text-gray-700 dark:bg-[#2D2D4A] dark:text-gray-300'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            <div>
              <h3 className="mb-2 text-sm font-bold text-gray-500 dark:text-[#A0A0B2]">Tasks ({filteredTasks.length})</h3>
              {filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  project={projects?.find(p => p.id === task.projectId)}
                  onComplete={() => {}}
                  onReschedule={() => {}}
                  onClick={() => {}}
                />
              ))}
            </div>
          ) : (
            (searchQuery || activeFilter === 'overdue') && (
              <div className="py-10 text-center text-gray-500 dark:text-[#A0A0B2]">
                <p>No results found.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
