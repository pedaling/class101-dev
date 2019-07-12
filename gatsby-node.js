const path = require(`path`);
const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`);

const users = [
  {
    profileImage: '/images/profiles/yozzing.jpeg',
    name: 'Yohan Kim',
    description: '김요찡입니다.',
    github: 'https://github.com/ddalpange',
  },
];

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogTemplate = path.resolve(`./src/templates/blog-post.tsx`);
  const tagTemplate = path.resolve('src/templates/tags.tsx');
  const authorTemplate = path.resolve('src/templates/authors.tsx');

  users.forEach(user => {
    user.slug = `/authors/${_.kebabCase(user.name)}/`;
  });

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

    // Tag pages:
    let tags = [];
    // Iterate through each edge, putting all found tags into `tags`
    _.each(edges, edge => {
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
          slug: `/tags/${_.kebabCase(tag)}/`,
        },
      });
    });

    // Tag pages:
    let authors = [];
    // Iterate through each edge, putting all found authors into `authors`
    _.each(edges, edge => {
      if (_.get(edge, 'node.frontmatter.author')) {
        authors = authors.concat(edge.node.frontmatter.author);
      }
    });
    // Eliminate duplicate authors
    authors = _.uniq(authors);

    // Make tag pages
    authors.forEach(author => {
      createPage({
        path: `/authors/${_.kebabCase(author)}/`,
        component: authorTemplate,
        context: {
          author,
          user: users.find(users => users.name === author),
          slug: `/authors/${_.kebabCase(author)}/`,
        },
      });
    });

    return null;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  console.log(node);

  /**
   * 흑마법 ㅋㅋㅋㅋ
   */
  if (node.internalComponentName === 'ComponentAuthors') {
    node.context.users = users;
  }

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
