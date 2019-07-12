import React from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import styled from 'styled-components';

interface Props {
  url: string;
}

const ShareButtons: React.SFC<Props> = props => {
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
        <TelegramShareButton url={url} title={title}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <WhatsappShareButton url={url} title={title} separator=":: ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <LinkedinShareButton url={url} windowWidth={750} windowHeight={600}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <RedditShareButton url={url} title={title} windowWidth={660} windowHeight={460}>
          <RedditIcon size={32} round />
        </RedditShareButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <TumblrShareButton url={url} title={title} windowWidth={660} windowHeight={460}>
          <TumblrIcon size={32} round />
        </TumblrShareButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <LivejournalShareButton url={url} title={title} description={url}>
          <LivejournalIcon size={32} round />
        </LivejournalShareButton>
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
  flex-direction: row-reverse;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px;
  cursor: pointer;
`;

export default ShareButtons;
