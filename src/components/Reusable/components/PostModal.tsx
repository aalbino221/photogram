/* eslint-disable react/button-has-type */
import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import UserNamePicture from './UserNamePicture';
import Img from './Img';
import lindy4 from '../../../assets/lindy4.jpg';

const Dialog = styled.dialog`
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const PostDiv = tw.div`
  flex
  w-min
`;

function PostModal() {
  const closeModal = () => {
    document.querySelectorAll('dialog')[1]?.close();
  };

  return (
    <Dialog className="border-0 p-0">
      <PostDiv>
        <button
          className="ml-auto absolute right-5 top-1 text-2xl font-bold"
          onClick={closeModal}
        >
          X
        </button>
        <div className="w-min">
          <Img
            link={lindy4}
            width={38}
            height={38}
          />
        </div>
        <div className="w-96 flex flex-col">
          <div className="border-b p-4 pb-2">
            <div className="flex gap-3 pb-3">
              <UserNamePicture
                imgLink={lindy4}
                userName="lindy2"
                imgSize={2.5}
                fontSize="lg"
              />
              <button className="text-blue-700 rounded font-bold text-sm ">
                Follow
              </button>
            </div>
            <p className="text-sm pb-3">
              Comendo um bolo muito gosto de maracuja no meu aniversario, essa é
              minha foto favorita, vou postar no instagram. #bolo #maracuja
              #aniversario #instagram
            </p>
            <button className="text-blue-700 rounded font-bold text-sm ">
              See more
            </button>
          </div>
          <div className="p-4 py-1 flex flex-col flex-grow overflow-y-scroll text-sm gap-1 pt-2">
            <p>
              <span className="pr-1 font-bold ">Bing Chilling:</span>
              Comentário 1
            </p>
            <p>
              <span className="pr-1 font-bold">Ding Chilling:</span>
              Comentário 2
            </p>
          </div>
          <div className="p-4 py-1">
            <div className="flex">
              <i className="fa-regular fa-heart text-2xl pr-2" />
              <i className="fa-regular fa-comment-dots text-2xl" />
            </div>
            <p className="font-bold">2 Likes</p>
          </div>
          <div className="border-t px-2 py-1 flex justify-between">
            <button className="text w-min px-1">
              <i className="fa-regular fa-face-smile text-xl" />
            </button>
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-grow outline-none px-1 text-gray-700 text-sm"
            />
            <button className="text-blue-600 w-min px-1 font-semibold">
              Send
            </button>
          </div>
        </div>
      </PostDiv>
    </Dialog>
  );
}

export default PostModal;
