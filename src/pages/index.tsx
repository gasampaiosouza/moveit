import cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ChallengeBox from '../components/ChallengeBox';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import style from '../styles/pages/Home.module.scss';

interface IHome {
  level: number;
  currentXP: number;
  completedChallenges: number;
}

const App: React.FC<IHome> = (props) => {
  const user = cookies.getJSON('user');
  const router = useRouter();

  const resetUserScore = () => {
    cookies.set('level', '1');
    cookies.set('currentXP', '0');
    cookies.set('completedChallenges', '0');
  };

  useEffect(() => {
    if (!user || !user.isLoggedIn) {
      resetUserScore();
      router.replace('/login');
      return;
    }
  }, []);

  return user ? (
    <ChallengesProvider
      level={props.level}
      currentXP={props.currentXP}
      completedChallenges={props.completedChallenges}
    >
      <div className={style.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div className={style.leftContainer}>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  ) : <h1 className="loading">Carregando...</h1>;
};

export default App;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentXP, completedChallenges } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentXP: Number(currentXP),
      completedChallenges: Number(completedChallenges),
    },
  };
};
