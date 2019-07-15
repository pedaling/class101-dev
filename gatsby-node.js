const path = require(`path`);
const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`);

const users = [
  {
    profileImage: '/images/profiles/joy.jpg',
    name: 'Hyeonseung Bae',
    description: '매일 세상의 중요한 문제를 해결하려고 고민하는 소프트웨어 개발자입니다.',
    github: 'https://github.com/bae-unidev',
    blog: 'https://bae-unidev.github.io/',
    linkedin: 'https://www.linkedin.com/in/baehyeonseung/',
  },
  {
    profileImage: '/images/profiles/yozzing.png',
    name: 'Yohan Kim',
    description: '항상 어떻게 성장할 지 생각하는 개발자입니다.',
    github: 'https://github.com/ddalpange',
    blog: 'https://ddalpange.github.io/',
    linkedin: 'https://www.linkedin.com/in/yohan-kim-6282b1158/',
  },
  {
    profileImage: '/images/profiles/donut.jpg',
    name: 'Youngchan Je',
    description: 'all-round 개발자 도넛입니다.',
    github: 'https://github.com/ochanje210',
    blog: 'https://medium.com/@youngchanje',
    linkedin: 'https://www.linkedin.com/in/youngchanje/',
  },
  {
    profileImage: '/images/profiles/cheolee.jpeg',
    name: 'ByeongCheol Lee',
    description: '꿈꾸는 세상을 개발합니다',
    github: 'https://github.com/cheolee',
    blog: '',
    linkedin: 'https://www.linkedin.com/in/cheoleeeeeee',
  },
  {
    profileImage: '/images/profiles/tony.png',
    name: 'Geonho Han',
    description: '가리지 않고 배우는 개발자 한건호입니다.',
    github: 'https://github.com/hrg921',
    blog: 'https://www.linkedin.com/in/%EA%B1%B4%ED%98%B8-%ED%95%9C-76a139b1/',
    linkedin: 'https://blog.geonho.com/',
  },
  {
    profileImage: '/images/profiles/grep.png',
    name: 'Hoyeon Lee',
    description: '안녕하세요. 사람과 비즈니스가 좋은 개발자 이호연입니다.',
    github: 'https://github.com/yansfil',
    blog: 'https://tansfil.tistory.com/',
    linkedin: 'ttps://www.linkedin.com/in/hoyeon-lee-a58702117/',
  },
  {
    profileImage: '/images/profiles/esmond.png',
    name: 'Jeonyeon Jo',
    description: '안녕하세요. 애즈먼입니다.',
    github: 'https://github.com/EsmondCho',
    blog: '',
    linkedin: 'https://www.linkedin.com/in/esmond-cho-705bba168/',
  },
  {
    profileImage: '/images/profiles/hun.png',
    name: 'Yeonghun Choi',
    description: '세상에 도움이 되는 일을 하고 싶은 개발자입니다.',
    github: 'https://github.com/jeffchoi72',
    blog: 'https://jeffchoi72.github.io',
    linkedin: '',
  },
  {
    profileImage: '/images/profiles/chichi.png',
    name: 'Chihye Park',
    description: '더 나은 output을 위한 input을 고민하는 개발자',
    github: 'hhttps://github.com/chiabi',
    blog: 'https://chiabi.github.io/',
    linkedin: 'www.linkedin.com/in/parkchihye',
  },
];

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogTemplate = path.resolve(`./src/templates/blog-post.tsx`);
  const tagTemplate = path.resolve('src/templates/tags.tsx');
  const authorTemplate = path.resolve('src/templates/authors.tsx');

  users.forEach(user => {
    user.slug = `/authors/${_.kebabCase(user.name)}/`;
    return user;
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

    for (const user of users) {
      console.log(user.name);

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
