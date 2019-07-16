import { Colors, TextStyles } from '@class101/ui';
import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import styled from 'styled-components';

const SearchInput: React.SFC = () => {
  const [text, setText] = useState('');

  const { allMarkdownRemark: { edges } } = useStaticQuery(PostsQuery);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }

  return <AutoCompleteContainer>
    <StyledInput placeholder="제목 및 내용을 입력하세요." onChange={onChangeText} />
    {
      text && <AutoCompleteList>
      {
        edges
          .filter(({ node }: any) => node.frontmatter.title.includes(text) || node.rawMarkdownBody.includes(text))
          .map(({ node }: any) => <AutoCompleteItem key={node.fields.slug} to={node.fields.slug}>
          <b>{node.frontmatter.title}</b>
          <p>{node.rawMarkdownBody.slice(0, 200)}...</p>
        </AutoCompleteItem>)
      }
    </AutoCompleteList>
    }
  </AutoCompleteContainer>
}

const PostsQuery = graphql`
  query {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, limit: 1000) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tags
            description
          }
          rawMarkdownBody
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
  flex: 1;
`

const AutoCompleteList = styled.div`
  position: absolute;
  width: 100%;
  bottom: 1px;
  top: 100%;
  z-index: 100;
`

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
`

const StyledInput = styled.input`
  ${TextStyles.body2};
  width: 100%;
  padding: 0 16px;
  outline: none;
  border: none;
`;
