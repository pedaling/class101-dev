import React from 'react';
import styled from 'styled-components';

import i18n from '../utils/i18n';
import Footer from './Footer';
import Header from './Header';

interface Props {
  children: JSX.Element[];
  language: string;
}

const Layout: React.SFC<Props> = props => {
  const { children, language } = props;
  i18n.setLanguage(language);

  return (
    <Root className="root">
      <Header language={language} />
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
