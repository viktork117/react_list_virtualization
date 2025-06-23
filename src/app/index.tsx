import { type FC } from 'react';

import { Header, Main, Wrapper } from '@/components';

import './style.css';

const App: FC = () => {
  return (
    <Wrapper>
      <Header />
      <Main />
    </Wrapper>
  )
};

export default App
