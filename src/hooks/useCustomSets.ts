import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export interface CustomWord {
  dutch: string;
  english: string;
  example?: string;
  article?: 'de' | 'het';
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
function saveLocal(sets: CustomSet[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sets)); } catch {}
}

export function useCustomSets() {
  const { user } = useAuth();
  const [sets, setSets] = useState<CustomSet[]>(load);

  // ── Load from Supabase on login and merge with localStorage ─────────────────
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const { data } = await supabase
          .from('user_stats')
          .select('custom_sets')
          .eq('user_id', user.id)
          .maybeSingle();

        if (data?.custom_sets && Array.isArray(data.custom_sets) && data.custom_sets.length > 0) {
          // Supabase is source of truth — merge: keep local sets not in Supabase, add remote ones
          const remote = data.custom_sets as CustomSet[];
          const local = load();
          const remoteIds = new Set(remote.map((s: CustomSet) => s.id));
          const localOnly = local.filter(s => !remoteIds.has(s.id));
          const merged = [...remote, ...localOnly];
          setSets(merged);
          saveLocal(merged);
        } else {
          // Nothing in Supabase yet — push local sets up
          const local = load();
          if (local.length > 0) {
            await supabase.from('user_stats').upsert(
              { user_id: user.id, custom_sets: local, updated_at: new Date().toISOString() },
              { onConflict: 'user_id' }
            );
          }
        }
      } catch (e) {
        console.error('[customSets] sync error:', e);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // ── Sync to Supabase whenever sets change ───────────────────────────────────
  function syncToSupabase(next: CustomSet[]) {
    saveLocal(next);
    if (user) {
      supabase.from('user_stats').upsert(
        { user_id: user.id, custom_sets: next, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      ).then(({ error }) => { if (error) console.error('[customSets] upsert error:', error); });
    }
  }

  const createSet = useCallback((title: string, emoji: string): CustomSet => {
    const newSet: CustomSet = { id: Date.now().toString(), title, emoji, words: [] };
    setSets(prev => { const next = [...prev, newSet]; syncToSupabase(next); return next; });
    return newSet;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const deleteSet = useCallback((id: string) => {
    setSets(prev => { const next = prev.filter(s => s.id !== id); syncToSupabase(next); return next; });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addWordToSet = useCallback((setId: string, word: CustomWord) => {
    setSets(prev => {
      const next = prev.map(s => s.id === setId ? { ...s, words: [...s.words, word] } : s);
      syncToSupabase(next);
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const removeWordFromSet = useCallback((setId: string, dutch: string) => {
    setSets(prev => {
      const next = prev.map(s => s.id === setId ? { ...s, words: s.words.filter(w => w.dutch !== dutch) } : s);
      syncToSupabase(next);
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateWordInSet = useCallback((setId: string, oldDutch: string, updated: CustomWord) => {
    setSets(prev => {
      const next = prev.map(s =>
        s.id === setId ? { ...s, words: s.words.map(w => w.dutch === oldDutch ? updated : w) } : s
      );
      syncToSupabase(next);
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateSet = useCallback((setId: string, patch: Partial<Pick<CustomSet, 'title' | 'emoji'>>) => {
    setSets(prev => {
      const next = prev.map(s => s.id === setId ? { ...s, ...patch } : s);
      syncToSupabase(next);
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { sets, createSet, deleteSet, addWordToSet, removeWordFromSet, updateWordInSet, updateSet };
}
