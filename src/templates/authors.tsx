import { Col, Colors, ElevationStyles, Grid, Headline2, Row } from '@class101/ui';
import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import FullAnchorAuthor from '../components/FullAnchorAuthor';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default ({
  data: {
    allAuthorYaml: { edges: authorNodes }
  }
}) => {
  return (
    <Layout>
      <SEO title={`클래스101 구성원`} pathname={`/tags`} />
      <Background>
        <Grid>
          <Row>
            <Col>
              <Headline2>구성원</Headline2>
            </Col>
          </Row>
          <Row>
            {authorNodes.map(({ node: author }) => (
              <Col key={`author-${author.id}`} sm={12} md={4}>
                <FullAnchorAuthorCard author={author} />
              </Col>
            ))}
          </Row>
        </Grid>
      </Background>
    </Layout>
  );
};

export const pageQuery = graphql`
  query AuthorsQuery {
    allAuthorYaml {
      edges {
        node {
          id
          profileImage
          description
          github
          blog
          linkedin
        }
      }
    }
  }
`;

const Background = styled.div`
  background-color: ${Colors.gray100};
  padding-top: 56px;
`;

const FullAnchorAuthorCard = styled(FullAnchorAuthor)`
  ${ElevationStyles.elevation2};
  border-radius: 3px;
  padding: 32px 0;
  height: 240px;
  background-color: ${Colors.white};
  margin: 16px 0;
`;
