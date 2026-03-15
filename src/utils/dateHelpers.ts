import { format, isToday, isTomorrow, isYesterday, differenceInDays, parseISO } from 'date-fns';

export function formatRelativeDate(dateString: string): string {
  const date = parseISO(dateString);
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  
  const diff = differenceInDays(date, new Date());
  if (diff > 0 && diff < 7) {
    return format(date, 'EEEE'); // e.g., "Monday"
  }
  
  return format(date, 'MMM d'); // e.g., "Jan 15"
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
  return format(date, 'h:mm a');
}

export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}
