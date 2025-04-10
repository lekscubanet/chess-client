import { useRef } from 'react';

const useSound = (soundUrl: string) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    return () => {
        if (!audioRef.current) {
            audioRef.current = new Audio(soundUrl);
            audioRef.current.preload = 'auto';
        }

        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => {
            console.error('Ошибка воспроизведения звука:', e);
        });
    };


};

export default useSound;