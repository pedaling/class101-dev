import { Colors, TextStyles } from '@class101/ui';
import React, { useState } from 'react';
import styled from 'styled-components';

const RecruitingCard: React.SFC = () => {
  const copyToClipboard = (val: string) => {
    const t = document.createElement('textarea');
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
  };

  const [copied, setCopied] = useState(false);

  const handleClickCopy = () => {
    copyToClipboard('helloworld@class101.net');
    setCopied(true);
  };

  return (
    <RecruitingCardWrapper>
      <h5>지원방법</h5>
      <p>
        자유 형식의 이력서와 포트폴리오를 아래 메일로 제출합니다. <br />
        (제목 예: [개발자] 프론트엔드 개발자에 지원합니다.)
      </p>
      <p>
        <b>helloworld@class101.net</b> <button onClick={handleClickCopy}>복사하기</button>
      </p>
      {copied && <p>복사되었습니다!</p>}
    </RecruitingCardWrapper>
  );
};

export default RecruitingCard;

const RecruitingCardWrapper = styled.div`
  margin: 16px 0;
  padding: 16px;
  border: ${Colors.gray800} solid 1px;
  h5 {
    ${TextStyles.subtitle1};
    font-weight: 600;
    margin-bottom: 8px;
  }
  p {
    ${TextStyles.body2};
    margin-bottom: 8px;
  }
  button {
    outline: none;
    background: none;
    border: ${Colors.gray800} solid 1px;
    margin-left: 8px;
    &:hover {
      cursor: pointer;
      background: ${Colors.gray100};
    }
  }
`;
