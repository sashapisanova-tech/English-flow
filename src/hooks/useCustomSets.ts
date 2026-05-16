import { useState, useCallback } from 'react';

export interface CustomWord {
  dutch: string;
  english: string;
  example?: string;
}

export interface CustomSet {
  id: string;
  title: string;
  emoji: string;
  words: CustomWord[];
}

const STORAGE_KEY = 'dutch-custom-sets-v1';

function load(): CustomSet[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function save(sets: CustomSet[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sets)); } catch {}
}

export function useCustomSets() {
  const [sets, setSets] = useState<CustomSet[]>(load);

  const createSet = useCallback((title: string, emoji: string): CustomSet => {
    const newSet: CustomSet = { id: Date.now().toString(), title, emoji, words: [] };
    setSets(prev => { const next = [...prev, newSet]; save(next); return next; });
    return newSet;
  }, []);

  const deleteSet = useCallback((id: string) => {
    setSets(prev => { const next = prev.filter(s => s.id !== id); save(next); return next; });
  }, []);

  const addWordToSet = useCallback((setId: string, word: CustomWord) => {
    setSets(prev => {
      const next = prev.map(s =>
        s.id === setId ? { ...s, words: [...s.words, word] } : s
      );
      save(next);
      return next;
    });
  }, []);

  const removeWordFromSet = useCallback((setId: string, dutch: string) => {
    setSets(prev => {
      const next = prev.map(s =>
        s.id === setId ? { ...s, words: s.words.filter(w => w.dutch !== dutch) } : s
      );
      save(next);
      return next;
    });
  }, []);

  const updateSet = useCallback((setId: string, patch: Partial<Pick<CustomSet, 'title' | 'emoji'>>) => {
    setSets(prev => {
      const next = prev.map(s => s.id === setId ? { ...s, ...patch } : s);
      save(next);
      return next;
    });
  }, []);

  return { sets, createSet, deleteSet, addWordToSet, removeWordFromSet, updateSet };
}
