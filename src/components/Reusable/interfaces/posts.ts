/* eslint-disable object-curly-newline */
interface Comment {
  id: number;
  userId: string;
  text: string;
}

interface PostProps {
  id: string;
  userId: string;
  photoUrl: string;
  likes: number;
  comments: Comment[];
  profileUrl: string;
  description: string;
  createdAt: string;
  liked: boolean;
}

interface PostInfo {
  postId: string;
}

export type { PostProps, Comment, PostInfo };
