/* eslint-disable react/button-has-type */
import { useRef } from 'react';
import setCommentPost from '../../../../firebase/firestore/comment/setCommentPost';

export default function AddComment({
  postId,
  currentUserId,
}: {
  postId: string;
  currentUserId: string;
}) {
  const commentRef = useRef<HTMLInputElement>(null);

  const postComment = () => {
    if (commentRef.current?.value === '') return;
    setCommentPost(postId, currentUserId, commentRef.current?.value || '');
  };

  return (
    <div className=" px-2 py-1 flex-grow">
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
  );
}
