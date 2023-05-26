/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-array-index-key */
import Comment from '../Comment';

interface CommentsListProps {
  text: string;
  userId: string;
}

export default function CommentsList({
  postComments,
  slice,
}: {
  postComments: CommentsListProps[] | undefined;
  slice: boolean;
}) {
  return (
    <div>
      {postComments?.length && postComments.length > 0
        ? postComments.slice(0, 3).map((comment, index) => (
            <Comment
              key={index}
              text={comment.text}
              userId={comment.userId}
            />
          ))
        : ''}
    </div>
  );
}
