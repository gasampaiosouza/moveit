import { useState, useEffect, useContext } from 'react';
import style from '../styles/components/Countdown.module.scss';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { ChallengesContext } from '../contexts/ChallengesContext';

let countdownTimeout: NodeJS.Timeout;

const Countdown: React.FC = () => {
  const { startNewChallenge } = useContext(ChallengesContext);
  const initialTime = 0.05 * 60;
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const parseCurrentTime = (time: number | string) => {
    return String(time).padStart(2, '0');
  };

  const [minuteLeft, minuteRight] = parseCurrentTime(minutes).split('');
  const [secondLeft, secondRight] = parseCurrentTime(seconds).split('');

  useEffect(() => {
    if (!isActive) return;
    else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
      
      return;
    }

    countdownTimeout = setTimeout(() => {
      // document.title = `move.it | ${parseCurrentTime(minutes)}:${parseCurrentTime(seconds)}`;
      setTime(time - 1);
    }, 1000);
  }, [isActive, time]);

  const startCountdown = () => setIsActive(true);

  const resetCountdown = () => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(initialTime);
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

      {hasFinished ? (
        <button disabled className={style.countdownButton}>
          Ciclo encerrado <Icon icon={faCheckCircle} className={style.doneIcon} />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              className={`${style.countdownButton} ${style.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button className={style.countdownButton} onClick={startCountdown}>
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Countdown;
