import { Body2, TextStyles, Row, Col, Grid } from '@class101/ui';
import { graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Bio from '../components/Bio';
import Comments from '../components/Comments';
import Img from '../components/Img';
import Layout from '../components/Layout';
import LinkTag from '../components/LinkTag';
import SEO from '../components/SEO';
import { MarkdownRemark, Site, User } from '../graphql-types';
import markdown from '../utils/markdown';

interface Props {
  data: {
    site: Site;
    markdownRemark: MarkdownRemark;
  };
  pageContext: {
    user: User,
    previous: MarkdownRemark,
    next: MarkdownRemark,
  };
}

const BlogPostTemplate: React.SFC<Props> = props => {
  const {
    pageContext: { previous, next, user },
    data: {
      site: {
        siteMetadata: { siteUrl },
      },
      markdownRemark: {
        excerpt,
        html,
        fields: { slug },
        frontmatter: { title, date, description, thumbnail, author, tags },
      },
    },
  } = props;

  return (
    <Layout shareUrl={siteUrl + slug}>
      <SEO
        title={title}
        description={`${description} ${excerpt}`}
        thumbnail={thumbnail}
        author={author}
        pathname={slug}
      />
      <Grid>
        <Row>
          <Col>
            <PostContainer>
              <PostHeader>
                {tags.map((tag: string) => (
                  <LinkTag fieldValue={tag} key={tag} />
                ))}
                <PostTitle>{title}</PostTitle>

                <PostDate>{date}</PostDate>
              </PostHeader>

              <PostBody className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />

              <PostFooter>
                {previous && (
                  <PostNavigator to={previous.fields.slug} rel="prev">
                    <PostNavigatorTitle>
                      <span>이전 글</span><br />
                      <b>{previous.frontmatter.title}</b>
                    </PostNavigatorTitle>
                    <Img src={previous.frontmatter.thumbnail} />
                  </PostNavigator>
                )}
                {next && (
                  <PostNavigator to={next.fields.slug} rel="next">
                    <PostNavigatorTitle>
                      <span>다음 글</span><br />
                      <b>{next.frontmatter.title}</b>
                    </PostNavigatorTitle>
                    <Img src={next.frontmatter.thumbnail} />
                  </PostNavigator>
                )}
              </PostFooter>
            </PostContainer>
          </Col>
        </Row>
        <Row>
          <Col>
           <Bio user={user} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Comments title={title} siteUrl={siteUrl} slug={slug}/>
          </Col>
        </Row>
      </Grid>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        thumbnail
        date(formatString: "YYYY-MM-DD")
        description
        author
        tags
      }
    }
  }
`;

const PostContainer = styled.div`
  background: white;
  border-radius: 3px;
  margin: 0 auto;
  ${markdown};
`;

const PostHeader = styled.div`
  padding: 32px 8px;
  text-align: center;
`;

const PostTitle = styled.h1`
  ${TextStyles.headline2}
  margin: 16px 0;
`;

const PostDate = styled(Body2)`
  margin-bottom: 16px;
`;

const PostBody = styled.div`
  margin: 16px 0;
`;

const PostFooter = styled.div`
  display: flex;
`;

const PostNavigator = styled(Link)`
  display: block;
  position: relative;
  flex: 1;
  background: black;
  opacity: 0.99;
  img {
    z-index: 1;
    opacity: 0.5;
  }
  &:hover {
    img {
      transition: transform 0.3s ease-in;
      transform: scale(1.025);
    }
  }
`;

const PostNavigatorTitle = styled.p`
  font-size: 19px;
  position: absolute;
  top: 35%;
  text-align: center;
  width: 100%;
  font-weight: 800;
  color: white;
  z-index: 2;
  span {
    font-weight: 400;
  }
  b {
    font-weight: 600;
  }
`;
