import { Body2, ElevationStyles, TextStyles, Tag } from '@class101/ui';
import { graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Bio from '../components/Bio';
import Comments from '../components/Comments';
import Img from '../components/Img';
import Layout from '../components/layout';
import SEO from '../components/SEO';
import markdown from '../utils/markdown';

class BlogPostTemplate extends React.Component<any> {
  render() {
    const post = this.props.data.markdownRemark;
    const { previous, next } = this.props.pageContext;
    return (
      <Layout>
        <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
        <MarkdownContainer>
          <PostTitle>{post.frontmatter.title}</PostTitle>
          <PostDate>{post.frontmatter.date}</PostDate>
          {
            post.frontmatter.tags.map((tag: string) => <Tag value={tag}/>)
          }
          <MarkdownDiv className="markdown-body" dangerouslySetInnerHTML={{ __html: post.html }} />
          <PostNavigatorContainer>
            {previous && (
              <PostNavigator to={previous.fields.slug} rel="prev">
                <Img src={previous.frontmatter.thumbnail} />
                <PostNavigatorTitle>
                  이전 글<br />
                  {previous.frontmatter.title}
                </PostNavigatorTitle>
              </PostNavigator>
            )}
            {next && (
              <PostNavigator to={next.fields.slug} rel="next">
                <Img src={next.frontmatter.thumbnail} />
                <PostNavigatorTitle>
                  다음 글<br />
                  {next.frontmatter.title}
                </PostNavigatorTitle>
              </PostNavigator>
            )}
          </PostNavigatorContainer>
        </MarkdownContainer>
        <Bio authorName={post.frontmatter.author} />
        <Comments />
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY년 MM월 DD일")
        description
        author
        tags
      }
    }
  }
`;

const PostTitle = styled.h1`
  ${TextStyles.headline1}
  margin-bottom: 16px;
`;

const PostDate = styled(Body2)`
  margin-bottom: 16px;
`;

const MarkdownDiv = styled.div`
  margin: 16px 0;
`;

const PostNavigatorContainer = styled.div`
  display: flex;
`;

const PostNavigator = styled(Link)`
  display: block;
  position: relative;
  flex: 1;
  background: black;
  opacity: 0.9;
  img {
    z-index: -1;
  }
  &:hover {
    img {
      transition: transform 0.3s ease-in;
      transform: scale(1.025);
    }
  }
`;

const PostNavigatorTitle = styled.p`
  ${TextStyles.subtitle1}
  position: absolute;
  top: 50%;
  text-align: center;
  width: 100%;
  font-weight: 800;
  color: white;
`;


const MarkdownContainer = styled.div`
  background: white;
  border-radius: 3px;
  max-width: 960px;
  margin: 0 auto;
  ${markdown};
`;
