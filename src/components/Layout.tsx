import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

interface Props {
  children: JSX.Element[]
}

class Layout extends React.Component<Props> {
  render() {
    const { children } = this.props;

    return (
      <Root className="root">
        <Header />
        <Main>
        {children}
        </Main>
        <Footer />
      </Root>
    );
  }
}

const Root = styled.div``;
const Main = styled.main`
  padding: 32px 0;
`

export default Layout;
