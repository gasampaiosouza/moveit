import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import style from '../styles/components/experienceBar.module.scss';

const ExperienceBar: React.FC = () => {
  const { currentXP, experienceToNextLevel } = useContext(ChallengesContext);

  const percentToNextLevel = Math.round((currentXP * 100) / experienceToNextLevel) ?? 0;

  return (
    <header className={style.experienceBar}>
      <span className={style.initialValue}>0 xp</span>

      <div className={style.completed}>
        <div className={style.fill} style={{ width: `${percentToNextLevel}%` }} />

        <span className={style.currentExperience} style={{ left: `${percentToNextLevel}%` }}>{currentXP}xp</span>
      </div>

      <span className={style.finalValue}>{experienceToNextLevel} xp</span>
    </header>
  )
}

export default ExperienceBar;