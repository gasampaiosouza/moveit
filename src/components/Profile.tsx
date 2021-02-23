import style from '../styles/components/Profile.module.scss';

const Profile: React.FC = () => {
  return (
    <div className={style.profileContainer}>
      <img
        className={style.userPicture}
        src="https://github.com/gasampaiosouza.png"
        alt="Gabriel Sampaio"
      />

      <div>
        <strong className={style.userName}>Gabriel Sampaio</strong>
        <p className={style.userLevel}>
          <img src="icons/level.svg" alt="Level icon" className={style.icon} />
          Level 1
        </p>
      </div>
    </div>
  );
};

export default Profile;
