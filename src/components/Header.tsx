import { BreakPoints, ElevationStyles, TextStyles } from '@class101/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';

import LinkWithLang from './LinkWithLang';
import SearchInput from './SearchInput';

const Header: React.FC = () => {
  const translation = useTranslation();
  return (
    <NavConatiner>
      <NavInnerContainer>
        <NoHoverLink to={`/`}>
          <LogoIcon
            src="https://class101.net/images/class101-main-logo.svg"
            alt="class101"
          />
        </NoHoverLink>
        <ExternalNavLink href="https://www.rocketpunch.com/companies/class101/jobs">
          {translation.t('recruiting')}
        </ExternalNavLink>
        <NavLinkWithLang to={`/authors`}>
          {translation.t('members')}
        </NavLinkWithLang>
        <ExternalNavLink href={`/ko/`}>한글</ExternalNavLink>
        <ExternalNavLink href={`/en/`}>English</ExternalNavLink>
        <SearchInput />
      </NavInnerContainer>
    </NavConatiner>
  );
};

export default Header;

const NavConatiner = styled.nav`
  position: fixed;
  width: 100%;
  padding: 8px 0px;
  background-color: white;
  z-index: 1000;
  ${ElevationStyles.elevation2};
`;

const NavInnerContainer = styled.div`
  max-width: ${BreakPoints.SIZES.lg.minWidth}px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoIcon = styled.img`
  display: block;
  height: 30px;
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

const navLinkCss = css`
  ${TextStyles.body2};
  display: block;
  text-decoration: none;
  &:hover {
    color: inherit;
    text-decoration: underline;
  }
  ${BreakPoints.media.sm`
    display: none;
  `}
`;

const NavLinkWithLang = styled(LinkWithLang)`
  ${navLinkCss};
`;

const ExternalNavLink = styled.a`
  ${navLinkCss};
`;
