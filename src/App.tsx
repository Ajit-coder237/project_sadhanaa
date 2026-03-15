import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/appStore';
import { CustomTabBar } from './components/navigation/CustomTabBar';
import { TaskCreateSheet } from './components/tasks/TaskCreateSheet';
import { TodayScreen } from './app/TodayScreen';
import { OnboardingScreen } from './app/OnboardingScreen';
import { ProjectsScreen } from './app/ProjectsScreen';
import { GoalsScreen } from './app/GoalsScreen';
import { ProfileScreen } from './app/ProfileScreen';
import { SearchScreen } from './app/SearchScreen';
import { seedDatabase } from './db/db';

const AppRouter = () => {
  const { hasCompletedOnboarding, theme } = useAppStore();

  useEffect(() => {
    seedDatabase();
  }, []);

  useEffect(() => {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (!hasCompletedOnboarding) {
    return (
      <Routes>
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-[#F8F9FE] font-sans text-[#1A1A2E] antialiased dark:bg-[#0D0D1A] dark:text-[#F8F9FE]">
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/today" element={<TodayScreen />} />
          <Route path="/projects" element={<ProjectsScreen />} />
          <Route path="/goals" element={<GoalsScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="*" element={<Navigate to="/today" replace />} />
        </Routes>
      </div>
      <CustomTabBar />
      <TaskCreateSheet />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
