import { Button, ButtonSize } from '@class101/ui';
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
    <Anchor to={`/tags/${kebabCase(fieldValue)}/`} key={fieldValue}>
      <Button size={ButtonSize.SMALL}>
        # {getTagText(fieldValue)} {totalCount > 0 && `(${totalCount})`}
      </Button>
    </Anchor>
  );
};

export default LinkTag;

const Anchor = styled(LinkWithLang)`
  display: inline-block;
  text-decoration: none;
  margin: 16px 8px 16px 0px;
  &:hover {
    color: inherit;
  }
`;
