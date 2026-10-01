// Dates are stored as local calendar days ("2026-10-01"), never as UTC timestamps,
// so a check-in at 1am in Dubai counts for the right day.
export function dayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
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
