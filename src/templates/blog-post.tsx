import { Body2, TextStyles } from '@class101/ui';
import { graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Bio from '../components/Bio';
import Comments from '../components/Comments';
import Img from '../components/Img';
import Layout from '../components/Layout';
import LinkTag from '../components/LinkTag';
import SEO from '../components/SEO';
import { MarkdownRemark, Site } from '../graphql-types';
import markdown from '../utils/markdown';
import ShareButtons from '../components/ShareButtons';

interface Props {
  data: {
    site: Site;
    markdownRemark: MarkdownRemark;
  };
  pageContext: any;
}

const BlogPostTemplate: React.SFC<Props> = props => {
  const {
    pageContext: { previous, next },
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
    <Layout>
      <SEO
        title={title}
        description={`${description} ${excerpt}`}
        thumbnail={thumbnail}
        author={author}
        pathname={slug}
      />
      <PostContainer>
        <ShareButtons url={siteUrl + slug} />
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
        </PostFooter>
      </PostContainer>
      <Bio authorName={author} />
      <Comments />
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
        date(formatString: "YYYY년 MM월 DD일")
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
  max-width: 960px;
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
  margin: 16px;
`;

const PostFooter = styled.div`
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
