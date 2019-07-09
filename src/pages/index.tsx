import { Body2, Col, Colors, ElevationStyles, Grid, Row, TextStyles, Headline1, Headline2 } from '@class101/ui';
import { graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Img from '../components/Img';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SmallBio from '../components/SmallBio';
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

class BlogIndex extends React.Component<Props> {
  public render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout>
        <SEO title="All posts" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
        <Grid>
          <Row>
            <Col>
              <SiteTitle>Class101 Dev</SiteTitle>
              <SiteContent>기술 공유 합니다. dfsdfdsfsdfsdfdsfsdhfklzhdfksdhfkjlsdfhskjdfhsdkjfsdhfjks</SiteContent>
            </Col>
          </Row>
          <Row>
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              const thumbnail = node.frontmatter.thumbnail;
              return (
                <Col key={node.fields.slug} sm={4}>
                  <PostCard to={node.fields.slug}>
                    <PostCardThumbnail src={thumbnail} />
                    <PostCardBody>
                      <PostCardTitle>{title}</PostCardTitle>
                      <PostCardDescription
                        dangerouslySetInnerHTML={{
                          __html: node.frontmatter.description || node.excerpt,
                        }}
                      />
                    </PostCardBody>
                    <PostCardFooter>
                      <SmallBio authorName={node.frontmatter.author} />
                      <PostCardDate>{node.frontmatter.date}</PostCardDate>
                    </PostCardFooter>
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
`

const SiteContent = styled(Body2)`
  font-size: 17px;
  margin-bottom: 62px;
  color: ${Colors.gray700};
`

const PostCard = styled(Link)`
  display: block;
  border-radius: 3px;
  box-sizing: border-box;
  background: white;
  text-decoration: none;
  margin-bottom: 16px;
  &:hover {
    color: inherit;
    img {
      transition: transform 0.3s ease-in;
      transform: scale(1.025);
    }
  }
`;

const PostCardBody = styled.div`
  padding: 8px 0;
`;

const PostCardFooter = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const PostCardThumbnail = styled(Img)``;

const PostCardTitle = styled.h2`
  ${TextStyles.headline3}
  margin-bottom: 8px;
`;

const PostCardDate = styled(Body2)`
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
