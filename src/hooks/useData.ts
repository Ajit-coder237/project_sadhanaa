import { useLiveQuery } from 'dexie-react-hooks';
import { db, Task, Project, Goal, Habit, HabitLog, FocusSession, DailyNote } from '../db/db';

export function useTasks() {
  return useLiveQuery(() => db.tasks.toArray());
}

export function useTodayTasks() {
  const today = new Date().toISOString().split('T')[0];
  return useLiveQuery(() => db.tasks.where('dueDate').equals(today).toArray());
}

export function useOverdueTasks() {
  const today = new Date().toISOString().split('T')[0];
  return useLiveQuery(() => db.tasks.where('dueDate').below(today).filter(t => t.status !== 'done').toArray());
}

export function useInboxTasks() {
  return useLiveQuery(() => db.tasks.filter(t => !t.projectId && !t.dueDate).toArray());
}

export function useProjects() {
  return useLiveQuery(() => db.projects.toArray());
}

export function useGoals() {
  return useLiveQuery(() => db.goals.toArray());
}

export function useHabits() {
  return useLiveQuery(() => db.habits.toArray());
}

export function useHabitLogs(date: string) {
  return useLiveQuery(() => db.habitLogs.where('date').equals(date).toArray());
}

export function useDailyNote(date: string) {
  return useLiveQuery(() => db.dailyNotes.where('date').equals(date).first());
}

export async function createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = new Date().toISOString();
  return db.tasks.add({ ...task, createdAt: now, updatedAt: now });
}

export async function updateTask(id: number, changes: Partial<Task>) {
  return db.tasks.update(id, { ...changes, updatedAt: new Date().toISOString() });
}

export async function deleteTask(id: number) {
  return db.tasks.delete(id);
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = new Date().toISOString();
  return db.projects.add({ ...project, createdAt: now, updatedAt: now });
}

export async function createGoal(goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = new Date().toISOString();
  return db.goals.add({ ...goal, createdAt: now, updatedAt: now });
}

export async function createHabit(habit: Omit<Habit, 'id' | 'createdAt'>) {
  const now = new Date().toISOString();
  return db.habits.add({ ...habit, createdAt: now });
}

export async function logHabit(habitId: number, date: string, count: number) {
  const existing = await db.habitLogs.where({ habitId, date }).first();
  if (existing && existing.id) {
    return db.habitLogs.update(existing.id, { count: existing.count + count });
  } else {
    return db.habitLogs.add({ habitId, date, count, createdAt: new Date().toISOString() });
  }
}

export async function saveDailyNote(date: string, content: string, mood?: number) {
  const existing = await db.dailyNotes.where('date').equals(date).first();
  const now = new Date().toISOString();
  if (existing && existing.id) {
    return db.dailyNotes.update(existing.id, { content, mood, updatedAt: now });
  } else {
    return db.dailyNotes.add({ date, content, mood, createdAt: now, updatedAt: now });
  }
}
