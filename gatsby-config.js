module.exports = {
  siteMetadata: {
    title: `클래스101 기술 블로그`,
    author: `class101`,
    description: `신나는 코딩 세상`,
    keywords: [
      'class101',
      'typescript',
      'monorepo',
      'react',
      'graphql',
      'apllo',
      'aws'
    ],
    siteUrl: `https://class101.dev`,
    facebookAppId: '2582489538450547',
    social: {
      twitter: `class101`
    }
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': `AuthorYaml`
  },
  plugins: [
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Noto Sans KR`,
            variants: [`300`, `400`, `600`, `700`, `800`]
          },
          {
            family: `Source Code Pro`,
            variants: [`400`, `600`]
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content/assets`,
    //     name: `assets`,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content/assets/images`,
    //     name: `images`,
    //   },
    // },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow'
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in src/layouts/index.js
              // right after importing the prism color scheme:
              //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false
            }
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-64561335-30`
      }
    },
    {
      resolve: `gatsby-plugin-facebook-analytics`,
      options: {
        // Required - set this to the ID of your facebook app.
        appId: `2582489538450547`,

        // Which version of the SDK to load.
        version: `v3.3`,

        // Determines whether XFBML tags used by social plugins are parsed.
        xfbml: true,

        // Determines whether a cookie is created for the session or not.
        cookie: false,

        // Include facebook analytics in development.
        // Defaults to false meaning the library will only be loaded in production.
        includeInDevelopment: false,

        // Include debug version of sdk
        // Defaults to false meaning the library will load sdk.js
        debug: false,

        // Select your language.
        language: `ko`
      }
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `클래스101 기술 블로그`,
        short_name: `class101.dev`,
        description: `신나는 코딩 세상`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        lang: `ko`,
        display: `fullscreen`,
        include_favicon: true,
        icon: `static/icons/favicon-32x32.png`,
        icons: [
          {
            src: 'static/icons/android-icon-48x48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: 'static/icons/android-icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: 'static/icons/android-icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'static/icons/android-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'static/icons/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'static/icons/android-icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'static/icons/android-icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'static/icons/android-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      }
    },
    {
      resolve: `gatsby-plugin-typescript`
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const url = `${site.siteMetadata.siteUrl}/${edge.node.fields.language}/${edge.node.fields.slug}`;
                console.log(url);
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: url,
                  guid: url,
                  custom_elements: [{ 'content:encoded': edge.node.html }]
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { 
                        slug
                        language
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/blog/'
          }
        ]
      }
    }
  ]
};
