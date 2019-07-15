import { Col, Grid, Row } from '@class101/ui';
import { graphql } from 'gatsby';
import React from 'react';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';
import { Edge, User } from '../graphql-types';

// Components
interface Props {
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: Edge[];
    };
  };
  pageContext: {
    user: User;
    slug: string;
  };
}

const Authors: React.SFC<Props> = props => {
  const { pageContext, data } = props;
  const { user, slug } = pageContext;
  const edges = data.allMarkdownRemark && data.allMarkdownRemark.edges 
    ? data.allMarkdownRemark.edges 
    : [];
  return (
    <Layout>
      <SEO title={user.name} pathname={slug} />
      <Grid>
        <Row>
          <Col>
            <Bio user={user} />
          </Col>
        </Row>
        <Row>
          {edges.map(({ node }) => (
            <Col key={node.fields.slug} md={12} lg={6}>
              <PostCard node={node} />
            </Col>
          ))}
        </Row>
      </Grid>
    </Layout>
  );
};

export default Authors;

export const pageQuery = graphql`
  query($author: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { eq: $author } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 320)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
            thumbnail
            author
            tags
          }
        }
      }
    }
  }
`;

