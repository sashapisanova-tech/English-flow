const STORAGE_KEY = 'dutch-text-reads';

export interface TextReadRecord {
  textId: string;
  firstReadAt: string;
  lastReadAt: string;
  readCount: number;
}

export function getTextReadHistory(): Record<string, TextReadRecord> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

export function recordTextRead(textId: string): void {
  const history = getTextReadHistory();
  const now = new Date().toISOString();
  const existing = history[textId];
  history[textId] = existing
    ? { ...existing, lastReadAt: now, readCount: existing.readCount + 1 }
    : { textId, firstReadAt: now, lastReadAt: now, readCount: 1 };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function daysSince(isoDate: string): number {
  return Math.floor((Date.now() - new Date(isoDate).getTime()) / 86_400_000);
}
