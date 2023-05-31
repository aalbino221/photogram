/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { useDispatch } from 'react-redux';
import UserNamePicture from '../../Reusable/components/UserNamePicture';
import Img from '../../Reusable/components/Img';
import { PostInfo, PostProps } from '../../Reusable/interfaces/posts';
import getUserInfo from '../../../firebase/firestore/getInfo/getUserInfo';
import useCurrentUser from '../../../hooks/currentUser';
import getPostInfo from '../../../firebase/firestore/getInfo/getPostInfo';
import AddComment from './Post/AddComment';
import CommentsList from './Post/CommentsList';
import { changeSelectedPost } from '../../../redux/selectedPost';
import LikeButton from './Post/LikeButton';
import FollowButton from './Post/FollowButton';
import placeholder from '../../../assets/placeholder.png';

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

function Post({ postId }: PostInfo) {
  const [, currentUserId] = useCurrentUser();
  const [postInfo, setPostInfo] = useState<PostProps | null>(null);
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const showPostModal = () => {
    dispatch(changeSelectedPost({ show: true, postInfo }));
  };

  const handleChange = () => {
    setChange(!change);
  };

  useEffect(() => {
    async function fetchData() {
      const postData = await getPostInfo(postId);
      const userData = await getUserInfo(postData ? postData.userId : '');
      setPostInfo(postData);
      setName(userData.name);
      setLoading(false);
      setProfilePicture(userData.profilePicture);
    }
    fetchData();
  }, [postId]);

  useEffect(() => {
    async function fetchData() {
      const postData = await getPostInfo(postId);
      const userData = await getUserInfo(postData ? postData.userId : '');
      setPostInfo(postData);
      setName(userData.name);
      setProfilePicture(userData.profilePicture);
    }
    fetchData();
  }, [change, postId]);

  if (loading) {
    return (
      <PostContainer>
        <div className="animate-pulse flex gap-3 items-center px-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <div className="flex flex-col gap-1">
            <div className="w-96 bg-gray-300 h-4 rounded" />
            <div className="w-48 bg-gray-300 h-4 rounded" />
          </div>
        </div>
        <div
          className="bg-gray-300"
          style={{ height: '30rem', width: '35rem' }}
        />
      </PostContainer>
    );
  }
  return (
    <PostContainer>
      <div className="px-4 flex gap-3 items-center">
        <Link to={`/profile/${postInfo?.userId}`}>
          <UserNamePicture
            imgSize={2.5}
            fontSize="lg"
            imgLink={profilePicture}
            userName={name}
          />
        </Link>
      </div>
      <Img
        link={postInfo?.photoUrl || ''}
        height={30}
        width={35}
      />
      <div className="px-2">
        <div className="flex">
          <LikeButton
            postId={postInfo?.id || ''}
            currentUser={currentUserId}
            isLiked={postInfo?.liked || false}
            change={handleChange}
          />
          <button onClick={() => {}}>
            <i className="fa-regular fa-comment-dots text-2xl" />
          </button>
        </div>
        <p className="font-bold">{postInfo?.likes} Likes</p>
        <div id="comments">
          <CommentsList
            postComments={postInfo?.comments}
            slice
          />
          <Link to={`/posts/${postId}`}>
            <button onClick={() => showPostModal()}>
              <p className="text-gray-600">View all comments</p>
            </button>
          </Link>
        </div>
      </div>
      <AddComment
        postId={postInfo?.id || ''}
        currentUserId={currentUserId}
        change={handleChange}
      />
    </PostContainer>
  );
}

export default Post;
