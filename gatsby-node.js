const path = require(`path`);
const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`);
const { users } = require(`./src/data/users`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogTemplate = path.resolve(`./src/templates/blog-post.tsx`);
  const tagTemplate = path.resolve('src/templates/tags.tsx');
  const authorTemplate = path.resolve('src/templates/authors.tsx');

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
        component: blogTemplate,
        context: {
          slug: edge.node.fields.slug,
          user: users.find(users => users.name === edge.node.frontmatter.author),
          previous,
          next,
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
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
