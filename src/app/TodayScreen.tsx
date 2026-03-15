import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, AlertCircle, Calendar as CalendarIcon, Target, Activity, Edit3 } from 'lucide-react';
import { Header } from '../components/common/Header';
import { TaskCard } from '../components/tasks/TaskCard';
import { TaskQuickAdd } from '../components/tasks/TaskQuickAdd';
import { useTodayTasks, useOverdueTasks, useProjects, useGoals, useHabits, updateTask, saveDailyNote, useDailyNote } from '../hooks/useData';
import { format } from 'date-fns';
import { MOOD_EMOJIS } from '../utils/constants';
import confetti from 'canvas-confetti';

export const TodayScreen: React.FC = () => {
  const todayTasks = useTodayTasks();
  const overdueTasks = useOverdueTasks();
  const projects = useProjects();
  const goals = useGoals();
  const habits = useHabits();
  
  const todayDate = new Date().toISOString().split('T')[0];
  const dailyNote = useDailyNote(todayDate);
  
  const [noteContent, setNoteContent] = useState(dailyNote?.content || '');
  const [selectedMood, setSelectedMood] = useState<number | undefined>(dailyNote?.mood);

  const handleCompleteTask = async (id: number) => {
    const task = todayTasks?.find(t => t.id === id) || overdueTasks?.find(t => t.id === id);
    if (!task) return;
    
    const isDone = task.status === 'done';
    await updateTask(id, {
      status: isDone ? 'todo' : 'done',
      completedAt: isDone ? undefined : new Date().toISOString()
    });
    
    if (!isDone) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#6C5CE7', '#00CEFF', '#00B894']
      });
    }
  };

  const handleRescheduleTask = (id: number) => {
    // Open date picker bottom sheet (simplified for now)
    const newDate = prompt('Enter new date (YYYY-MM-DD):', todayDate);
    if (newDate) {
      updateTask(id, { dueDate: newDate });
    }
  };

  const handleSaveNote = () => {
    saveDailyNote(todayDate, noteContent, selectedMood);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning ☀️';
    if (hour < 18) return 'Good afternoon 🌤️';
    return 'Good evening 🌙';
  };

  const SectionHeader = ({ title, count, icon: Icon, colorClass, isOpen, onToggle }: any) => (
    <button
      onClick={onToggle}
      className={`flex w-full items-center justify-between py-3 px-4 transition-colors hover:bg-gray-50 dark:hover:bg-[#252542] ${colorClass}`}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        <h2 className="text-lg font-semibold">{title}</h2>
        {count > 0 && (
          <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 dark:bg-[#2D2D4A] dark:text-gray-300">
            {count}
          </span>
        )}
      </div>
      {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
    </button>
  );

  const [sections, setSections] = useState({
    overdue: true,
    priority: true,
    today: true,
    goals: true,
    habits: true,
    note: true,
  });

  const toggleSection = (key: keyof typeof sections) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const priorityTasks = todayTasks?.filter(t => t.priority <= 2 && t.status !== 'done') || [];
  const regularTasks = todayTasks?.filter(t => t.priority > 2 || t.status === 'done') || [];

  return (
    <div className="min-h-screen bg-[#F8F9FE] pb-24 dark:bg-[#0D0D1A]">
      <Header
        title={getGreeting()}
        subtitle={format(new Date(), 'EEEE, MMMM d')}
      />
      
      <main className="mx-auto max-w-md space-y-4 p-4">
        <TaskQuickAdd />

        {/* OVERDUE */}
        {overdueTasks && overdueTasks.length > 0 && (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#252542] border-l-4 border-l-[#FF6B6B]">
            <SectionHeader
              title="Overdue"
              count={overdueTasks.length}
              icon={AlertCircle}
              colorClass="text-[#FF6B6B]"
              isOpen={sections.overdue}
              onToggle={() => toggleSection('overdue')}
            />
            <AnimatePresence>
              {sections.overdue && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="px-4 pb-2"
                >
                  {overdueTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      project={projects?.find(p => p.id === task.projectId)}
                      onComplete={handleCompleteTask}
                      onReschedule={handleRescheduleTask}
                      onClick={() => {}}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* PRIORITY */}
        {priorityTasks.length > 0 && (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#252542] border-l-4 border-l-[#FFA502]">
            <SectionHeader
              title="Priority"
              count={priorityTasks.length}
              icon={Target}
              colorClass="text-[#FFA502]"
              isOpen={sections.priority}
              onToggle={() => toggleSection('priority')}
            />
            <AnimatePresence>
              {sections.priority && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="px-4 pb-2"
                >
                  {priorityTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      project={projects?.find(p => p.id === task.projectId)}
                      onComplete={handleCompleteTask}
                      onReschedule={handleRescheduleTask}
                      onClick={() => {}}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* TODAY */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#252542] border-l-4 border-l-[#6C5CE7]">
          <SectionHeader
            title="Today"
            count={regularTasks.length}
            icon={CalendarIcon}
            colorClass="text-[#6C5CE7]"
            isOpen={sections.today}
            onToggle={() => toggleSection('today')}
          />
          <AnimatePresence>
            {sections.today && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="px-4 pb-2"
              >
                {regularTasks.length === 0 ? (
                  <p className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">No tasks for today. Enjoy your day!</p>
                ) : (
                  regularTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      project={projects?.find(p => p.id === task.projectId)}
                      onComplete={handleCompleteTask}
                      onReschedule={handleRescheduleTask}
                      onClick={() => {}}
                    />
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DAILY NOTE */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#252542]">
          <SectionHeader
            title="How was your day?"
            icon={Edit3}
            colorClass="text-[#00CEFF]"
            isOpen={sections.note}
            onToggle={() => toggleSection('note')}
          />
          <AnimatePresence>
            {sections.note && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="px-4 pb-4"
              >
                <div className="mb-4 flex justify-between">
                  {MOOD_EMOJIS.map((emoji, index) => (
                    <motion.button
                      key={index}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => {
                        setSelectedMood(index + 1);
                        saveDailyNote(todayDate, noteContent, index + 1);
                      }}
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-colors ${selectedMood === index + 1 ? 'bg-[#6C5CE7]/20 ring-2 ring-[#6C5CE7]' : 'bg-gray-50 hover:bg-gray-100 dark:bg-[#1A1A2E] dark:hover:bg-[#2D2D4A]'}`}
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  onBlur={handleSaveNote}
                  placeholder="Write down your thoughts..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 focus:border-[#6C5CE7] focus:outline-none focus:ring-1 focus:ring-[#6C5CE7] dark:border-[#2D2D4A] dark:bg-[#1A1A2E] dark:text-[#F8F9FE]"
                  rows={3}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
};
