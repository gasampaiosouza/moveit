import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ChallengesContext } from './ChallengesContext';

interface ICountdownProvider {
  children: ReactNode;
}

interface CountdownContextData {
  startCountdown: () => void;
  resetCountdown: () => void;
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: ICountdownProvider) {
  const { startNewChallenge } = useContext(ChallengesContext);
  const initialTime = 0.05 * 60;
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

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
    setHasFinished(false);
  };

  return (
    <CountdownContext.Provider
      value={{
        startCountdown,
        resetCountdown,
        minutes,
        seconds,
        hasFinished,
        isActive,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
