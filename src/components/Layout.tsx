import React from 'react';
import styled from 'styled-components';

import { initI18n } from '../i18n';
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
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Root>
  );
};

const Root = styled.div``;
const Main = styled.main`
  padding-top: 59px;
`;

export default Layout;
