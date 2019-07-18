const path = require(`path`);
const _ = require('lodash');
const { users } = require(`./src/data/users`);
// const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve(`./src/templates/post.tsx`);
  const postsTemplate = path.resolve(`./src/templates/posts.tsx`);
  const tagTemplate = path.resolve('src/templates/tag.tsx');
  const authorTemplate = path.resolve('src/templates/author.tsx');

  return graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                thumbnail
                author
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
    const edges = result.data.allMarkdownRemark.edges;

    edges.forEach((edge, index) => {
      const previous = index === edges.length - 1 ? null : edges[index + 1].node;
      const next = index === 0 ? null : edges[index - 1].node;

      createPage({
        path: edge.node.fields.slug,
        component: postTemplate,
        context: {
          slug: edge.node.fields.slug,
          user: users.find(users => users.name === edge.node.frontmatter.author),
          previous,
          next,
        },
      });
    });

    const postsPerPage = 6;
    const numPages = Math.ceil(edges.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/blog/${i + 1}`,
        component: postsTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
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
      const tagPath = `/tags/${_.kebabCase(tag)}/`;
      createPage({
        path: tagPath,
        component: tagTemplate,
        context: {
          tag,
          slug: tagPath,
        },
      });
    }

    for (const user of users) {
      const authorPath = `/authors/${_.kebabCase(user.name)}/`;

      createPage({
        path: authorPath,
        component: authorTemplate,
        context: {
          user,
          author: user.name,
          slug: authorPath,
        },
      });
    }

    return null;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    /**
     * blog post의 path를 년/월/일/지은이 로 고정합니다.
     */

    // const value = createFilePath({ node, getNode });

    const date = new Date(node.frontmatter.date);
    const slug = `/blog/${date
      .toISOString()
      .slice(0, 10)
      .replace(/-/gi, '/')}/${_.kebabCase(node.frontmatter.author)}/`;

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};
