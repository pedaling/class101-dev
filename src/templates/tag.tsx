import { Body2, Col, Colors, Grid, Headline1, Row } from '@class101/ui';
import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import LinkWithLang from '../components/LinkWithLang';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';
import { Edge } from '../graphql-types';
import getTagText from '../utils/getTagText';

// Components
interface Props {
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: Edge[];
    };
  };
  pageContext: {
    tag: string;
    slug: string;
  };
}

const TagTemplate: React.FC<Props> = props => {
  const { pageContext, data } = props;
  const { tag, slug } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagText = getTagText(tag);
  return (
    <Layout>
      <SEO title={`${tagText}`} pathname={slug} />
      <Grid>
        <Row>
          <Col>
            <SiteTitle>{tagText}</SiteTitle>
            <SiteContent>
              총 {totalCount}개의 글이 있습니다. <br />
              <br />
              <ViewAllTagLink to={`/tags`}>모든 태그 보기</ViewAllTagLink>
            </SiteContent>
          </Col>
        </Row>
        <Row>
          {edges.map(({ node }) => (
            <Col key={node.fields.slug} md={12} lg={4}>
              <PostCard node={node} />
            </Col>
          ))}
        </Row>
      </Grid>
    </Layout>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query($tag: String, $language: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] } }
        fields: { language: { eq: $language } }
      }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 300, truncate: true)
          fields {
            slug
            language
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
            thumbnail
            author {
              id
              profileImage
              description
              github
              blog
              linkedin
            }
            tags
          }
        }
      }
    }
  }
`;

const SiteTitle = styled(Headline1)`
  font-size: 36px;
  margin-bottom: 16px;
`;

const SiteContent = styled(Body2)`
  font-size: 17px;
  margin-bottom: 62px;
  color: ${Colors.gray700};
`;

const ViewAllTagLink = styled(LinkWithLang)`
  color: ${Colors.gray800};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
