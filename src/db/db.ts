import Dexie, { Table } from 'dexie';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  projectId?: number;
  priority: number; // 1=urgent, 2=high, 3=medium, 4=low
  status: 'todo' | 'in_progress' | 'done';
  dueDate?: string; // YYYY-MM-DD
  dueTime?: string; // HH:mm
  reminderDate?: string;
  reminderTime?: string;
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  recurrenceRule?: string;
  tags?: string[];
  subtasks?: { id: string; title: string; done: boolean }[];
  notes?: string;
  estimatedMinutes?: number;
  actualMinutes?: number;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isArchived: number;
  isFavorite: number;
}

export interface Project {
  id?: number;
  name: string;
  color: string;
  icon: string;
  description?: string;
  isArchived: number;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id?: number;
  name: string;
  color: string;
  createdAt: string;
}

export interface Goal {
  id?: number;
  title: string;
  description?: string;
  targetDate?: string;
  category: 'health' | 'career' | 'education' | 'finance' | 'personal' | 'fitness' | 'other';
  milestones?: { id: string; title: string; done: boolean; dueDate?: string }[];
  progress: number;
  status: 'active' | 'completed' | 'paused';
  reminderFrequency: 'daily' | 'weekly' | 'monthly' | 'none';
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Habit {
  id?: number;
  name: string;
  icon: string;
  color: string;
  frequency: 'daily' | 'weekly';
  targetCount: number;
  reminderTime?: string;
  streak: number;
  bestStreak: number;
  isArchived: number;
  createdAt: string;
}

export interface HabitLog {
  id?: number;
  habitId: number;
  date: string; // YYYY-MM-DD
  count: number;
  createdAt: string;
}

export interface FocusSession {
  id?: number;
  taskId?: number;
  duration: number; // seconds
  type: 'pomodoro' | 'deep_work' | 'custom';
  completedAt: string;
  createdAt: string;
}

export interface DailyNote {
  id?: number;
  date: string; // YYYY-MM-DD
  content?: string;
  mood?: number; // 1-5
  createdAt: string;
  updatedAt: string;
}

export class FocusFlowDB extends Dexie {
  tasks!: Table<Task, number>;
  projects!: Table<Project, number>;
  tags!: Table<Tag, number>;
  goals!: Table<Goal, number>;
  habits!: Table<Habit, number>;
  habitLogs!: Table<HabitLog, number>;
  focusSessions!: Table<FocusSession, number>;
  dailyNotes!: Table<DailyNote, number>;

  constructor() {
    super('FocusFlowDB');
    this.version(1).stores({
      tasks: '++id, title, projectId, priority, status, dueDate, createdAt',
      projects: '++id, name, isArchived, sortOrder',
      tags: '++id, &name',
      goals: '++id, title, category, status',
      habits: '++id, name, isArchived',
      habitLogs: '++id, habitId, date, [habitId+date]',
      focusSessions: '++id, taskId, type, completedAt',
      dailyNotes: '++id, &date',
    });
  }
}

export const db = new FocusFlowDB();

// Seed Data
export async function seedDatabase() {
  const projectCount = await db.projects.count();
  if (projectCount > 0) return;

  const now = new Date().toISOString();
  const today = now.split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

  const workId = await db.projects.add({
    name: 'Work', color: '#FF6B6B', icon: 'briefcase', isArchived: 0, sortOrder: 0, createdAt: now, updatedAt: now
  });
  const personalId = await db.projects.add({
    name: 'Personal', color: '#6C5CE7', icon: 'user', isArchived: 0, sortOrder: 1, createdAt: now, updatedAt: now
  });
  const healthId = await db.projects.add({
    name: 'Health', color: '#00B894', icon: 'heart', isArchived: 0, sortOrder: 2, createdAt: now, updatedAt: now
  });

  await db.tasks.bulkAdd([
    { title: 'Review quarterly report', projectId: workId, priority: 1, status: 'todo', dueDate: today, recurrence: 'none', createdAt: now, updatedAt: now, sortOrder: 0, isArchived: 0, isFavorite: 0, subtasks: [{ id: '1', title: 'Q1 Data', done: false }, { id: '2', title: 'Q2 Projections', done: false }] },
    { title: 'Buy groceries', projectId: personalId, priority: 3, status: 'todo', dueDate: today, recurrence: 'none', createdAt: now, updatedAt: now, sortOrder: 1, isArchived: 0, isFavorite: 0 },
    { title: 'Team standup meeting', projectId: workId, priority: 2, status: 'todo', dueDate: today, dueTime: '10:00', recurrence: 'none', createdAt: now, updatedAt: now, sortOrder: 2, isArchived: 0, isFavorite: 0 },
    { title: 'Morning jog', projectId: healthId, priority: 2, status: 'todo', dueDate: today, dueTime: '07:00', recurrence: 'none', createdAt: now, updatedAt: now, sortOrder: 3, isArchived: 0, isFavorite: 0 },
    { title: 'Read 30 pages', projectId: personalId, priority: 4, status: 'todo', dueDate: tomorrow, recurrence: 'none', createdAt: now, updatedAt: now, sortOrder: 4, isArchived: 0, isFavorite: 0 },
    { title: 'Prepare presentation', projectId: workId, priority: 1, status: 'todo', dueDate: nextWeek, recurrence: 'none', createdAt: now, updatedAt: now, sortOrder: 5, isArchived: 0, isFavorite: 0, subtasks: [{ id: '1', title: 'Slides', done: false }, { id: '2', title: 'Notes', done: false }, { id: '3', title: 'Rehearse', done: false }, { id: '4', title: 'Feedback', done: false }] },
    { title: 'Doctor appointment', projectId: healthId, priority: 2, status: 'todo', dueDate: nextWeek, recurrence: 'none', createdAt: now, updatedAt: now, sortOrder: 6, isArchived: 0, isFavorite: 0 },
    { title: 'Clean the house', priority: 4, status: 'todo', recurrence: 'none', createdAt: now, updatedAt: now, sortOrder: 7, isArchived: 0, isFavorite: 0 }
  ]);

  await db.goals.bulkAdd([
    { title: 'Run a marathon', category: 'fitness', progress: 35, status: 'active', reminderFrequency: 'weekly', color: '#00B894', createdAt: now, updatedAt: now, milestones: [{ id: '1', title: '5K', done: true }, { id: '2', title: '10K', done: true }, { id: '3', title: 'Half Marathon', done: false }, { id: '4', title: '30K', done: false }, { id: '5', title: 'Full Marathon', done: false }] },
    { title: 'Learn TypeScript', category: 'education', progress: 60, status: 'active', reminderFrequency: 'daily', color: '#6C5CE7', createdAt: now, updatedAt: now, milestones: [{ id: '1', title: 'Basics', done: true }, { id: '2', title: 'Generics', done: true }, { id: '3', title: 'Advanced Types', done: false }, { id: '4', title: 'Project', done: false }] }
  ]);

  await db.habits.bulkAdd([
    { name: 'Drink 8 glasses of water', icon: '💧', color: '#00CEFF', frequency: 'daily', targetCount: 8, reminderTime: '08:00', streak: 5, bestStreak: 12, isArchived: 0, createdAt: now },
    { name: 'Exercise 30 minutes', icon: '🏃', color: '#00B894', frequency: 'daily', targetCount: 1, reminderTime: '07:00', streak: 2, bestStreak: 5, isArchived: 0, createdAt: now },
    { name: 'Read for 20 minutes', icon: '📚', color: '#6C5CE7', frequency: 'daily', targetCount: 1, reminderTime: '21:00', streak: 10, bestStreak: 15, isArchived: 0, createdAt: now }
  ]);
}
