import { Grid, Headline2, Row } from '@class101/ui';
import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import LinkTag from '../components/LinkTag';
import SEO from '../components/SEO';
import { Group, Site } from '../graphql-types';

// Utilities
// Components

interface Props {
  data: {
    allMarkdownRemark: {
      group: Group;
    };
    site: Site;
  };
}

const TagsPage: React.SFC<Props> = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
  <Layout>
    <SEO title={`모든 태그`} pathname={`/tags`} />
    <Grid>
      <Row>
        <SiteTitle>모든 태그</SiteTitle>
      </Row>
      <Row>
        {group.map(tag => (
          <LinkTag key={tag.fieldValue} {...tag} />
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
