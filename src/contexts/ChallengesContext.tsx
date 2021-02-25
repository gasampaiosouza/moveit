import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

interface IChallengesProvider {
  children: ReactNode;
}

type Challenge = { type: 'body' | 'eye'; description: string; amount: number };

interface ChallengesContextData {
  startNewChallenge: () => void;
  levelUp: () => void;
  resetChallenge: () => void;
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

  const levelUp = () => setLevel(level + 1);

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  };

  const resetChallenge = () => setActiveChallenge(null);

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
        resetChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
