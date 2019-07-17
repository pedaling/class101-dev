import { Col, Grid, Headline1, Row } from '@class101/ui';
import { graphql } from 'gatsby';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';
import Paginator from '../components/Paginator';
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
  }
}

const getColLg = (index: number) => {
  if (index === 0) {
    return 12;
  }
  if (index <= 4) {
    return 4;
  }
  return 6;
};

const BlogList: React.SFC<RouteComponentProps & Props> = props => {
  console.log(props);
  const {
    data: {
      allMarkdownRemark: { edges },
      site: {
        siteMetadata: { description },
      },
    },
    pageContext: {
      numPages,
      currentPage
    }
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
          <Col md={12}>
            <Paginator numPages={numPages} currentPage={currentPage} />
          </Col>
        </Row>
      </Grid>
    </Layout>
  );
};

export default BlogList;

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
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
      ) {
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
