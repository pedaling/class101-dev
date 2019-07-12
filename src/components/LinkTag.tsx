import { Colors } from '@class101/ui';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import React from 'react';
import styled from 'styled-components';

interface Props {
  fieldValue: string;
  totalCount?: number;
}

const LinkTag: React.SFC<Props> = ({ fieldValue, totalCount }) => {
  return (
    <StyledLink to={`/tags/${kebabCase(fieldValue)}/`} key={fieldValue}>
      {fieldValue} {totalCount > 0 && `(${totalCount})`}
    </StyledLink>
  );
};

export default LinkTag;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${Colors.gray800};
  background: ${Colors.gray100};
  font-size: 16px;
  padding: 4px 8px;
  margin: 4px;
  border-radius: 3px;
  margin: 16px 16px 16px 0;

  &:hover {
    color: ${Colors.orange600};
    background: ${Colors.black};
  }
`;
