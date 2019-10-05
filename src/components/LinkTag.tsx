import { Colors } from '@class101/ui';
import kebabCase from 'lodash/kebabCase';
import React from 'react';
import styled from 'styled-components';

import getTagText from '../utils/getTagText';
import LinkWithLang from './LinkWithLang';

interface Props {
  fieldValue: string;
  totalCount?: number;
}

const LinkTag: React.FC<Props> = ({ fieldValue, totalCount }) => {
  return (
    <StyledLink to={`/tags/${kebabCase(fieldValue)}/`} key={fieldValue}>
      {getTagText(fieldValue)} {totalCount > 0 && `(${totalCount})`}
    </StyledLink>
  );
};

export default LinkTag;

const StyledLink = styled(LinkWithLang)`
  text-decoration: none;
  color: ${Colors.gray800};
  background: ${Colors.gray100};
  font-size: 16px;
  padding: 4px 8px;
  border-radius: 3px;
  display: inline-block;
  margin: 8px;

  &:hover {
    color: ${Colors.white};
    background: ${Colors.orange600};
  }
`;
