export interface MarkdownRemark {
  id: string;
  html: string;
  excerpt?: string;
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
  fields: Fields;
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
  keywords: string[];
  social: Social;
}

export interface Social {
  twitter?: string;
  facebook?: string;
  rocketpunch?: string;
  github?: string;
}

export interface GroupEl {
  fieldValue: string;
  totalCount: number;
}

export type Group = GroupEl[];
