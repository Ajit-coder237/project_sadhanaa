import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BottomSheet } from '../ui/BottomSheet';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAppStore } from '../../store/appStore';
import { createTask, useProjects } from '../../hooks/useData';
import { PRIORITY_CONFIG } from '../../utils/constants';

export const TaskCreateSheet: React.FC = () => {
  const { quickAddVisible, setQuickAddVisible } = useAppStore();
  const projects = useProjects();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState<number | undefined>();
  const [priority, setPriority] = useState<number>(4);
  const [dueDate, setDueDate] = useState('');

  const handleSave = async () => {
    if (!title.trim()) return;
    
    await createTask({
      title: title.trim(),
      description: description.trim() || undefined,
      projectId,
      priority,
      status: 'todo',
      dueDate: dueDate || undefined,
      recurrence: 'none',
      sortOrder: 0,
      isArchived: 0,
      isFavorite: 0,
    });
    
    setTitle('');
    setDescription('');
    setProjectId(undefined);
    setPriority(4);
    setDueDate('');
    setQuickAddVisible(false);
  };

  return (
    <BottomSheet isOpen={quickAddVisible} onClose={() => setQuickAddVisible(false)}>
      <div className="space-y-4 p-4">
        <h2 className="text-xl font-bold text-[#1A1A2E] dark:text-[#F8F9FE]">New Task</h2>
        
        <Input
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        
        <Input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
        />
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.entries(PRIORITY_CONFIG).map(([level, config]) => (
            <button
              key={level}
              onClick={() => setPriority(Number(level))}
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${priority === Number(level) ? 'bg-[#6C5CE7] text-white' : 'bg-gray-100 text-gray-700 dark:bg-[#2D2D4A] dark:text-gray-300'}`}
            >
              <span style={{ color: priority === Number(level) ? 'white' : config.color }}>
                {config.icon === 'flag' ? '🚩' : '🏳️'}
              </span>
              {config.label}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <select
            value={projectId || ''}
            onChange={(e) => setProjectId(e.target.value ? Number(e.target.value) : undefined)}
            className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#6C5CE7] focus:ring-[#6C5CE7] dark:border-[#2D2D4A] dark:bg-[#1A1A2E] dark:text-white"
          >
            <option value="">Inbox (No Project)</option>
            {projects?.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#6C5CE7] focus:ring-[#6C5CE7] dark:border-[#2D2D4A] dark:bg-[#1A1A2E] dark:text-white"
          />
        </div>
        
        <Button onClick={handleSave} className="w-full" disabled={!title.trim()}>
          Create Task
        </Button>
      </div>
    </BottomSheet>
  );
};
