import { Button, ButtonColor, Colors, Icon, Input, ModalBottomSheet, TextStyles } from '@class101/ui';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import LinkWithLang from './LinkWithLang';

const SearchInput: React.FC = () => {
  const [text, setText] = useState('');

  const {
    allMarkdownRemark: { edges }
  } = useStaticQuery(PostsQuery);

  const { t } = useTranslation();

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <ModalBottomSheet
      title="검색하기"
      opener={
        <SearchButton rightIcon={<Icon.Search />} color={ButtonColor.WHITE}>
          {t('searchPlaceholder')}&nbsp;&nbsp;
        </SearchButton>
      }
    >
      <Input placeholder={t('searchPlaceholder')} onChange={onChangeText} />
      {text && (
        <AutoCompleteList>
          {edges
            .filter(({ node }: any) => node.frontmatter.title.includes(text))
            .map(({ node }: any) => (
              <Anchor key={node.fields.slug} to={node.fields.slug}>
                {node.frontmatter.title}
              </Anchor>
            ))}
        </AutoCompleteList>
      )}
    </ModalBottomSheet>
  );
};

const PostsQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
            language
          }
          frontmatter {
            title
            tags
            description
            author {
              id
              profileImage
              description
              github
              blog
              linkedin
            }
            date
          }
        }
      }
    }
  }
`;

export default SearchInput;

const SearchButton = styled(Button)`
  border: ${Colors.gray100} solid 1px;
  color: ${Colors.gray400};
`;

const Anchor = styled(LinkWithLang)`
  ${TextStyles.body2};
  border-bottom: 1px solid ${Colors.gray100};
  padding: 16px 12px;
  display: block;
  text-decoration: none;
  &:hover {
    color: inherit;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const AutoCompleteList = styled.div`
  width: 100%;
`;
