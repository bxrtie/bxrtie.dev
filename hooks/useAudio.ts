import { useCallback, useRef } from 'react';

export const useAudio = () => {
  const audioContext = useRef<AudioContext | null>(null);
  const masterGain = useRef<GainNode | null>(null);

  const initAudio = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      masterGain.current = audioContext.current.createGain();
      masterGain.current.gain.value = 0.3; // Master volume
      masterGain.current.connect(audioContext.current.destination);
    }
    if (audioContext.current.state === 'suspended') {
      audioContext.current.resume();
    }
  }, []);

  const playHover = useCallback(() => {
    initAudio();
    if (!audioContext.current || !masterGain.current) return;

    const osc = audioContext.current.createOscillator();
    const gain = audioContext.current.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, audioContext.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, audioContext.current.currentTime + 0.05);

    gain.gain.setValueAtTime(0.05, audioContext.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(masterGain.current);

    osc.start();
    osc.stop(audioContext.current.currentTime + 0.05);
  }, [initAudio]);

  const playClick = useCallback(() => {
    initAudio();
    if (!audioContext.current || !masterGain.current) return;

    const osc = audioContext.current.createOscillator();
    const gain = audioContext.current.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, audioContext.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioContext.current.currentTime + 0.1);

    gain.gain.setValueAtTime(0.1, audioContext.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(masterGain.current);

    osc.start();
    osc.stop(audioContext.current.currentTime + 0.1);
  }, [initAudio]);

  const playKeystroke = useCallback(() => {
    initAudio();
    if (!audioContext.current || !masterGain.current) return;

    const osc = audioContext.current.createOscillator();
    const gain = audioContext.current.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800 + Math.random() * 200, audioContext.current.currentTime);
    
    gain.gain.setValueAtTime(0.02, audioContext.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(masterGain.current);

    osc.start();
    osc.stop(audioContext.current.currentTime + 0.03);
  }, [initAudio]);

  const playOn = useCallback(() => {
    initAudio();
    if (!audioContext.current || !masterGain.current) return;
    
    const osc = audioContext.current.createOscillator();
    const gain = audioContext.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, audioContext.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioContext.current.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0, audioContext.current.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, audioContext.current.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(masterGain.current);
    
    osc.start();
    osc.stop(audioContext.current.currentTime + 0.3);
  }, [initAudio]);

  return { playHover, playClick, playKeystroke, playOn };
};