import { Body2, Grid, Headline1 } from '@class101/ui';
import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

class NotFoundPage extends React.Component {
  public render() {
    return (
      <Layout>
        <SEO title="404: Not Found" />
        <Grid>
          <Headline1>404 Not Found</Headline1>
          <br/>
          <Body2>
            아무것도 찾지 못했다요.
          </Body2>
        </Grid>
      </Layout>
    );
  }
}

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
