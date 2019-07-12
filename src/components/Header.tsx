import { Colors, ElevationStyles } from '@class101/ui';
import { Link } from 'gatsby';
import React from 'react';
import styled, { css } from 'styled-components';

export default class Header extends React.Component {
  render() {
    return (
      <NavConatiner>
        <NavInnerContainer>
          <NoHoverLink to="/">
            <LogoIcon src="/images/ic-logo-black.png" alt="class101" />
          </NoHoverLink>
          <Spacer />
          <NavLinkList>
            <NavLinkEl>
              <NavLink to="/tags/open-source">오픈 소스</NavLink>
            </NavLinkEl>
            <NavLinkEl>
              <NavLink to="/tags/careers">채용</NavLink>
            </NavLinkEl>
            <NavLinkEl>
              <ExternalNavLink href="https://github.com/pedaling" target="_blank">
                깃허브
              </ExternalNavLink>
            </NavLinkEl>
            <NavLinkEl>
              <NavLink to="/">블로그</NavLink>
            </NavLinkEl>
          </NavLinkList>
        </NavInnerContainer>
      </NavConatiner>
    );
  }
}

const NavConatiner = styled.nav`
  padding: 16px 24px;
  background: white;
`;

const NavInnerContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLinkList = styled.ul`
  padding: 0;
  margin: 0;
  flex: 0 1 auto;
  display: flex;
  justify-content: flex-end;
  flex-flow: row wrap;
`;

const NavLinkEl = styled.li`
  margin: 0;
  padding: 0;
  display: block;
  font-size: 14px;
  line-height: 24px;
  margin-left: 16px;
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

const navLinkCss = css`
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  color: ${Colors.gray800};
  text-decoration: none;

  &:hover {
    color: ${Colors.gray500};
    text-decoration: underline;
  }
`;
const NavLink = styled(Link)`
  ${navLinkCss};
`;

const ExternalNavLink = styled.a`
  ${navLinkCss};
`;
