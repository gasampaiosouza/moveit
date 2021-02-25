import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import style from '../styles/components/completedChallenges.module.scss';

const CompletedChallenges: React.FC = () => {
  const { completedChallenges } = useContext(ChallengesContext);

  return (
    <div className={style.completedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{completedChallenges}</span>
    </div>
  )
}

export default CompletedChallenges;