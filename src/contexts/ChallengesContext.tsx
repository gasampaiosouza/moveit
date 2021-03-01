import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import LevelUpModal from '../components/LevelUpModal';

interface IChallengesProvider {
  children: ReactNode;
  level: number;
  currentXP: number;
  completedChallenges: number;
}

type Challenge = { type: 'body' | 'eye'; description: string; amount: number };

interface ChallengesContextData {
  startNewChallenge: () => void;
  levelUp: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
  level: number;
  currentXP: number;
  experienceToNextLevel: number;
  completedChallenges: number;
  activeChallenge: Challenge;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: IChallengesProvider) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentXP, setCurrentXP] = useState(rest.currentXP ?? 0);
  const [completedChallenges, setCompletedChallenges] = useState(
    rest.completedChallenges ?? 0
  );

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentXP', String(currentXP));
    Cookies.set('completedChallenges', String(completedChallenges));
  }, [level, currentXP, completedChallenges]);

  const levelUp = () => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  };

  const closeLevelUpModal = () => setIsLevelUpModalOpen(false);

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`,
      });
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
  };

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
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
