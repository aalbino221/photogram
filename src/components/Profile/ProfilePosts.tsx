import tw from 'tailwind-styled-components';
import Img from '../Reusable/Img';
import placeholder from '../../assets/placeholder-image.jpg';
import lindy from '../../assets/lindy.jpeg';
import lindy2 from '../../assets/lindy2.jpeg';
import lindy3 from '../../assets/lindy3.jpeg';

const PostsDiv = tw.div`
  w-11/12
  mx-auto
  gap-3
  flex
  flex-wrap
`;

function ProfilePosts() {
  return (
    <PostsDiv>
      <Img
        link={lindy}
        height={17.5}
        width={17.5}
      />
      <Img
        link={lindy2}
        height={17.5}
        width={17.5}
      />
      <Img
        link={lindy3}
        height={17.5}
        width={17.5}
      />
      <Img
        link={placeholder}
        height={17.5}
        width={17.5}
      />
      <Img
        link={placeholder}
        height={17.5}
        width={17.5}
      />
      <Img
        link={placeholder}
        height={17.5}
        width={17.5}
      />
    </PostsDiv>
  );
}

export default ProfilePosts;
