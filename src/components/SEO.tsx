/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { SiteMetadata } from '../graphql-types';

interface Props {
  title?: string;
  description?: string;
  thumbnail?: string;
  author?: string;
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
            facebookAppId
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const siteMetadata: SiteMetadata = queryResult.site.siteMetadata;
  const { t, i18n: { language } } = useTranslation();

  const { title, description, thumbnail, author, pathname } = props;

  const absolutedThumbnail = siteMetadata.siteUrl + (thumbnail || '/images/default.jpg');

  return (
    <Helmet
      htmlAttributes={{
        lang: language,
      }}
      title={title}
      titleTemplate={`%s | ${t('title')}`}
      link={[
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x26.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/android-icon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/android-icon-192x192.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '57x57', href: '/icons/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '60x60', href: '/icons/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '72x72', href: '/icons/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '76x76', href: '/icons/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '114x114', href: '/icons/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '120x120', href: '/icons/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '144x144', href: '/icons/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '152x152', href: '/icons/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: '/icons/apple-icon-180x180.png' },
        { rel: 'shortcut icon', type: 'ico', href: '/icons/favicon.ico' },
      ]}
      meta={[
        {
          name: `description`,
          content: description || t('description'),
        },
        {
          name: 'author',
          content: t(`profile.name.${author || siteMetadata.author}`),
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:url`,
          content: `${siteMetadata.siteUrl}/`,
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
          content: description || t('description'),
        },
        {
          property: `og:type`,
          content: author === 'Class101' ? 'website' : 'article',
        },
        {
          property: 'og:site_name',
          content: t('title'),
        },

        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: t(`profile.name.${author || siteMetadata.author}`),
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description || t('description'),
        },
        {
          name: 'twitter:label1',
          content: 'Written By',
        },
        {
          name: 'twiiter:data1',
          content: t(`profile.name.${author || siteMetadata.author}`),
        },
        {
          name: 'keywords',
          content: siteMetadata.keywords.join(`, `),
        },
        {
          name: 'fb:app_id',
          content: siteMetadata.facebookAppId,
        },
        {
          name: 'msapplication-TileColor',
          content: '#ffffff',
        },
        {
          name: 'msapplication-TileImage',
          content: '/icons/ms-icon-144x144.png',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ]}
    />
  );
};

export default SEO;
