import React from 'react';
import styled from 'styled-components';

interface Props extends React.ImgHTMLAttributes<any>{
  ratio: number;
}

export default class Img extends React.Component<Props> {
  public static readonly defaultProps: Partial<Props> = {
    ratio: 9 / 16
  };

  render() {
    const { ratio, ...etc } = this.props;
    return (
     <ImageContainer ratio={ratio}>
       <Image {...etc}/>
     </ImageContainer>
    );
  }
}


interface ImageContainerProps {
  ratio: number;
}
const ImageContainer = styled.span<ImageContainerProps>`
  display: block;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  ${({ ratio }) => ratio > 0 && `padding-top: ${ratio * 100}%`};
`
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
`