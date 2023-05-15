import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import Img from '../../Reusable/Img';
import UserNamePicture from '../../Reusable/UserNamePicture';
import lindy from '../../../assets/lindy.jpeg';
/* eslint-disable react/button-has-type */

const Dialog = styled.dialog`
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const Div = tw.div`
  w-min
  pb-2
  pt-3
`;

function CreatePostModal() {
  const closeModal = () => {
    document.querySelector('dialog')?.close();
  };
  return (
    <Dialog className="p-0 shadow border rounded">
      <Div>
        <div className="px-5 flex flex-col gap-4 ">
          <div className="flex justify-between font-bold text-2xl">
            <h2>Create New Post</h2>
            <button onClick={closeModal}>X</button>
          </div>
          <Img
            link={lindy}
            height={28}
            width={38}
            borderRadius={0}
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
        <div className="flex justify-between text-blue-700 font-bold border-t border-gray-400 px-8 pt-2 text-lg">
          <button onClick={closeModal}>Back</button>
          <button>Post</button>
        </div>
      </Div>
    </Dialog>
  );
}

export default CreatePostModal;
