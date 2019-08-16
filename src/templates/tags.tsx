import { Grid, Headline2, Row, Tag } from '@class101/ui';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import React from 'react';

import Layout from '../components/Layout';
import LinkTag from '../components/LinkTag';
import SEO from '../components/SEO';
import { Group, Site } from '../graphql-types';
import styled from 'styled-components';

// Utilities
// Components

interface Props {
  data: {
    allMarkdownRemark: {
      group: Group;
    };
    site: Site;
  };
  pageContext: { 
    language: string;
  };
}

const TagsPage: React.SFC<Props> = ({
  data: {
    allMarkdownRemark: { group },
  },
  pageContext: {
    language
  }
}) => (
  <Layout language={language}>
    <SEO title={`모든 태그`} pathname={`/${language}/tags`} />
    <Grid>
      <Row>
        <SiteTitle>모든 태그</SiteTitle>
      </Row>
      <Row>
        {group.map(tag => (
          <LinkTag key={tag.fieldValue} {...tag} language={language}/>
        ))}
      </Row>
    </Grid>
  </Layout>
);

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

const SiteTitle = styled(Headline2)`
  margin-bottom: 32px;
`;
