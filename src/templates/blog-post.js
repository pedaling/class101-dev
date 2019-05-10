import { Headline1, Body1, TextStyles } from '@class101/ui';
import { graphql, Link } from 'gatsby';
import React from 'react';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import styled from 'styled-components';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <ContentDiv>
          <Headline1 style={{ marginBottom: '32px' }}>
            {post.frontmatter.title}
          </Headline1>
          <Body1>{post.frontmatter.date}</Body1>
          <MarkdownDiv dangerouslySetInnerHTML={{ __html: post.html }} />
        </ContentDiv>
        <Bio userName={post.frontmatter.user} />
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
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
        date(formatString: "MMMM DD, YYYY")
        description
        user
      }
    }
  }
`;
const ContentDiv = styled.div`
  padding: 16px;
  border: #333 solid 1px;
  box-sizing: border-box;
`;
const MarkdownDiv = styled.div``;
