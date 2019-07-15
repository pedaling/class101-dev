import React from 'react';
import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';

interface Props {
  children: JSX.Element[];
  shareUrl?: string;
}

class Layout extends React.Component<Props> {
  render() {
    const { children, shareUrl } = this.props;

    return (
      <Root className="root">
        <Header />
        <Main>{children}</Main>
        <Footer shareUrl={shareUrl}/>
      </Root>
    );
  }
}

const Root = styled.div``;
const Main = styled.main`
  padding: 32px 0;
`;

export default Layout;
