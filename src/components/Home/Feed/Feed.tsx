/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import Post from './Post';
import getPosts from '../../../firebase/firestore/getInfo/getPosts';
import { PostInfo } from '../../Reusable/interfaces/posts';

function Feed() {
  const [posts, setPost] = useState<Array<PostInfo> | null>(null);
  useEffect(() => {
    async function getData() {
      const data = await getPosts();
      setPost(data);
      return data;
    }
    getData();
    console.log('Oi do Feed');
  }, []);
  return (
    <div className="mx-10 flex flex-col gap-2">
      {posts != null &&
        posts.map((post: any) => (
          <Post
            key={post}
            postId={post}
          />
        ))}
    </div>
  );
}

export default Feed;
