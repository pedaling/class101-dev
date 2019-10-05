import { Col, Colors, Grid, Icon, Row } from '@class101/ui';
import { Link } from 'gatsby';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';

import LinkWithLang from './LinkWithLang';
import SearchInput from './SearchInput';


const Header: React.FC = () => {
  const translation = useTranslation();

  const [menu, openMenu] = useState(false);
  const logo =
    typeof window !== 'undefined' && window.innerWidth > 425
      ? '/images/logotype-black.png'
      : '/images/symbol-black.png';

  const toggleMenu = () => openMenu(!menu);

  return (
    <NavConatiner>
      <Grid>
        <Row>
          <Col>
            <NavInnerContainer>
              <NoHoverLink to={`/`}>
                <LogoIcon src={logo} alt="class101" />
              </NoHoverLink>
              <SearchInput />
              <MenuContainer onClick={toggleMenu}>
                <Icon.Menu fillColor={Colors.gray600} />
                {menu && (
                  <NavLinkList>
                    <NavLinkWithLang to={`/tags/recruiting`}>{translation.t('recruiting')}</NavLinkWithLang>
                    <NavLinkWithLang to={`/authors`}>{translation.t('members')}</NavLinkWithLang>
                    <ExternalNavLink href="https://github.com/pedaling" target="_blank">
                      Github
                    </ExternalNavLink>
                    <ExternalNavLink href={`/en/`}>English</ExternalNavLink>
                    <ExternalNavLink href={`/ko/`}>한글</ExternalNavLink>
                  </NavLinkList>
                )}
              </MenuContainer>
            </NavInnerContainer>
          </Col>
        </Row>
      </Grid>
    </NavConatiner>
  );
};

export default Header;

const NavConatiner = styled.nav`
  padding: 16px 0px;
`;

const NavInnerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.img`
  display: block;
  height: 40px;
  width: auto;
  margin: 0;
`;

const NoHoverLink = styled(LinkWithLang)`
  box-shadow: none;
  &:hover {
    box-shadow: none;
    text-decoration: none;
  }
`;

const MenuContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const NavLinkList = styled.div`
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 1;
  top: 100%;
  right: 0;
`;

const navLinkCss = css`
  display: block;
  color: ${Colors.gray900};
  border: ${Colors.gray200} 1px solid;
  background: white;
  font-size: 16px;
  padding: 8px;
  margin: -1px;
  width: 100px;
  text-align: center;
  text-decoration: none;
  &:hover {
    color: ${Colors.gray500};
    text-decoration: underline;
  }
`;

const NavLinkWithLang = styled(LinkWithLang)`
  ${navLinkCss};
`;

const NavLink = styled(Link)`
  ${navLinkCss};
`;

const ExternalNavLink = styled.a`
  ${navLinkCss};
`;
