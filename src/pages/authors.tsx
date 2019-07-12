import { Grid, Headline2, Row, Tag } from '@class101/ui';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import React from 'react';

import Layout from '../components/Layout';
import LinkTag from '../components/LinkTag';
import SEO from '../components/SEO';
import { Group, Site, User } from '../graphql-types';
import Bio from '../components/Bio';

// Utilities
// Components

interface Props {
  pageContext: {
    users: User[];
  }
}

const TagsPage: React.SFC<Props> = ({
  pageContext: {
    users
  }
}) => (
  <Layout>
    <SEO title={`클래스101 구성원`} pathname={'/tags'} />
    <Grid>
      <Row>
        <Headline2>구성원</Headline2>
      </Row>
      {users.map(user => (
        <Bio key={user.name} user={user}/>
      ))}
    </Grid>
  </Layout>
);

export default TagsPage;

