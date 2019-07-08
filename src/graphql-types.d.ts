export interface MarkdownRemark {
  id: string;
  html: string;
  frontmatter: Frontmatter
  fields: {
    slug?: string;
  }
}

export interface Frontmatter {
  title: string;
  date: string;
  thumbnail: string;
  description?: string;
}

export interface Site {
  siteMetadata: SiteMetadata;
}

export interface SiteMetadata {
  title: string;
  author: string;
  description: string;
  siteUrl: string;
  social: Social;
}

export interface Social {
  twitter?: string;
  facebook?: string;
  rocketpunch?: string;
  github?: string;
}