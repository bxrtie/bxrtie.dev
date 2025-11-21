import React, { useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';

export const AudioController: React.FC = () => {
  const { playHover, playClick } = useAudio();

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea');
      if (interactive) {
        playHover();
      }
    };

    const handleClick = (e: MouseEvent) => {
       const target = e.target as HTMLElement;
       const interactive = target.closest('a, button, [role="button"], input, textarea');
       if (interactive) {
         playClick();
       }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, [playHover, playClick]);

  return null;
};