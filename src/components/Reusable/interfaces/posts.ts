/* eslint-disable object-curly-newline */
interface Comment {
  id: number;
  userId: string;
  text: string;
}

interface Liked {
  userId: string;
}

interface PostProps {
  id: number;
  userId: string;
  photoUrl: string;
  likes: Liked[];
  comments: Comment[];
  profileUrl: string;
  description: string;
  followed: boolean;
}

interface PostInfo {
  postId: number;
}

export type { PostProps, Comment, PostInfo, Liked };
