import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import style from '../styles/components/Countdown.module.scss';

const Countdown: React.FC = () => {
  const {
    hasFinished,
    isActive,
    minutes,
    seconds,
    resetCountdown,
    startCountdown,
    parseCurrentTime
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = parseCurrentTime(minutes).split('');
  const [secondLeft, secondRight] = parseCurrentTime(seconds).split('');

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
          Ciclo encerrado{' '}
          <Icon icon={faCheckCircle} className={style.doneIcon} />
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
