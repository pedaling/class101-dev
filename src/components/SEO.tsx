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
  author?: string;
  lang?: string;
  pathname?: string;
}

const SEO: React.SFC<Props> = props => {
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

  const { lang = 'ko', title, description, thumbnail, author, pathname } = props;

  const absolutedThumbnail = siteMetadata.siteUrl + (thumbnail || '/images/thumbnails/default.jpg');

  return (
    <Helmet
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
          name: 'author',
          content: author || siteMetadata.author,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:url`,
          content: `${siteMetadata.siteUrl}${pathname || '/'}`,
        },
        {
          property: `og:image`,
          content: absolutedThumbnail,
        },
        {
          property: `og:image:width`,
          content: '1600',
        },
        {
          property: `og:image:height`,
          content: '900',
        },
        {
          property: `og:description`,
          content: description || siteMetadata.description,
        },
        {
          property: `og:type`,
          content: author === 'Class101' ? 'website' : 'article',
        },
        {
          property: 'og:site_name',
          content: siteMetadata.title,
        },

        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: author || siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description || siteMetadata.description,
        },
        {
          name: 'twitter:label1',
          content: 'Written By',
        },
        {
          name: 'twiiter:data1',
          content: author || siteMetadata.author,
        },
        {
          name: 'keywords',
          content: siteMetadata.keywords.join(`, `),
        },
      ]}
    />
  );
};

export default SEO;
