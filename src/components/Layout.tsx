import '../utils/i18n';

import React from 'react';
import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';

interface Props {
  children: JSX.Element[];
}

const Layout: React.SFC<Props> = props => {
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
  padding: 32px 0;
`;

export default Layout;
