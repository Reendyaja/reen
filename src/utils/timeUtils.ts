/**
 * Format a Date object into a display string
 * @param date The date to format
 * @returns Formatted string in HH:MM:SS format
 */
export const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${hours}:${minutes}:${seconds}`;
};

/**
 * Get the next target second (15, 30, 45, or 0)
 * @param currentSecond The current second
 * @returns The next target second
 */
export const getNextTargetSecond = (currentSecond: number): number => {
  if (currentSecond < 15) return 15;
  if (currentSecond < 30) return 30;
  if (currentSecond < 45) return 45;
  return 0;
};

/**
 * Calculate seconds until the next target second
 * @param currentSecond The current second
 * @param targetSecond The target second (15, 30, 45, or 0)
 * @returns Seconds until the target
 */
export const secondsUntilTarget = (currentSecond: number, targetSecond: number): number => {
  return targetSecond > currentSecond 
    ? targetSecond - currentSecond 
    : 60 - currentSecond + targetSecond;
};