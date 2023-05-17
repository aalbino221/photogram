/* eslint-disable react/require-default-props */
import styled from 'styled-components';

interface ImgProps {
  link: string;
  width: number;
  height: number;
  borderRadius?: number;
}

interface ImgContainerProps {
  width: number;
  height: number;
  borderRadius: number;
}

const ImgContainer = styled.div<ImgContainerProps>`
  overflow: hidden;
  border-radius: ${(props) => props.borderRadius}%;
  height: ${(props) => props.height}rem;
  width: ${(props) => props.width}rem;
`;

export default function Img({
  link,
  width,
  height,
  borderRadius = 0,
}: ImgProps) {
  return (
    <ImgContainer
      width={width}
      height={height}
      borderRadius={borderRadius}
    >
      <img
        src={link}
        alt=""
        className="object-cover object-center w-full"
        style={{ height: `${height}rem`, width: `${width}rem` }}
      />
    </ImgContainer>
  );
}
