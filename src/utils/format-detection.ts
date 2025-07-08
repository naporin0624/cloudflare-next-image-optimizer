export function detectOptimalFormat(acceptHeader: string | null): string | undefined {
  if (!acceptHeader) return undefined;
  
  if (acceptHeader.includes('image/avif')) return 'avif';
  if (acceptHeader.includes('image/webp')) return 'webp';
  return undefined;
}