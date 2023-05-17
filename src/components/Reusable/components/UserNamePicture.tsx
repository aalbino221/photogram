import styled from 'styled-components';

interface UserNamePictureProps {
  imgSize: number;
  fontSize: string;
  imgLink: string;
  userName: string;
}

interface ImgContainerProps {
  imgSize: number;
}

const ImgContainer = styled.div<ImgContainerProps>`
  overflow: hidden;
  border-radius: 50%;
  height: ${(props) => props.imgSize}rem;
  width: ${(props) => props.imgSize}rem;
`;

export default function UserNamePicture({
  imgSize,
  fontSize,
  imgLink,
  userName,
}: UserNamePictureProps) {
  return (
    <div className="flex items-center gap-3">
      <ImgContainer imgSize={imgSize}>
        <img
          src={imgLink}
          alt=""
          className="object-cover object-bottom w-full"
        />
      </ImgContainer>
      <h2 className={`font-bold text-${fontSize} text-gray-800`}>{userName}</h2>
    </div>
  );
}
