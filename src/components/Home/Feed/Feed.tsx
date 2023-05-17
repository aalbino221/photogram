/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import Post from './Post';
import getPosts from '../../../firebase/firestore/getPosts';
import { PostProps } from '../../Reusable/interfaces/posts';

function Feed() {
  const [posts, setPost] = useState<Array<PostProps> | null>(null);
  useEffect(() => {
    async function getData() {
      const data = await getPosts();
      setPost(data);
      return data;
    }
    getData();
  }, []);
  return (
    <div className="mx-auto">
      {posts != null &&
        posts.map((post: any) => (
          <Post
            key={post.id}
            postInfo={post}
          />
        ))}
    </div>
  );
}

export default Feed;
