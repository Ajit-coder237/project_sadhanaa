export const APP_NAME = 'FocusFlow';

export const POMODORO_DEFAULTS = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
};

export const CATEGORY_ICONS: Record<string, string> = {
  health: '🏃',
  career: '💼',
  education: '📚',
  finance: '💰',
  personal: '🧘',
  fitness: '🏋️',
  other: '✨',
};

export const PROJECT_COLORS = [
  '#6C5CE7', '#A29BFE', '#00CEFF', '#FD79A8', '#00B894', '#FDCB6E', '#FF6B6B',
  '#0984E3', '#E84393', '#D63031', '#E17055', '#FDCB6E', '#00CEC9', '#2D3436',
  '#636E72', '#B2BEC3'
];

export const PROJECT_ICONS = [
  'folder', 'briefcase', 'user', 'heart', 'star', 'home', 'book', 'coffee',
  'music', 'camera', 'code', 'pen-tool', 'monitor', 'smartphone', 'globe',
  'shopping-cart', 'gift', 'award', 'flag', 'map', 'compass', 'sun', 'moon', 'zap'
];

export const MOOD_EMOJIS = ['😢', '😐', '😊', '😄', '🤩'];

export const HABIT_ICONS = [
  '💪', '🏃', '📚', '💧', '🧘', '🎵', '🎨', '💻', '🏋️', '🧹',
  '🍎', '🥦', '💊', '🛌', '🚶', '🚴', '🏊', '🍳', '📝', '🗣️',
  '🧠', '🌱', '☀️', '🌙', '💰', '📈', '🤝', '🙏', '📵', '🚭'
];

export const PRIORITY_CONFIG: Record<number, { label: string; color: string; icon: string }> = {
  1: { label: 'Urgent', color: '#FF6B6B', icon: 'flag' },
  2: { label: 'High', color: '#FFA502', icon: 'flag' },
  3: { label: 'Medium', color: '#FECA57', icon: 'flag' },
  4: { label: 'Low', color: '#DFE6E9', icon: 'flag-outline' },
};
