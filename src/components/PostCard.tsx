import { Avatar, Caption1, Card, Colors, CoverRatio, TextStyles } from '@class101/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Node } from '../graphql-types';
import LinkWithLang from './LinkWithLang';

interface Props {
  node: Node;
}

const PostCard: React.FC<Props> = props => {
  const {
    node: {
      fields: { slug },
      frontmatter: { title, description, thumbnail, date, author },
      excerpt
    }
  } = props;

  const { t } = useTranslation();

  return (
    <Anchor to={`/${slug}`}>
      <Card
        coverImage={thumbnail}
        coverImageRatio={CoverRatio.RATIO_4X3}
        title={title}
        extraTop={<CardCaption>{date}</CardCaption>}
        extraBottom={
          <div>
            <CardDescription>{description || excerpt}</CardDescription>
            <Avatar src="invaild_url" text={t(`profile.name.${author}`)} />
          </div>
        }
      />
    </Anchor>
  );
};

export default PostCard;

const Anchor = styled(LinkWithLang)`
  display: block;
  text-decoration: none;
  text-decoration: none;
  margin-bottom: 16px;
  &:hover {
    color: inherit;
  }
`;

const CardCaption = styled(Caption1)`
  color: ${Colors.gray900};
  font-weight: 600;
`;

const CardDescription = styled.div`
  ${TextStyles.caption1}
  color: ${Colors.gray800};
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: none;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;
