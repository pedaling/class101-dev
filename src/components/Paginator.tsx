import { Button, ButtonColor, ButtonSize } from '@class101/ui';
import React from 'react';
import styled from 'styled-components';

import LinkWithLang from './LinkWithLang';

interface Props {
  numPages: number;
  currentPage: number;
}

const Paginator: React.FC<Props> = ({ numPages, currentPage }) => {
  const links = [];
  for (let i = 0; i < numPages; i += 1) {
    links.push(
      <Anchor
        key={i}
        className={i === currentPage - 1 ? 'active' : ''}
        to={`/${i === 0 ? '/' : `/blog/${i + 1}`}`}
      >
        <Button
          color={
            i === currentPage - 1 ? ButtonColor.ORANGE : ButtonColor.DEFAULT
          }
          size={ButtonSize.XSMALL}
        >
          {i + 1}
        </Button>
      </Anchor>
    );
  }

  return <PaginationWrapper>{links}</PaginationWrapper>;
};

export default Paginator;

const PaginationWrapper = styled.div`
  text-align: center;
`;

const Anchor = styled(LinkWithLang)`
  padding: 8px 14px;
  margin: 4px;
  text-decoration: none;
  &:hover {
    color: inherit;
  }
`;
