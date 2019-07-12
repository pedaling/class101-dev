import { Body2, Colors, TextStyles } from '@class101/ui';
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Img from '../components/Img';
import SmallBio from '../components/SmallBio';
import { Node } from '../graphql-types';

interface Props {
  node: Node;
}

const PostCard: React.SFC<Props> = props => {
  const { node } = props;

  const title = node.frontmatter.title || node.fields.slug;
  const thumbnail = node.frontmatter.thumbnail;
  return (
    <Card to={node.fields.slug}>
      <CardThumbnail src={thumbnail} />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardDescription
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.excerpt,
          }}
        />
      </CardBody>
      <CardFooter>
        <SmallBio authorName={node.frontmatter.author} />
        <CardDate>{node.frontmatter.date}</CardDate>
      </CardFooter>
    </Card>
  );
};

export default PostCard;

const Card = styled(Link)`
  display: block;
  border-radius: 3px;
  box-sizing: border-box;
  background: white;
  text-decoration: none;
  margin-bottom: 16px;
  &:hover {
    color: inherit;
    img {
      transition: transform 0.3s ease-in;
      transform: scale(1.025);
    }
  }
`;

const CardBody = styled.div`
  padding: 8px 0;
`;

const CardFooter = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const CardThumbnail = styled(Img)``;

const CardTitle = styled.h2`
  ${TextStyles.headline3}
  margin-bottom: 8px;
`;

const CardDate = styled(Body2)`
  color: ${Colors.gray600};
  margin-bottom: 8px;
`;

const CardDescription = styled.div`
  ${TextStyles.body1}
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: none;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.5em;
  height: 6em;
`;
