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
import UserNamePicture from '../../Reusable/components/UserNamePicture';
import Img from '../../Reusable/components/Img';
import { PostInfo, PostProps } from '../../Reusable/interfaces/posts';
import getUserInfo from '../../../firebase/firestore/getInfo/getUserInfo';
import Comment from './Comment';
import setLikePost from '../../../firebase/firestore/like/setLikePost';
import useCurrentUser from '../../../hooks/currentUser';
import getPostInfo from '../../../firebase/firestore/getInfo/getPostInfo';
import setCommentPost from '../../../firebase/firestore/comment/setCommentPost';
import followUser from '../../../firebase/firestore/follow/followUser';
import unfollowUser from '../../../firebase/firestore/follow/unfollowUser';

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
  const [liked, setLiked] = useState(false);
  const commentRef = useRef<HTMLInputElement>(null);
  const [change, setChange] = useState(false);
  const [followed, setFollowed] = useState(false);

  const showPostModal = () => {
    document.querySelectorAll('dialog')[1]?.showModal();
  };

  const likePost = () => {
    if (!postInfo) return;
    setLikePost(postInfo?.id, currentUserId);
    setLiked(!liked);
    setChange(!change);
  };

  const postComment = () => {
    if (commentRef.current?.value === '') return;
    setCommentPost(postId, currentUserId, commentRef.current?.value || '');
    setChange(!change);
  };

  const follow = () => {
    if (!followed) {
      followUser(postInfo?.userId || '', currentUserId);
      setFollowed(true);
    } else {
      unfollowUser(postInfo?.userId || '', currentUserId);
      setFollowed(false);
    }
  };

  useEffect(() => {
    if (!postInfo) return;
    const found = postInfo?.likes.find((like) => like.userId === currentUserId);
    const follows = postInfo?.followed;
    setLiked(found !== undefined);
    setFollowed(follows);
  }, [currentUserId, postInfo]);

  useEffect(() => {
    async function fetchData() {
      console.log(postId);
      const postData = await getPostInfo(postId);
      const userData = await getUserInfo(postData ? postData.userId : '');
      setPostInfo(postData);
      setName(userData.name);
      setProfilePicture(userData.profilePicture);
    }
    fetchData();
  }, [postId, change]);

  return (
    <PostContainer>
      <div className="px-4 flex gap-3 items-center">
        <Link to={`/profile/${postInfo?.profileUrl}`}>
          <UserNamePicture
            imgSize={2.5}
            fontSize="lg"
            imgLink={profilePicture}
            userName={name}
          />
        </Link>
        {currentUserId !== '' && (
          <button
            className={`h-min rounded text-base font-medium ${
              followed ? 'text-gray-500' : 'text-blue-700'
            }`}
            onClick={() => follow()}
          >
            {followed ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>
      <Img
        link={postInfo?.photoUrl || ''}
        height={30}
        width={35}
      />
      <div className="px-2">
        <div className="flex">
          <button onClick={() => likePost()}>
            {liked ? (
              <i className="fa-solid fa-heart text-2xl pr-2" />
            ) : (
              <i className="fa-regular fa-heart text-2xl pr-2" />
            )}
          </button>
          <button
            onClick={() => {
              commentRef.current?.focus();
            }}
          >
            <i className="fa-regular fa-comment-dots text-2xl" />
          </button>
        </div>
        <p className="font-bold">{postInfo?.likes.length} Likes</p>
        <div id="comments">
          {postInfo?.comments.length && postInfo?.comments.length > 0
            ? postInfo.comments.slice(0, 3).map((comment, index) => (
                <Comment
                  key={index}
                  id={comment.id}
                  text={comment.text}
                  userId={comment.userId}
                />
              ))
            : ''}
          <button onClick={() => showPostModal()}>
            <p className="text-gray-600">View all comments</p>
          </button>
        </div>
      </div>
      <div className="border-t px-2 py-1">
        <input
          ref={commentRef}
          type="text"
          placeholder="Add a comment..."
          className="w-11/12 outline-none text-gray-800 placeholder:text-gray-600"
        />
        <button
          className="text-blue-700 font-bold w-1/12"
          onClick={() => postComment()}
        >
          Post
        </button>
      </div>
    </PostContainer>
  );
}

export default Post;
