/* eslint-disable react/jsx-one-expression-per-line */
import tw from 'tailwind-styled-components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useCurrentUser from '../../../hooks/currentUser';
import UserNamePicture from './UserNamePicture';
import Img from './Img';
import { changeSelectedPost } from '../../../redux/selectedPost';
import useCurrenPost from '../../../hooks/currentPost';
import LikeButton from '../../Home/Feed/Post/LikeButton';
import FollowButton from '../../Home/Feed/Post/FollowButton';
import AddComment from '../../Home/Feed/Post/AddComment';
import CommentsList from '../../Home/Feed/Post/CommentsList';
import getUserInfo from '../../../firebase/firestore/getInfo/getUserInfo';
import placeholder from '../../../assets/placeholder-image.jpg';
import getPostInfo from '../../../firebase/firestore/getInfo/getPostInfo';

const PostDiv = tw.div`
  flex
  w-min
  border-2
  bg-white
`;

function PostModal() {
  const dispatch = useDispatch();
  const [, currentUserId] = useCurrentUser();
  const { showPost, postInfo } = useCurrenPost();
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [change, setChange] = useState(false);

  const handleChange = () => {
    setChange(!change);
  };

  useEffect(() => {
    async function getData() {
      const data = await getUserInfo(postInfo?.userId || '');
      setUserName(data.name);
      setUserPhoto(data.profilePicture);
    }
    getData();
  }, [currentUserId, postInfo?.userId, postInfo?.id]);

  useEffect(() => {
    async function fetchData() {
      const postData = await getPostInfo(postInfo?.id || '');
      dispatch(changeSelectedPost({ show: true, postInfo: postData }));
    }
    fetchData();
  }, [change, dispatch, postInfo?.id]);

  return (
    <div className="mt-24 flex justify-center">
      {showPost && postInfo == null && (
        <PostDiv>
          <div className="w-min">
            <Img
              link={placeholder}
              width={38}
              height={38}
            />
          </div>
          <div className="w-96 flex flex-col">
            <div className="border-b p-4 pb-2 flex">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="flex gap-1 pb-3  flex-col px-3">
                <div className="w-48 bg-gray-300 h-4 rounded" />
                <div className="w-32 bg-gray-300 h-4 rounded" />
              </div>
            </div>
            <div className="p-4 py-1 flex flex-col flex-grow overflow-y-scroll text-sm gap-1 pt-2">
              <CommentsList
                postComments={[]}
                slice={false}
              />
            </div>
          </div>
        </PostDiv>
      )}
      {showPost && postInfo !== null && (
        <PostDiv>
          <div className="w-min">
            <Img
              link={postInfo?.photoUrl || ''}
              width={38}
              height={38}
            />
          </div>
          <div className="w-96 flex flex-col">
            <div className="border-b p-4 pb-2">
              <div className="flex gap-3 pb-3 items-center">
                <UserNamePicture
                  imgLink={userPhoto || ''}
                  userName={userName || ''}
                  imgSize={2.5}
                  fontSize="lg"
                />
                <FollowButton
                  postUserId={postInfo?.userId || ''}
                  currentUserId={currentUserId}
                />
              </div>
              <p className="text-sm pb-3">{postInfo?.description || ''}</p>
            </div>
            <div className="p-4 py-1 flex flex-col flex-grow overflow-y-scroll text-sm gap-1 pt-2">
              <CommentsList
                postComments={postInfo?.comments || []}
                slice={false}
              />
            </div>
            <div className="p-4 py-1">
              <div className="flex">
                <LikeButton
                  postId={postInfo?.id || ''}
                  currentUser={currentUserId}
                  isLiked={postInfo?.liked || false}
                  change={handleChange}
                />
                <i className="fa-regular fa-comment-dots text-2xl" />
              </div>
              <p className="font-bold">{postInfo?.likes} Likes</p>
            </div>
            <div className="border-t px-2 py-1 flex">
              <button
                className="text w-min px-1"
                type="button"
              >
                <i className="fa-regular fa-face-smile text-xl" />
              </button>
              <AddComment
                change={handleChange}
                postId={postInfo?.id || ''}
                currentUserId={currentUserId}
              />
            </div>
          </div>
        </PostDiv>
      )}
    </div>
  );
}

export default PostModal;
