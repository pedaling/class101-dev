/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */
import { Body2, Headline3 } from '@class101/ui';
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { User } from '../graphql-types';

interface Props {
  user: User;
}

const Bio: React.SFC<Props> = (props) => {
  const { name, profileImage, description, slug } = props.user;

  return (
    <BioContainer to={slug}>
      <BioImage src={profileImage} />
      <BioBody>
        <Headline3>{name}</Headline3>
        <Body2>{description}</Body2>
      </BioBody>
    </BioContainer>
  );
};

const BioContainer = styled(Link)`
  display: block;
  max-width: 960px;
  margin: 16px auto;
  background: white;
  align-items: center;
  padding: 32px;
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
`;

const BioBody = styled.div``;

// const bioQuery = graphql`
//   query BioQuery {
//     site {
//       siteMetadata {
//         author
//         social {
//           twitter
//         }
//       }
//     }
//   }
// `

export default Bio;
