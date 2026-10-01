export function dayKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function lastDays(count: number, from: Date = new Date()): string[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from);
    d.setDate(d.getDate() - (count - 1 - i));
    return dayKey(d);
  });
}

// Consecutive days up to today. If today isn't done yet, the streak still counts from yesterday.
export function streak(doneDays: string[], today: Date = new Date()): number {
  const done = new Set(doneDays);
  const cursor = new Date(today);
  if (!done.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let count = 0;
  while (done.has(dayKey(cursor))) {
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}
