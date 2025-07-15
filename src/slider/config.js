export const GAP = 20;

export function getSlidesToShow() {
  const width = window.innerWidth;
  if (width < 768) return 1;
  if (width < 1024) return 2;
  return 3;
}
