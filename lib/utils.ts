export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const EASE = [0.22, 1, 0.36, 1] as const;
