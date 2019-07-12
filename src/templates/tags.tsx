import { Body2, Col, Colors, Grid, Headline1, Row } from '@class101/ui';
import { graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';
import { Edge } from '../graphql-types';

const TAG_TEXT: { [key: string] : string} = {
  careers: '채용'
}

// Components
interface Props {
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: Edge[];
    }
  };
  pageContext: {
    tag: string;
  }
};

const Tags: React.SFC<Props> = (props) => {
  const { pageContext, data } = props;
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;

  return (
    <Layout>
      <SEO title={`${TAG_TEXT[tag] || tag} | 태그`} />
    <Grid>
      <Row>
        <Col>
          <SiteTitle>{TAG_TEXT[tag] || tag}</SiteTitle>
          <SiteContent>총 {totalCount}개의 글이 있습니다. <br/><br/>
          <Link to="/tags">모든 태그 보기</Link></SiteContent>
        </Col>
      </Row>
      <Row>
        {edges.map(({ node }) => (
          <Col key={node.fields.slug} md={12} lg={6}>
            <PostCard node={node} />
          </Col>
        ))}
      </Row>
    </Grid>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 320)
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
