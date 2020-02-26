const path = require(`path`);
const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`);

const POSTS_PER_PAGE = 8;
const AVAILABLE_LANGUAGES = ['ko', 'en'];
const FALLBACK_LANGUAGE = 'ko';

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve(`./src/templates/post.tsx`);
  const postsTemplate = path.resolve(`./src/templates/posts.tsx`);
  const tagTemplate = path.resolve('src/templates/tag.tsx');
  const tagsTemplate = path.resolve('src/templates/tags.tsx');
  const authorTemplate = path.resolve('src/templates/author.tsx');
  const authorsTemplate = path.resolve('src/templates/authors.tsx');

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                authorId
                language
              }
              frontmatter {
                title
                thumbnail
                author {
                  id
                  profileImage
                  description
                  github
                  blog
                  linkedin
                }
                tags
                description
                date
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog edges pages.
    const allEdges = result.data.allMarkdownRemark.edges;
    // resolves from the query from 👆
    const authorSet = new Set();
    allEdges.forEach(edge => {
      if (edge.node.fields.authorId) {
        authorSet.add(edge.node.fields.authorId);
      }
    });
    const authorList = Array.from(authorSet);

    AVAILABLE_LANGUAGES.forEach(lang => {
      const firstPathSegment = `/${lang}`;

      const language = lang || FALLBACK_LANGUAGE;

      const edges = allEdges.filter(
        edge => edge.node.fields.language === language
      );

      edges.forEach((edge, index) => {
        const previous =
          index === edges.length - 1 ? null : edges[index + 1].node;
        const next = index === 0 ? null : edges[index - 1].node;

        createPage({
          path: `${firstPathSegment}/${edge.node.fields.slug}/`,
          component: postTemplate,
          context: {
            slug: edge.node.fields.slug,
            language,
            previous,
            next
          }
        });
      });

      const numPages = Math.ceil(edges.length / POSTS_PER_PAGE);

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path:
            i === 0
              ? `${firstPathSegment}/`
              : `${firstPathSegment}/blog/${i + 1}/`,
          component: postsTemplate,
          context: {
            limit: POSTS_PER_PAGE,
            skip: i * POSTS_PER_PAGE,
            language,
            numPages,
            currentPage: i + 1
          }
        });

        if (language === FALLBACK_LANGUAGE && i === 0) {
          createPage({
            path: '/',
            component: postsTemplate,
            context: {
              limit: POSTS_PER_PAGE,
              skip: i * POSTS_PER_PAGE,
              language,
              numPages,
              currentPage: i + 1
            }
          });
        }
      });

      const tags = Object.keys(
        edges.reduce((result, edge) => {
          for (const tag of edge.node.frontmatter.tags) {
            result[tag] = true;
          }
          return result;
        }, {})
      );

      for (const tag of tags) {
        const tagPath = `${firstPathSegment}/tags/${_.kebabCase(tag)}/`;
        createPage({
          path: tagPath,
          component: tagTemplate,
          context: {
            tag,
            language,
            slug: tagPath
          }
        });
      }

      for (const author of authorList) {
        const authorPath = `${firstPathSegment}/authors/${_.kebabCase(
          author
        )}/`;

        createPage({
          path: authorPath,
          component: authorTemplate,
          context: {
            language,
            authorId: author,
            slug: authorPath
          }
        });
      }

      const authorsPath = `${firstPathSegment}/authors/`;
      createPage({
        path: authorsPath,
        component: authorsTemplate,
        context: {
          language,
          slug: authorsPath
        }
      });

      const tagsPath = `${firstPathSegment}/tags/`;
      createPage({
        path: tagsPath,
        component: tagsTemplate,
        context: {
          language,
          slug: tagsPath
        }
      });
    });

    return null;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    /**
     * blog post의 path를 blog/YYYY/MM/DD/author/ 로 고정합니다.
     */
    const path = createFilePath({ node, getNode });
    const segement = path.split('/');
    const language = segement[segement.length - 2];

    const date = new Date(node.frontmatter.date);

    const slug = `blog/${date
      .toISOString()
      .slice(0, 10)
      .replace(/-/gi, '/')}/${_.kebabCase(node.frontmatter.author)}`;

    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'author')) {
      createNodeField({
        node,
        name: 'authorId',
        value: node.frontmatter.author
      });
    }

    createNodeField({
      node,
      name: `slug`,
      value: slug
    });

    createNodeField({
      node,
      name: `language`,
      value: language
    });
  }
};
