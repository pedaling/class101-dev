import { Avatar, TextStyles } from '@class101/ui';
import { t } from 'i18next';
import kebabCase from 'lodash/kebabCase';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Author } from '../graphql-types';
import LinkWithLang from './LinkWithLang';

interface Props {
  author: Author;
}

const AnchorAuthor: React.FC<Props> = ({ author }) => {
  const { t } = useTranslation();

  return (
    <AvatarWrapper to={`/authors/${kebabCase(author?.id)}`}>
      <Avatar
        src={author?.profileImage}
        text={t(`profile.name.${author?.id}`)}
      />
      <AvatarText>{t(`profile.name.${author?.id}`)}</AvatarText>
    </AvatarWrapper>
  );
};
export default AnchorAuthor;

const AvatarWrapper = styled(LinkWithLang)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const AvatarText = styled.div`
  ${TextStyles.caption1};
  margin-left: 6px;
`;
