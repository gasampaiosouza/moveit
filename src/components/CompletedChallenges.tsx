import style from '../styles/components/completedChallenges.module.scss';

const CompletedChallenges: React.FC = () => {
  return (
    <div className={style.completedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>5</span>
    </div>
  )
}

export default CompletedChallenges;