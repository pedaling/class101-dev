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
  const {
    node: {
      fields: { slug, language },
      frontmatter: { title, description, thumbnail, date, author },
      excerpt,
    },
  } = props;

  return (
    <Card to={`/${language}/${slug}`}>
      <CardThumbnail src={thumbnail} />
      <CardBody>
        <CardCaption>{date}</CardCaption>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description || excerpt}</CardDescription>
        <CardCaption>
          Written By <b>{author}</b>
        </CardCaption>
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

const CardThumbnail = styled(Img)`
  object-fit: cover;
`;

const CardTitle = styled.h2`
  ${TextStyles.subtitle1};
  margin-bottom: 4px;
`;

const CardCaption = styled(Body2)`
  color: ${Colors.gray700};
  margin-bottom: 4px;
`;

const CardDescription = styled.div`
  ${TextStyles.body2}
  color: ${Colors.gray900};
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: none;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.5em;
  height: 4.5em;
  margin-bottom: 4px;
`;
