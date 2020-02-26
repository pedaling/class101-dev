import { Avatar, Body2, TextStyles } from '@class101/ui';
import { t } from 'i18next';
import kebabCase from 'lodash/kebabCase';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Author } from '../graphql-types';
import LinkWithLang from './LinkWithLang';

interface Props {
  author: Author;
  className?: string;
}

const FullAnchorAuthor: React.FC<Props> = ({ author, className }) => {
  const { t } = useTranslation();

  return (
    <AvatarWrapper
      to={`/authors/${kebabCase(author?.id)}`}
      className={className}
    >
      <Avatar
        size={64}
        src={author?.profileImage}
        text={t(`profile.name.${author?.id}`)}
      />
      <AvatarTitle>{t(`profile.name.${author?.id}`)}</AvatarTitle>
      <Body2>{author?.description}</Body2>
      {author.blog && author.blog !== '' && (
        <SocialIcon href={author.blog} target="_blank">
          <img src="/images/blog-64x64.png" alt="blog" />
        </SocialIcon>
      )}
      {author.github && author.github !== '' && (
        <SocialIcon href={author.github} target="_blank">
          <img src="/images/github-64x64.png" alt="github" />
        </SocialIcon>
      )}
      {author.linkedin && author.linkedin !== '' && (
        <SocialIcon href={author.linkedin} target="_blank">
          <img src="/images/linkedin-64x64.png" alt="linkedin" />
        </SocialIcon>
      )}
    </AvatarWrapper>
  );
};
export default FullAnchorAuthor;

const AvatarWrapper = styled(LinkWithLang)`
  text-align: center;
  display: block;
  text-decoration: none;
  &:hover {
    color: inherit;
  }
`;

const AvatarTitle = styled.div`
  ${TextStyles.subtitle2};
  margin: 8px 0;
`;

const SocialIcon = styled.a`
  display: inline-block;
  margin: 8px;
  img {
    margin: 8px 4px 0px 0px;
    width: 24px;
  }
`;
