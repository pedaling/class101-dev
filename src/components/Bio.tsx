import { Body2, Headline3, Colors, TextStyles } from '@class101/ui';
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { User } from '../graphql-types';
import kebabCase from 'lodash/kebabCase';

interface Props {
  user: User;
}

const Bio: React.SFC<Props> = props => {
  const { name, profileImage, description, blog, github, linkedin } = props.user;

  return (
    <BioContainer>
      <BioImage src={profileImage} />
      <BioBody>
        <Username to={`/authors/${kebabCase(name)}`}>{name}</Username>
        <Body2>{description}</Body2>
        {blog && blog !== '' && (
          <SocialIcon href={blog} target="_blank">
            <img src="/images/blog-64x64.png" alt="blog" />
          </SocialIcon>
        )}
        {github && github !== '' && (
          <SocialIcon href={github} target="_blank">
            <img src="/images/github-64x64.png" alt="github" />
          </SocialIcon>
        )}
        {linkedin && linkedin !== '' && (
          <SocialIcon href={linkedin} target="_blank">
            <img src="/images/linkedin-64x64.png" alt="linkedin" />
          </SocialIcon>
        )}
      </BioBody>
    </BioContainer>
  );
};

const BioContainer = styled.div`
  margin: 32px 0;
  display: block;
  background: white;
  align-items: center;
  display: flex;
  text-decoration: none;
  &:hover {
    color: inherit;
  }
`;

const BioImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 32px;
  object-fit: cover;
  @media (max-width: 425px) {
    width: 100px;
    height: 100px;
    margin-right: 16px;
  }
`;

const BioBody = styled.div``;

const Username = styled(Link)`
  ${TextStyles.subtitle1};
  display: block;
  text-decoration: none;
  margin-bottom: 4px;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcon = styled.a`
  img {
    margin: 8px 4px 0px 0px;
    width: 24px;
  }
`;

export default Bio;
