import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Flag } from 'lucide-react';
import { Task, Project } from '../../db/db';
import { AnimatedCheckbox } from '../ui/AnimatedCheckbox';
import { SwipeableRow } from '../ui/SwipeableRow';
import { PRIORITY_CONFIG } from '../../utils/constants';
import { formatRelativeDate } from '../../utils/dateHelpers';

interface TaskCardProps {
  task: Task;
  project?: Project;
  onComplete: (id: number) => void;
  onReschedule: (id: number) => void;
  onClick: (id: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, project, onComplete, onReschedule, onClick }) => {
  const priority = PRIORITY_CONFIG[task.priority];
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date(new Date().toISOString().split('T')[0]);

  return (
    <SwipeableRow onComplete={() => onComplete(task.id!)} onReschedule={() => onReschedule(task.id!)}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={() => onClick(task.id!)}
        className="flex items-start gap-3 rounded-2xl border border-[#E8E8F0] bg-white p-4 shadow-sm transition-colors hover:bg-gray-50 dark:border-[#2D2D4A] dark:bg-[#252542] dark:hover:bg-[#2A2A4A] cursor-pointer"
      >
        <div className="mt-0.5">
          <AnimatedCheckbox
            checked={task.status === 'done'}
            onChange={() => onComplete(task.id!)}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-base font-medium ${task.status === 'done' ? 'text-gray-400 line-through dark:text-gray-500' : 'text-[#1A1A2E] dark:text-[#F8F9FE]'}`}>
            {task.title}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
            {project && (
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: project.color }} />
                <span className="text-gray-600 dark:text-gray-400">{project.name}</span>
              </div>
            )}
            {task.priority < 4 && (
              <div className="flex items-center gap-1" style={{ color: priority.color }}>
                <Flag className="h-3 w-3" />
                <span>{priority.label}</span>
              </div>
            )}
            {task.dueDate && (
              <div className={`flex items-center gap-1 ${isOverdue ? 'text-[#FF6B6B]' : 'text-gray-500 dark:text-gray-400'}`}>
                <Calendar className="h-3 w-3" />
                <span>{formatRelativeDate(task.dueDate)} {task.dueTime && `at ${task.dueTime}`}</span>
              </div>
            )}
            {task.subtasks && task.subtasks.length > 0 && (
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <div className="h-1.5 w-12 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full bg-[#6C5CE7]"
                    style={{ width: `${(task.subtasks.filter(s => s.done).length / task.subtasks.length) * 100}%` }}
                  />
                </div>
                <span>{task.subtasks.filter(s => s.done).length}/{task.subtasks.length}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </SwipeableRow>
  );
};
