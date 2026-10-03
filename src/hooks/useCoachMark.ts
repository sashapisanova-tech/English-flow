import { useCallback, useEffect, useState } from 'react';
import { claimTip, releaseTip, subscribeTips, tipSeen, type TipKey } from '@/lib/coachMarks';

/** Shows the tip `key` once, when `when` is true and no other tip is showing. */
export function useCoachMark(key: TipKey, when: boolean) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!when) return;
    if (tipSeen(key)) return;
    const attempt = () => setShow(claimTip(key));
    attempt();
    const unsubscribe = subscribeTips(attempt);
    return () => {
      unsubscribe();
      releaseTip(key);
      setShow(false);
    };
  }, [key, when]);

  const dismiss = useCallback(() => {
    setShow(false);
    releaseTip(key);
  }, [key]);

  return { show: show && when, dismiss };
}
