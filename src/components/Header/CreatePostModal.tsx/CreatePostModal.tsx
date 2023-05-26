/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import Img from '../../Reusable/components/Img';
import UserNamePicture from '../../Reusable/components/UserNamePicture';
import placeholder from '../../../assets/placeholder-image.jpg';
import savePhoto from '../../../firebase/storage/savePhoto';
import savePost from '../../../firebase/firestore/newPost/savePost';
import useCurrentUser from '../../../hooks/currentUser';
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
  const navigate = useNavigate();
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [change, setChange] = useState(false);
  const [currentName, currentId, currentProfilePic] = useCurrentUser();

  const closeModal = () => {
    document.querySelector('dialog')?.close();
    if (descriptionRef.current && imageRef.current) {
      descriptionRef.current.value = '';
      imageRef.current.value = '';
      setChange(!change);
    }
  };

  const post = async () => {
    if (imageRef.current?.files && imageRef.current.files.length > 0) {
      const url = await savePhoto(imageRef.current?.files[0] as File);
      const result = savePost(
        url,
        descriptionRef.current?.value as string,
        currentId,
      );
      closeModal();
      window.location.reload();
    }
  };

  useEffect(() => {
    console.log('OI');
    console.log(imageRef.current?.files);
  }, [change]);

  return (
    <Dialog className="p-0 shadow border rounded">
      <Div>
        <div className="px-5 flex flex-col gap-4 ">
          <div className="flex justify-between font-bold text-2xl">
            <h2>Create New Post</h2>
            <button onClick={closeModal}>
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <label
            htmlFor="avatar"
            className="custom-file-upload"
          >
            <div className="hover: cursor-pointer">
              <Img
                link={
                  imageRef.current?.files && imageRef.current.files.length > 0
                    ? URL.createObjectURL(imageRef.current?.files[0])
                    : placeholder
                }
                height={28}
                width={38}
                borderRadius={0}
              />
            </div>
            <p className="text-blue-800 font-bold hover: cursor-pointer text-center w-max mx-auto rounded mt-2">
              Selecionar Imagem
            </p>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              className="hidden"
              ref={imageRef}
              onChange={() => setChange(!change)}
            />
          </label>
          <UserNamePicture
            imgLink={currentProfilePic}
            userName={currentName}
            imgSize={2}
            fontSize="base"
          />
          <textarea
            placeholder="Write a caption here"
            className="outline-none h-32 w-full resize-none text-gray-700 text-base"
            ref={descriptionRef}
          />
        </div>
        <div className="flex justify-between text-blue-700 font-bold border-t border-gray-400 px-8 pt-2 text-lg">
          <button onClick={closeModal}>Back</button>
          <button
            onClick={() => {
              post();
            }}
          >
            Post
          </button>
        </div>
      </Div>
    </Dialog>
  );
}

export default CreatePostModal;
