import { useState, useRef, useCallback } from 'react';
import { transcribeFetch } from '@/lib/ai';

export type RecordState = 'idle' | 'recording' | 'transcribing' | 'done' | 'error';

interface UseWhisperRecorderOptions {
  onTranscript: (text: string) => void;
}

export function useWhisperRecorder({ onTranscript }: UseWhisperRecorderOptions) {
  const [recordState, setRecordState] = useState<RecordState>('idle');
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = useCallback(async () => {
    setError(null);
    setRecordState('recording');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Pick best supported format — Whisper accepts webm, ogg, mp4
      const mimeType =
        MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' :
        MediaRecorder.isTypeSupported('audio/webm')             ? 'audio/webm' :
        MediaRecorder.isTypeSupported('audio/mp4')              ? 'audio/mp4'  :
        'audio/ogg';

      const recorder = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        streamRef.current?.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunksRef.current, { type: mimeType });
        await transcribe(blob, mimeType);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
    } catch {
      setError('Microphone access denied. Please allow microphone in your browser settings.');
      setRecordState('error');
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecordState('transcribing');
    }
  }, []);

  async function transcribe(blob: Blob, mimeType: string) {
    try {
      const ext = mimeType.includes('mp4') ? 'mp4' : mimeType.includes('ogg') ? 'ogg' : 'webm';
      const formData = new FormData();
      formData.append('file', new File([blob], `recording.${ext}`, { type: mimeType }));
      formData.append('language', 'en'); // English — improves accuracy significantly

      const res = await transcribeFetch(formData);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error((errData as { error?: { message?: string } }).error?.message || `Whisper error ${res.status}`);
      }

      const data = await res.json() as { text: string };
      onTranscript(data.text.trim());
      setRecordState('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Transcription failed. Try again.');
      setRecordState('error');
    }
  }

  function reset() {
    setRecordState('idle');
    setError(null);
    chunksRef.current = [];
  }

  return { recordState, error, startRecording, stopRecording, reset };
}
