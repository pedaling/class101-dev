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
    language: string;
  };
}

const AuthorTemplate: React.SFC<Props> = props => {
  const { pageContext, data } = props;
  const { user, slug, language } = pageContext;
  const edges = data.allMarkdownRemark && data.allMarkdownRemark.edges ? data.allMarkdownRemark.edges : [];
  return (
    <Layout language={language}>
      <SEO title={user.name} pathname={slug} />
      <Grid>
        <Row>
          <Col>
            <Bio user={user} language={language} />
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

export default AuthorTemplate;

export const pageQuery = graphql`
  query($author: String!, $language: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { eq: $author } }, fields: { language: { eq: $language } } }
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
            author
            tags
          }
        }
      }
    }
  }
`;
