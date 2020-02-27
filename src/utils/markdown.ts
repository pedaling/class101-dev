import { Colors } from '@class101/ui';
import { css } from 'styled-components';

export default css`
  p {
    margin-bottom: 16px;
    line-height: 20px;
  }
  h1,
  h2 {
    &:after {
      display: block;
      content: '';
      margin-top: 8px;
      border-bottom: ${Colors.gray100} solid 1px;
    }
  }
  h1,
  h2,
  h3 {
    margin-top: 48px;
    color: ${Colors.gray900};
  }
  h4,
  h5,
  h6 {
    margin-top: 32px;
  }
`;
