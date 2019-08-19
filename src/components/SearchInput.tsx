import { Colors, TextStyles } from '@class101/ui';
import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import styled from 'styled-components';
import i18n from '../utils/i18n';

const SearchInput: React.SFC = () => {
  const [text, setText] = useState('');

  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(PostsQuery);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <AutoCompleteContainer>
      <StyledInput placeholder={i18n.t('searchPlaceholder')} onChange={onChangeText} />
      {text && (
        <AutoCompleteList>
          {edges
            .filter(({ node }: any) => node.frontmatter.title.includes(text))
            .map(({ node }: any) => (
              <AutoCompleteItem key={node.fields.slug} to={node.fields.slug}>
                <b>{node.frontmatter.title}</b>
              </AutoCompleteItem>
            ))}
        </AutoCompleteList>
      )}
    </AutoCompleteContainer>
  );
};

const PostsQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
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
            author
            date
          }
        }
      }
    }
  }
`;

export default SearchInput;

const AutoCompleteContainer = styled.div`
  border: 1px solid ${Colors.gray200};
  box-sizing: border-box;
  margin: 0 16px;
  padding: 8px 0;
  position: relative;
  background: white;
  flex: 1 1 auto;
`;

const AutoCompleteList = styled.div`
  position: absolute;
  width: 100%;
  bottom: 1px;
  top: 100%;
  z-index: 100;
`;

const AutoCompleteItem = styled(Link)`
  ${TextStyles.body2}
  border: 1px solid ${Colors.gray200};
  box-sizing: border-box;
  display: block;
  background: white;
  padding: 16px 12px;
  color: inherit;
  text-decoration: none;
  margin: -1px;
`;

const StyledInput = styled.input`
  ${TextStyles.body2};
  width: 100%;
  padding: 0 16px;
  outline: none;
  border: none;
`;
