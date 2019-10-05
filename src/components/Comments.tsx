/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */
import { DiscussionEmbed } from 'disqus-react';
import React from 'react';
import styled from 'styled-components';

interface Props {
  slug: string;
  title: string;
  siteUrl: string;
}

const Comments: React.FC<Props> = props => {
  const { slug, title, siteUrl } = props;
  const disqusShortname = 'class101-dev';
  const disqusConfig = {
    title,
    url: `${siteUrl}${slug}`,
    identifier: slug,
  };

  return (
    <CommentsContainer>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </CommentsContainer>
  );
};

const CommentsContainer = styled.div`
  margin: 32px auto;
`;

export default Comments;
