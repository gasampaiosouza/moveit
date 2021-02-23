import React from 'react';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import style from '../styles/pages/Home.module.scss';
import Countdown from '../components/Countdown';

import Head from 'next/head';

const App: React.FC = () => {
  return (
    <div className={style.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>

      <ExperienceBar />

      <section>
        <div className={style.leftContainer}>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>

        <div></div>
      </section>
    </div>
  );
};

export default App;
