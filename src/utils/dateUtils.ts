/**
 * Utility functions for date handling with EST timezone
 */

/**
 * Converts current date to EST timezone and returns formatted string
 * @returns {string} Date string in EST timezone formatted as 'YYYY-MM-DD HH:mm:ss'
 */
export const getCurrentDateInEST = (): string => {
  const now = new Date();
  
  // Convert to EST (UTC-5) or EDT (UTC-4) based on daylight saving time
  const estOffset = -5; // EST is UTC-5
  const edtOffset = -4; // EDT is UTC-4
  
  // Check if daylight saving time is in effect
  const isDST = isDaylightSavingTime(now);
  const offset = isDST ? edtOffset : estOffset;
  
  // Create new date with EST/EDT offset
  const estDate = new Date(now.getTime() + (offset * 60 * 60 * 1000));
  
  // Format as 'YYYY-MM-DD HH:mm:ss'
  const year = estDate.getUTCFullYear();
  const month = String(estDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(estDate.getUTCDate()).padStart(2, '0');
  const hours = String(estDate.getUTCHours()).padStart(2, '0');
  const minutes = String(estDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(estDate.getUTCSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Checks if daylight saving time is in effect for the given date
 * DST in the US starts on the second Sunday of March and ends on the first Sunday of November
 * @param {Date} date - The date to check
 * @returns {boolean} True if DST is in effect
 */
const isDaylightSavingTime = (date: Date): boolean => {
  const year = date.getFullYear();
  
  // DST starts on the second Sunday of March
  const marchFirst = new Date(year, 2, 1); // March 1st
  const marchFirstDay = marchFirst.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const secondSundayMarch = 8 + (7 - marchFirstDay) % 7; // Second Sunday of March
  const dstStart = new Date(year, 2, secondSundayMarch, 2, 0, 0); // 2 AM
  
  // DST ends on the first Sunday of November
  const novemberFirst = new Date(year, 10, 1); // November 1st
  const novemberFirstDay = novemberFirst.getDay();
  const firstSundayNovember = 1 + (7 - novemberFirstDay) % 7; // First Sunday of November
  const dstEnd = new Date(year, 10, firstSundayNovember, 2, 0, 0); // 2 AM
  
  return date >= dstStart && date < dstEnd;
};

/**
 * Alternative method using Intl.DateTimeFormat for EST timezone
 * This is more reliable and handles DST automatically
 * @returns {string} Date string in EST timezone formatted as 'YYYY-MM-DD HH:mm:ss'
 */
export const getCurrentDateInESTAlternative = (): string => {
  const now = new Date();
  
  // Use Intl.DateTimeFormat to format in EST timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York', // EST/EDT timezone
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  const parts = formatter.formatToParts(now);
  const year = parts.find(part => part.type === 'year')?.value;
  const month = parts.find(part => part.type === 'month')?.value;
  const day = parts.find(part => part.type === 'day')?.value;
  const hour = parts.find(part => part.type === 'hour')?.value;
  const minute = parts.find(part => part.type === 'minute')?.value;
  const second = parts.find(part => part.type === 'second')?.value;
  
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
