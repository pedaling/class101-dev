import { Col, Colors, Grid, Row, TextStyles } from '@class101/ui';
import React from 'react';
import styled from 'styled-components';

const Footer: React.SFC = () => {
  return (
    <Container>
      <Grid>
        <Row>
          <Col>
            <LogoIcon src="/images/logotype-black.png" alt="class101" />
            <ContactSection>
              <ContactArticle>
                <b>(주)클래스101</b>
                <p>서울특별시 중구 한강대로 416 서울스퀘어 위워크 13층</p>
                <p>
                  <a href="tel:4578100277">457-81-00277</a>
                </p>
                <p>
                  <a href="mailto:dev@class101.net">dev@class101.net</a>
                </p>
              </ContactArticle>
              <ContactArticle>
                <a href="https://play.google.com/store/apps/details?id=net.pedaling.class101" target="_blank">
                  <DownloadIcon src="/images/download-android.png" alt="android" />
                </a>
                <a
                  href="https://apps.apple.com/kr/app/class101-%ED%81%B4%EB%9E%98%EC%8A%A4101/id1320607634"
                  target="_blank"
                >
                  <DownloadIcon src="/images/download-ios.png" alt="ios" />
                </a>
              </ContactArticle>
            </ContactSection>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  background-color: ${Colors.gray100};
  padding-top: 32px;
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

const LogoIcon = styled.img`
  width: auto;
  height: 40px;
  margin: 0;
`;

const DownloadIcon = styled.img`
  width: 120px;
  margin-right: 16px;
`;

const ContactSection = styled.div`
  ${TextStyles.body1};
`;
const ContactArticle = styled.div`
  padding: 16px 0;
`;
