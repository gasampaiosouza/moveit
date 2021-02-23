import { useState, useEffect } from 'react';
import style from '../styles/components/Countdown.module.scss';

const Countdown: React.FC = () => {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const getSplitedTime = (time: number | string) => {
    return String(time).padStart(2, '0').split('');
  }

  const [minuteLeft, minuteRight] = getSplitedTime(minutes);
  const [secondLeft, secondRight] = getSplitedTime(seconds);

  useEffect(() => {
    if (!active || time <= 0) return;

    setTimeout(() => setTime(time - 1), 1000);
  }, [active, time]);

  const startCountdown = () => {
    setActive(true);
  };

  return (
    <div>
      <div className={style.countdownContainer}>
        <div className={style.firstHalf}>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span className={style.colon}>:</span>

        <div className={style.secondHalf}>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      <button className={style.countdownButton} onClick={startCountdown}>
        Iniciar um ciclo
      </button>
    </div>
  );
};

export default Countdown;
