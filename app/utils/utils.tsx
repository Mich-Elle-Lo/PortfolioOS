export interface WindowPosition {
  x: number;
  y: number;
}

export const generateRandomPosition = (): WindowPosition => {
  const maxX = window.innerWidth - 700;
  const maxY = window.innerHeight - 600 - 60;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY) + 60;
  return { x, y };
};

export const getZIndex = (zIndexOrder: string[], app: string): number => {
  return zIndexOrder.indexOf(app) + 1;
};

export const bringToFront = (zIndexOrder: string[], app: string): string[] => {
  return [...zIndexOrder.filter((w) => w !== app), app];
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
