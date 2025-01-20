import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names or class value arrays and merges Tailwind CSS classes efficiently
 * @param inputs - Array of class values (strings, objects, or arrays)
 * @returns Merged and deduplicated class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
