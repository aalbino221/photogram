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
  userId: string;
  photoUrl: string;
  likes: Liked[];
  comments: Comment[];
  profileUrl: string;
  description: string;
}

interface PostInfo {
  postInfo: PostProps;
}

export type { PostProps, Comment, PostInfo, Liked };
