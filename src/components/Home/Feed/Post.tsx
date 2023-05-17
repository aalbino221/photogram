/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import UserNamePicture from '../../Reusable/components/UserNamePicture';
import Img from '../../Reusable/components/Img';
import { PostInfo } from '../../Reusable/interfaces/posts';
import getUserInfo from '../../../firebase/firestore/getUserInfo';
import Comment from './Comment';

const PostContainer = tw.div`
  w-min
  border-2
  gap-2
  flex
  flex-col
  pt-4
  pb-1
  bg-white
`;

function Post({ postInfo }: PostInfo) {
  const { userId, photoUrl, likes, comments, profileUrl } = postInfo;
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const liked = false;
  const showPostModal = () => {
    document.querySelectorAll('dialog')[1]?.showModal();
  };

  useEffect(() => {
    async function getData() {
      const data = await getUserInfo(userId);
      setName(data.name);
      setProfilePicture(data.profilePicture);
    }
    getData();
  });

  return (
    <PostContainer>
      <div className="px-4">
        <Link to={`/profile/${profileUrl}`}>
          <UserNamePicture
            imgSize={2.5}
            fontSize="lg"
            imgLink={profilePicture}
            userName={name}
          />
        </Link>
      </div>
      <Img
        link={photoUrl}
        height={30}
        width={35}
      />
      <div className="px-2">
        <div className="flex">
          <button>
            {liked ? (
              <i className="fa-solid fa-heart text-2xl pr-2" />
            ) : (
              <i className="fa-regular fa-heart text-2xl pr-2" />
            )}
          </button>
          <i className="fa-regular fa-comment-dots text-2xl" />
        </div>
        <p className="font-bold">{likes.length} Likes</p>
        <div id="comments">
          {comments.length > 0
            ? comments.slice(0, 3).map((comment) => (
                <Comment
                  id={comment.id}
                  text={comment.text}
                  userId={comment.userId}
                />
              ))
            : ''}
          <button onClick={showPostModal}>
            <p className="text-gray-600">View all comments</p>
          </button>
        </div>
      </div>
      <div className="border-t px-2 py-1">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-11/12 outline-none text-gray-800 placeholder:text-gray-600"
        />
        <button className="text-gray-500 1/12">Post</button>
      </div>
    </PostContainer>
  );
}

export default Post;
