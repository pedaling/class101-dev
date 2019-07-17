import { Body2, Col, Colors, Grid, Headline1, Row } from '@class101/ui';
import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';
import { Edge, Site } from '../graphql-types';

interface Props {
  data: {
    site: Site;
    allMarkdownRemark: {
      edges: Edge[];
    };
  };
  [key: string]: any; // 임시 선언. location 어디서 받아오는거야?
}

const getColLg = (index: number) => {
  if (index === 0) {
    return 12;
  }
  if (index <= 2) {
    return 6;
  }
  return 4;
};

const BlogIndex: React.SFC<Props> = props => {
  const {
    data: {
      allMarkdownRemark: { edges },
      site: {
        siteMetadata: { description },
      },
    },
  } = props;

  return (
    <Layout>
      <SEO title="클래스101 기술 블로그" />
      <Grid>
        <Row>
          <Col>
            <SiteTitle>{description}</SiteTitle>
          </Col>
        </Row>
        <Row>
          {edges.map(({ node }, i) => (
            <Col key={node.fields.slug} md={12} lg={getColLg(i)}>
              <PostCard node={node} />
            </Col>
          ))}
        </Row>
      </Grid>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 240)
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

const SiteTitle = styled(Headline1)`
  font-size: 36px;
  margin-bottom: 8px;
`;
