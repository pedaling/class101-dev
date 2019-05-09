import { Headline1, Body1, TextStyles } from '@class101/ui';
import { graphql, Link } from 'gatsby';
import React from 'react';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import styled from 'styled-components';

const { headline1, headline2, headline3, subtitle1, body1 } = TextStyles

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <Headline1 style={{ marginBottom: '32px' }}>{post.frontmatter.title}</Headline1>
        <Body1>
          {post.frontmatter.date}
        </Body1>
        <MarkdownDiv dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr/>
        <Bio />

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
    )
  }
}

export default BlogPostTemplate

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
      }
    }
  }
`

const MarkdownDiv = styled.div`
  padding-top: 32px;
  h1 {
    ${headline1}
  }
  h2 {
    ${headline2}
  }
  h3 {
    ${headline3}
  }
  h4 {
    ${subtitle1}
  }
  h5 {
    ${body1}
    font-weight: 800;
  }
  h6 {
    ${body1}
  }
  p {
    ${body1}
  }

`