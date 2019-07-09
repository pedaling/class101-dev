export interface MarkdownRemark {
  id: string;
  html: string;
  frontmatter: Frontmatter;
  fields: {
    slug?: string;
  };
}

export interface Frontmatter {
  title: string;
  date: string;
  thumbnail: string;
  author: string;
  tags: string[];
  description?: string;
}

export interface Edge {
  node: Node;
}

export interface Node {
  excerpt: string;
  fields: Fields;
  frontmatter: Frontmatter;
}
export interface Site {
  siteMetadata: SiteMetadata;
}

export interface Fields {
  slug: string;
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
