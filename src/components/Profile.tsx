import cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { IUser } from '../interfaces';
import style from '../styles/components/Profile.module.scss';

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<IUser>(null);
  const { level } = useContext(ChallengesContext);

  useEffect(() => {
    const user = cookies.getJSON('user');
    if (!user) return null;

    return setUserInfo(user);
  }, []);

  return (
    userInfo && (
      <div className={style.profileContainer}>
        <img className={style.userPicture} src={userInfo.avatar_url} alt={userInfo.name} />

        <div className={style.userInfo}>
          <strong className={style.userName}>{userInfo.name}</strong>
          <p className={style.userLevel}>
            <img src="icons/level.svg" alt="Level icon" className={style.icon} />
            Level {level}
          </p>
        </div>
      </div>
    )
  );
};

export default Profile;
