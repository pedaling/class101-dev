/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */
import React from 'react';
import styled from 'styled-components';

const src = 'https://utteranc.es/client.js';
const branch = 'master';
const repo = 'pedaling/class101-tech-comments';

class Comments extends React.Component {
  public containerRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    const utterances = document.createElement('script');
    const utterancesConfig = {
      src,
      repo,
      branch,
      async: 'true',
      'issue-term': 'pathname',
      crossorigin: 'anonymous',
    };
    for (const [key, value] of Object.entries(utterancesConfig)) {
      utterances.setAttribute(key, value);
    }

    this.containerRef.current.appendChild(utterances);
  }

  public render() {
    return <CommentsContainer className="utterences" ref={this.containerRef} />;
  }
}

const CommentsContainer = styled.div`
  width: 760px;
  margin: 32px auto;
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

export default Comments;
