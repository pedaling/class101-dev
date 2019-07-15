import React from 'react';
import styled from 'styled-components';
import { Colors, TextStyles } from '@class101/ui';

export default class Footer extends React.Component {
  public render() {
    return (
      <Container>
        <InnerContainer>
          <LogoIcon src="/images/ic-logo-black.png" alt="class101" />
          <ContactSection>
            <ContactArticle>
              <b>(주)클래스101</b>
              <p>서울특별시 중구 한강대로 416 서울스퀘어 위워크 13층</p>
              <br/>
              <p><a href="tel:4578100277">457-81-00277</a></p>
              <p><a href="mailto:dev@class101.net">dev@class101.net</a></p>
            </ContactArticle>
            <ContactArticle>
              <a href="https://play.google.com/store/apps/details?id=net.pedaling.class101" target="_blank">
                <DownloadIcon src="/images/download-android.png" alt="android" />
              </a>
              <a href="https://apps.apple.com/kr/app/class101-%ED%81%B4%EB%9E%98%EC%8A%A4101/id1320607634" target="_blank">
                <DownloadIcon src="/images/download-ios.png" alt="ios" />
              </a>
            </ContactArticle>
          </ContactSection>
        </InnerContainer>
      </Container>
    );
  }
}

const Container = styled.footer`
  background-color: ${Colors.gray100};
  a {
    color: inherit;
    font-weight: 600;
    color: ${Colors.gray900};
    text-decoration: none;
    &:hover {
      color: inherit;
      text-decoration: underline;
    }
  }
  p {
    padding: 0;
    margin: 4px 0;
  }
`;

const InnerContainer = styled.div`
  ${TextStyles.body1};
  max-width: 960px;
  margin: 0 auto;
  padding: 32px;
`;

const LogoIcon = styled.img`
  width: 80px;
  margin: 0;
`;

const DownloadIcon = styled.img`
  width: 160px;
  margin-left: 16px;
`;

const ContactSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`
const ContactArticle = styled.div`
  
`
