import { GlobalStyle } from '@class101/ui';
import React from 'react';
import styled from 'styled-components';

import { initI18n } from '../i18n';
import GlobalPageStyle from '../utils/GlobalPageStyle';
import Footer from './Footer';
import Header from './Header';

initI18n();

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = props => {
  const { children } = props;
  return (
    <Root className="root">
      <GlobalPageStyle />
      <GlobalStyle />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Root>
  );
};

const Root = styled.div``;
const Main = styled.main`
  padding-top: 56px;
`;

export default Layout;
