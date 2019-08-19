import { Col, Grid, Row, TextStyles } from '@class101/ui';
import { graphql } from 'gatsby';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Paginator from '../components/Paginator';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';
import { Edge, Site } from '../graphql-types';
import i18n from '../utils/i18n';

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

const getColLg = (index: number) => {
  if (index === 0) {
    return 12;
  }
  if (index <= 3) {
    return 4;
  }
  return 6;
};

const PostsTemplate: React.SFC<RouteComponentProps & Props> = props => {
  const {
    data: {
      allMarkdownRemark: { edges },
      site: {
        siteMetadata: { description },
      },
    },
    pageContext: { numPages, currentPage, language },
  } = props;

  return (

    <Layout language={language}>
      <SEO title="class101.dev" />
      <Grid>
        <Row>
          <Col>
            <SiteTitle>{i18n.t('description')}</SiteTitle>
          </Col>
        </Row>
        <Row>
          {edges.map(({ node }, i) => (
            <Col key={node.fields.slug} md={12} lg={getColLg(i)}>
              <PostCard node={node} />
            </Col>
          ))}
          <Col md={12}>
            <Paginator numPages={numPages} currentPage={currentPage} language={language} />
          </Col>
        </Row>
      </Grid>
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
