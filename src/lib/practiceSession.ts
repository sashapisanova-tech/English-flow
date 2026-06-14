import { supabase } from './supabase';

export interface PracticeSessionRow {
  id?: string;
  user_id: string;
  created_at?: string;
  task_type: 'translate' | 'dialogue';
  level: string;
  grammar_focus?: string | null;
  easy_count: number;
  hard_count: number;
  correct_count: number;
  session_length: number;
  hard_grammar_targets: string[];
}

export type PracticeSessionInsert = Omit<PracticeSessionRow, 'id' | 'created_at'>;

export async function savePracticeSession(data: PracticeSessionInsert): Promise<void> {
  try {
    await supabase.from('practice_sessions').insert(data);
  } catch { /* silently fail — never block the user */ }
}

export async function getRecentSessions(userId: string, limit = 20): Promise<PracticeSessionRow[]> {
  const { data } = await supabase
    .from('practice_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data ?? []) as PracticeSessionRow[];
}
