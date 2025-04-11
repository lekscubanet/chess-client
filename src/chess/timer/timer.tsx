import { gameStatuses } from '../types';
import React, { useEffect, useState } from 'react';
import './timer.css';

interface TimerProps {
  playingTime: number | undefined;
  status: gameStatuses;
}

const Timer: React.FC<TimerProps> = ({ playingTime, status }) => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (status === 'PLAYING') {
      if (playingTime === undefined) {
        playingTime = 0;
      }

      const totalSeconds = Math.ceil(playingTime / 1000);

      setSeconds(totalSeconds);

      const interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <>
      <div className="timer">
        <p>
          {' '}
          {formatTime(minutes)}:{formatTime(remainingSeconds)}
        </p>
      </div>
    </>
  );
};

export default Timer;
