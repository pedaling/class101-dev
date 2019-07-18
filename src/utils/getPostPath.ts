import _ from 'lodash';

export default (dateStr: string, author: string) => {
  const date = new Date(dateStr);
  return `/blog/${date
    .toISOString()
    .slice(0, 10)
    .replace(/-/gi, '/')}/${_.kebabCase(author)}/`;
};
