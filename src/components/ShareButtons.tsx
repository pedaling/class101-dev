import React from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import styled from 'styled-components';

interface Props {
  url: string;
}

const ShareButtons: React.FC<Props> = props => {
  const { url } = props;
  const title = 'class101';

  return (
    <Wrapper>
      <ButtonWrapper>
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <LinkedinShareButton url={url} windowWidth={750} windowHeight={600}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <EmailShareButton url={url} subject={title} body="body">
          <EmailIcon size={32} round />
        </EmailShareButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px;
  cursor: pointer;
`;

export default ShareButtons;
