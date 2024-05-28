import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHours(timeStamsInSeconds: number) {
  // Create a Date object
  const date = new Date(timeStamsInSeconds * 1000);

  // Get the hour (0-23)
  const hour24 = date.getHours();

  console.log(hour24);
  // Convert to 12-hour format
  const hour12 = hour24 % 12 || 12; // Converts 0 to 12
  const ampm = hour24 >= 12 ? 'PM' : 'AM';

  const formattedHour = `${hour12} ${ampm}`;

  return formattedHour;
}
