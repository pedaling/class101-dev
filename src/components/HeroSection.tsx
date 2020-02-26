import { Button, ButtonColor, Grid, Icon, TextStyles } from '@class101/ui';
import React from 'react';
import styled from 'styled-components';

export default class HeroSection extends React.PureComponent {
  public render() {
    return (
      <Container>
        <HeroImage src="/images/hero-image-lg.png" />
        <InnerHeroContainer>
          <Grid>
            <h1>신나는 코딩세상</h1>
            <h3>
              모든 사람이 사랑하는 일을 하며 살 수 있는 세상을 꿈꿉니다. <br />
              당신이 만약 이 꿈에 관심이 있다면,
            </h3>
            <Button
              color={ButtonColor.ORANGE}
              size="lg"
              rightIcon={<Icon.Arrow />}
              href="https://www.rocketpunch.com/companies/class101/jobs"
            >
              <span style={{ marginBottom: 2, color: 'white' }}>
                진행중인 채용 보기
              </span>
            </Button>
          </Grid>
        </InnerHeroContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 45vh;
  margin: 0 0 64px;
`;

const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InnerHeroContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 96px 24px;
  color: white;
  h1 {
    ${TextStyles.headline1};
    color: white;
  }
`;
