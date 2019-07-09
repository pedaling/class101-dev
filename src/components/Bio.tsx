/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import styled from 'styled-components';
import authors from '../utils/authors';
import { ElevationStyles, Headline3, Body2 } from '@class101/ui';

const Bio = ({ userName }: any) => {
  const { name, profileImage, github, description } = authors.find(
    user => user.name === userName
  );
  console.log(profileImage)

  return (
    <BioContainer>
      <BioImage
        src={profileImage}
      />
      <BioBody>
        <Headline3>{name}</Headline3>
        <Body2>{description}</Body2>
      </BioBody>
    </BioContainer>
  );
};

const BioContainer = styled.div`
  max-width: 760px;
  margin: 16px auto;
  background: white;
  align-items: center;
  padding: 32px;
  display: flex;
  ${ElevationStyles.elevation2};
`;

const BioImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 32px;
`

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
