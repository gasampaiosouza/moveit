import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import style from '../styles/components/ChallengeBox.module.scss';

const ChallengeBox: React.FC = () => {
  const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

  return (
    <div className={style.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={style.active}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="body" />

            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              className={style.challengeFailedButton}
              onClick={resetChallenge}
            >
              Falhei
            </button>
            <button className={style.challengeSucceededButton}>
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={style.notActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>

          <p className={style.description}>
            <img src="icons/level-up.svg" alt="level up" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  );
};

export default ChallengeBox;
