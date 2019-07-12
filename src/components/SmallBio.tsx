import { Body2 } from '@class101/ui';
import React from 'react';
import styled from 'styled-components';

import authors from '../utils/authors';

const SmallBio = ({ authorName }: any) => {
  const { name, profileImage, description } = authors.find(author => author.name === authorName);
  return (
    <SmallBioContainer>
      <SmallBioImage src={profileImage} />
      <SmallBioBody>
        <SmallBioAuthorName>{name}</SmallBioAuthorName>
      </SmallBioBody>
    </SmallBioContainer>
  );
};

const SmallBioContainer = styled.div`
  align-items: center;
  display: flex;
`;

const SmallBioImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 16px;
`;

const SmallBioAuthorName = styled(Body2)``;

const SmallBioBody = styled.div``;

// const SmallBioQuery = graphql`
//   query SmallBioQuery {
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

export default SmallBio;
