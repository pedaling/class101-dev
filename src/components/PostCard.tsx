import { Body2, Colors, TextStyles } from '@class101/ui';
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Img from '../components/Img';
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
        <CardCaption>{node.frontmatter.date} Written By {node.frontmatter.author}</CardCaption>
        <CardTitle>{title}</CardTitle>
        <CardDescription
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.excerpt,
          }}
        />
      </CardBody>
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

const CardThumbnail = styled(Img)``;

const CardTitle = styled.h2`
  ${TextStyles.headline3}
`;

const CardCaption = styled(Body2)`
  color: ${Colors.gray700};
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
