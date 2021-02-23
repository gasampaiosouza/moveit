import style from '../styles/components/experienceBar.module.scss';

const ExperienceBar: React.FC = () => {
  return (
    <header className={style.experienceBar}>
      <span className={style.initialValue}>0 xp</span>

      <div className={style.completed}>
        <div className={style.fill} style={{ width: '60%' }} />

        <span className={style.currentExperience} style={{ left: '60%' }}>360xp</span>
      </div>

      <span className={style.finalValue}>600 xp</span>
    </header>
  )
}

export default ExperienceBar;