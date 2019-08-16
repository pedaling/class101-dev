import { Colors } from '@class101/ui';
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

interface Props {
  numPages: number;
  currentPage: number;
  language: string;
}

const Paginator: React.SFC<Props> = ({ numPages, language }) => {
  const links = [];
  for (const i = 0; i < numPages; i += 1) {
    links.push(
      <PaginationLink key={i} to={`/${language}/${i === 0 ? '/' : `/blog/${i + 1}`}`} activeClassName="active">
        {i + 1}
      </PaginationLink>
    );
  }

  return <PaginationWrapper>{links}</PaginationWrapper>;
};

export default Paginator;

const PaginationWrapper = styled.div`
  text-align: center;
`;

const PaginationLink = styled(Link)`
  padding: 8px 14px;
  margin: 4px;
  text-decoration: none;
  color: ${Colors.orange500};
  background: white;
  border-radius: 4px;
  &.active {
    color: white;
    background: ${Colors.orange500};
  }
  &:hover {
    background: ${Colors.orange200};
  }
`;
