import { Col, Grid, Row, TextStyles } from '@class101/ui';
import { graphql } from 'gatsby';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import HeroSection from '../components/HeroSection';
import Layout from '../components/Layout';
import Paginator from '../components/Paginator';
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
  pageContext: {
    isCreatedByStatefulCreatePages: boolean;
    numPages: number;
    currentPage: number;
    limit: number;
    skip: number;
    language: string;
  };
}

const PostsTemplate: React.FC<RouteComponentProps & Props> = props => {
  const {
    data: {
      allMarkdownRemark: { edges }
    },
    pageContext: { numPages, currentPage }
  } = props;

  return (
    <Layout>
      <SEO title="Home" />
      <HeroSection />
      <Grid>
        <Row>
          {edges.map(({ node }) => (
            <Col key={node.fields.slug} md={6} lg={3}>
              <PostCard node={node} />
            </Col>
          ))}
          <Col md={12}>
            <Paginator numPages={numPages} currentPage={currentPage} />
          </Col>
        </Row>
      </Grid>
      <br />
    </Layout>
  );
};

export default PostsTemplate;

export const pageQuery = graphql`
  query PostsTemplateQuery($skip: Int!, $limit: Int!, $language: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { fields: { language: { eq: $language } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 500, truncate: true)
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

const SiteTitle = styled.h1`
  ${TextStyles.headline2};
  margin-bottom: 24px;
`;
