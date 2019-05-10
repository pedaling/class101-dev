/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import styled from 'styled-components';
import users from '../utils/users';

const Bio = ({ userName }) => {
  const { name, profileImage, github, description } = users.find(
    user => user.name === userName
  );

  return (
    <BioContainer>
      <img
        src={profileImage}
        style={{ width: '100px', height: '100px', borderRadius: '100px' }}
      />
      <h3>{name}</h3>
      <p>{description}</p>
      <a href={github} target="_blank">
        Github
      </a>
    </BioContainer>
  );
};

const BioContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  border: #333 solid 1px;
  padding: 16px;
  box-sizing: border-box;
`;

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
