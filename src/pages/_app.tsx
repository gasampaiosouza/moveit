import React from 'react';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import '../styles/_globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp;
