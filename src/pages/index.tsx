import { GetServerSideProps } from 'next';
import Head from 'next/head';
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
  return (
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
  );
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
