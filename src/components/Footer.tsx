import React from 'react';
import styled from 'styled-components';

export default class Footer extends React.Component {
  public render() {
    return (
      <Container>
        <InnerContainer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </InnerContainer>
      </Container>
    );
  }
}

const Container = styled.footer`
  background-color: rgb(27, 28, 29);
  color: white;
  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      color: inherit;
      font-weight: 800;
    }
  }
`;

const InnerContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 32px;
`;
