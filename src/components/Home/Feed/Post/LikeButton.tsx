/* eslint-disable react/button-has-type */
import { useState, useEffect } from 'react';
import setLikePost from '../../../../firebase/firestore/like/setLikePost';

export default function LikeButton({
  postId,
  currentUser,
  isLiked,
  change,
}: {
  postId: string;
  currentUser: string;
  isLiked: boolean;
  change: any;
}) {
  const [liked, setLiked] = useState(false);

  const likePost = () => {
    if (currentUser === '') return;
    setLikePost(postId, currentUser);
    setLiked(!liked);
    change();
  };

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  return (
    <button onClick={() => likePost()}>
      {liked ? (
        <i className="fa-solid fa-heart text-2xl pr-2" />
      ) : (
        <i className="fa-regular fa-heart text-2xl pr-2" />
      )}
    </button>
  );
}
