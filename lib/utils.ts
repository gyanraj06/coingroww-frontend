// Simplified version of clsx/tailwind-merge to avoid dependency issues
export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}
