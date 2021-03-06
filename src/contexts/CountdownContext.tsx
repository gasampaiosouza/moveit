import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import setPageTitle from '../helpers/setPageTitle';
import { ChallengesContext } from './ChallengesContext';

interface ICountdownProvider {
  children: ReactNode;
}

interface CountdownContextData {
  startCountdown: () => void;
  resetCountdown: () => void;
  parseCurrentTime: (time: number | string) => string;
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: ICountdownProvider) {
  const { startNewChallenge } = useContext(ChallengesContext);
  const initialTime = 0.15 * 60;
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const parseCurrentTime = (time: number | string) => {
    return String(time).padStart(2, '0');
  };

  useEffect(() => {
    if (!isActive) return;

    if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
      setPageTitle('Início | Novo desafio!');

      return;
    }

    setPageTitle(
      `Início | ${parseCurrentTime(minutes)}:${parseCurrentTime(seconds)}`
    );

    countdownTimeout = setTimeout(() => {
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
        parseCurrentTime,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
