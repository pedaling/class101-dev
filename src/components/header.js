import { Colors } from '@class101/ui';
import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

export default class Header extends React.Component {
  render() {
    return (
      <NavConatiner>
        <NoHoverLink to="/">
          <LogoIcon src="/images/ic-logo-black.png" alt="class101" />
        </NoHoverLink>
        <Spacer />
        <ul>
          <li>
            <NavLink to="/">
              블로그
            </NavLink>
          </li>
        </ul>
      </NavConatiner>
    );
  }
}

const NavConatiner = styled.nav`
  padding: 16px 24px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    padding: 0;
    margin: 0;
    flex: 0 1 auto;
    display: flex;
    justify-content: flex-end;
    flex-flow: row wrap;
    li {
      margin: 0;
      padding: 0;
      display: block;
      font-size: 14px;
      line-height: 24px;
      margin-left: 16px;
    }
  }
`;
const Spacer = styled.div`
  flex: 1;
`;

const LogoIcon = styled.img`
  width: 80px;
  margin: 0;
`;

const NoHoverLink = styled(Link)`
  box-shadow: none;
  &:hover {
    box-shadow: none;
    text-decoration: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  color: ${Colors.gray800};
  &:hover {
    color: ${Colors.gray500};
    text-decoration: none;
  }
`;
