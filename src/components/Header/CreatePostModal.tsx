import tw from 'tailwind-styled-components';
import Img from '../Reusable/Img';
import UserNamePicture from '../Reusable/UserNamePicture';
import lindy from '../../assets/lindy.jpeg';
/* eslint-disable react/button-has-type */

const Div = tw.div`
  shadow
  mx-auto
  border
  w-min
  pt-4
  pb-2
  rounded
  my-4
`;

function CreatePostModal() {
  return (
    <Div>
      <div className="px-8 flex flex-col gap-4 ">
        <div className="flex justify-between font-bold text-2xl">
          <h2>Create New Post</h2>
          <button>X</button>
        </div>
        <Img
          link={lindy}
          height={30}
          width={35}
          borderRadius={1}
        />
        <UserNamePicture
          imgSize={2}
          fontSize="base"
        />
        <textarea
          placeholder="Write a caption here"
          className="outline-none h-32 w-full resize-none text-gray-600 text-base"
        />
      </div>
      <div className="flex justify-between text-blue-700 font-bold border-t px-8 pt-2 text-lg">
        <button>Back</button>
        <button>Post</button>
      </div>
    </Div>
  );
}

export default CreatePostModal;
