import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

interface IChallengesProvider {
  children: ReactNode;
}

type Challenge = { type: 'body' | 'eye'; description: string; amount: number };

interface ChallengesContextData {
  startNewChallenge: () => void;
  levelUp: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  level: number;
  currentXP: number;
  experienceToNextLevel: number;
  completedChallenges: number;
  activeChallenge: Challenge;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: IChallengesProvider) {
  const [level, setLevel] = useState(1);
  const [currentXP, setCurrentXP] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  const levelUp = () => setLevel(level + 1);

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  };

  const resetChallenge = () => setActiveChallenge(null);

  const completeChallenge = () => {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;
    let finalXP = currentXP + amount;
    const hasLeveledUp = finalXP >= experienceToNextLevel;

    if (hasLeveledUp) {
      finalXP -= experienceToNextLevel;
      levelUp();
    }

    setCurrentXP(finalXP);
    setActiveChallenge(null);
    setCompletedChallenges(completedChallenges + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        startNewChallenge,
        level,
        levelUp,
        currentXP,
        completedChallenges,
        activeChallenge,
        experienceToNextLevel,
        resetChallenge,
        completeChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
