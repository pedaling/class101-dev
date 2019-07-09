import { Body2, Headline3, TextStyles, ElevationStyles, Grid, Row, Col, Colors } from '@class101/ui';
import { graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Img from '../components/Img';
import SEO from '../components/SEO';
import { Frontmatter, Site } from '../graphql-types';

interface Props {
  data: {
    site: Site;
    allMarkdownRemark: {
      edges: {
        node: {
          excerpt: string;
          fields: {
            slug: string;
          };
          frontmatter: Frontmatter;
        };
      }[];
    };
  };
  [key: string]: any; // 임시 선언. location 어디서 받아오는거야?
}

class BlogIndex extends React.Component<Props> {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;
    console.log(this.props);

    return (
      <Layout>
        <SEO title="All posts" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
        <Grid>
          <Row>
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              const thumbnail = node.frontmatter.thumbnail;
              console.log(thumbnail);
              return (
                <Col key={node.fields.slug} sm={4}>
                  <PostCard to={node.fields.slug}>
                    <PostCardThumbnail src={thumbnail} />
                    <PostCardBody>
                      <PostCardTitle>{title}</PostCardTitle>
                      <PostCardDate>{node.frontmatter.date}</PostCardDate>
                      <PostCardDescription
                        dangerouslySetInnerHTML={{
                          __html: node.frontmatter.description || node.excerpt,
                        }}
                      />
                    </PostCardBody>
                  </PostCard>
                </Col>
              );
            })}
          </Row>
        </Grid>
      </Layout>
    );
  }
}

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
          }
        }
      }
    }
  }
`;

const PostCard = styled(Link)`
  display: block;
  border-radius: 3px;
  box-sizing: border-box;
  background: white;
  text-decoration: none;
  margin-bottom: 16px;
  &:hover {
    color: inherit;
    transition: transform 0.3s ease-in;
    transform: scale(1.025);
  }
  ${ElevationStyles.elevation3};
`;

const PostCardBody = styled.div`
  padding: 8px 16px;
`;

const PostCardThumbnail = styled(Img)``;

const PostCardTitle = styled.h2`
  ${TextStyles.headline3}
  margin-bottom: 8px;
`;

const PostCardDate = styled.div`
  ${TextStyles.body2}
  color: ${Colors.gray600};
  margin-bottom: 8px;
`;

const PostCardDescription = styled.div`
  ${TextStyles.body1}
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.5em;
  height: 6em;
`;
