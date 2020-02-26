import { Col, Grid, Row } from '@class101/ui';
import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { Edge } from '../graphql-types';

// Components
interface Props {
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: Edge[];
    };
  };
  pageContext: {
    slug: string;
  };
}

const AuthorTemplate: React.FC<Props> = props => {
  const { pageContext, data } = props;
  const { slug } = pageContext;
  const edges =
    data.allMarkdownRemark && data.allMarkdownRemark.edges
      ? data.allMarkdownRemark.edges
      : [];
  return (
    <Layout>
      {/* <SEO title={user.name} pathname={slug} /> */}
      <Grid>
        <Row>
          <Col>{/* <Bio user={user} /> */}</Col>
        </Row>
        <Row>
          {edges.map(({ node }) => (
            <Col key={node.fields.slug} md={12} lg={4}>
              <PostCard node={node} />
            </Col>
          ))}
        </Row>
      </Grid>
    </Layout>
  );
};

export default AuthorTemplate;

export const pageQuery = graphql`
  query($authorId: String!, $language: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { language: { eq: $language }, authorId: { eq: $authorId } }
      }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 300, truncate: true)
          fields {
            slug
            language
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
            thumbnail
            author {
              id
              profileImage
              description
              github
              blog
              linkedin
            }
            tags
          }
        }
      }
    }
  }
`;
