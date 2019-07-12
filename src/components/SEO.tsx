/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import { SiteMetadata } from '../graphql-types';
interface Props {
  title?: string;
  description?: string;
  thumbnail?: string;
  lang?: string;
}

const SEO: React.SFC<Props> = (props) => {
  const queryResult = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            keywords
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const siteMetadata: SiteMetadata = queryResult.site.siteMetadata;

  const { lang = 'ko', title, description, thumbnail } = props;

  return <Helmet
  htmlAttributes={{
    lang,
  }}
  title={title}
  titleTemplate={`%s | ${siteMetadata.title}`}
  link={[
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicon-16x26.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon-16x26.png' },
    { rel: 'shortcut icon', type: 'ico', href: '/images/favicon.ico' },
  ]}
  meta={[
    {
      name: `description`,
      content: description || siteMetadata.description,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: siteMetadata.description,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: siteMetadata.description,
    },
  ]
    .concat(
      siteMetadata.keywords.length > 0
        ? {
            name: `keywords`,
            content: siteMetadata.keywords.join(`, `),
          }
        : []
    )}
/>
}



export default SEO;
