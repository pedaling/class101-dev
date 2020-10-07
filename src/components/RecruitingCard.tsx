import {
  Colors,
  TextStyles,
  Callout,
  Button,
  ButtonColor,
  Icon,
  IconButton,
  CalloutStatus
} from '@class101/ui';
import React, { useState } from 'react';
import styled from 'styled-components';

const RecruitingCard: React.FC = () => {
  const copyToClipboard = (val: string) => {
    const t = document.createElement('textarea');
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
  };

  const [_, setCopied] = useState(false);

  const handleClickCopy = () => {
    copyToClipboard('recruit@101.inc');
    setCopied(true);
  };

  return (
    <RecruitingCardWrapper title="지원방법" status={CalloutStatus.SUGGEST}>
      <p>
        자유 형식의 이력서, 포트폴리오와 GitHub 계정을 아래 메일로 제출합니다.
        <br />
        이력서에 나이, 사진을 첨부하지 않습니다. 평가와 관련이 없습니다.
      </p>
      <Flex>
        <b> recruit@101.inc</b>
        <IconButton
          color={ButtonColor.DEFAULT}
          icon={<Icon.Clip />}
          size="xs"
          onClick={handleClickCopy}
        />
      </Flex>
    </RecruitingCardWrapper>
  );
};

export default RecruitingCard;

const RecruitingCardWrapper = styled(Callout)`
  margin: 16px 0;
  padding: 16px;

  h5 {
    ${TextStyles.subtitle1};
    font-weight: 600;
    margin-bottom: 8px;
  }
  p {
    ${TextStyles.body2};
    margin-bottom: 8px;
  }
`;

const Flex = styled.div`
  display: flex;
  flex: 1;

  flex-direction: row;
  align-items: center;

  b {
    ${TextStyles.body1};
    font-weight: 600;

    margin-right: 8px;
  }
`;
