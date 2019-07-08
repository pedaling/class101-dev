export interface MarkdownRemark {
  id: string
  html: string
  frontmatter: Frontmatter
  fields: {
    slug?: string
  }
}

export interface Frontmatter {
  title: string
  date: string
  thumbnail: any
  description?: string
}

export interface Site {
  siteMetadata: SiteMetadata
}

export interface SiteMetadata {
  title: string
  author: string
}
