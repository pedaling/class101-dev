import { Grid, Headline2, Row, Col } from '@class101/ui';
import React from 'react';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { users } from '../data/users';


const AuthorsPage: React.SFC = () => {
  
  return (

  <Layout>
    <SEO title={`클래스101 구성원`} pathname={`/tags`} />
    <Grid>
      <Row>
        <Col lgOffset={2}>
          <Headline2>구성원</Headline2>
        </Col>
      </Row>
      <Row>
        {users.map(user => (
          <Col key={user.name} lgOffset={2}>
            <Bio user={user} />
          </Col>
        ))}
      </Row>
    </Grid>
  </Layout>
)};

export default AuthorsPage;
