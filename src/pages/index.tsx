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

const BlogIndex: React.SFC<Props> = props => {
  const { data } = props;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="모든 글" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <Grid>
        <Row>
          <Col>
            <SiteTitle>Class101 Dev</SiteTitle>
            <SiteContent>기술 공유를 좋아하며 어쩌구 저러구 이러쿵 저러쿵 합니다.</SiteContent>
          </Col>
        </Row>
        <Row>
          {posts.map(({ node }) => (
            <Col key={node.fields.slug} md={12} lg={4}>
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
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 160)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY년 MM월 DD일")
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

const SiteContent = styled(Body2)`
  font-size: 17px;
  margin-bottom: 62px;
  color: ${Colors.gray700};
`;
