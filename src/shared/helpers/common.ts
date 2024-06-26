export function generateRandomValue (min: number, max: number, numbAfterDigit = 0) {
  return +((Math.random() * (max - min) + min).toFixed(numbAfterDigit));
}

export function generateRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function generateRandomItem<T> (items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function ParsedObject(obj: object): string {
  const values = Object.values(obj);
  return values.join(';');
}
